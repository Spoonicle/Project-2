import React, { useState, useEffect } from 'react';
import TopPromptBar from './components/TopPromptBar';
import DualChatPanel from './components/DualChatPanel';
import ApiKeyModal from './components/ApiKeyModal';

import { generateChatResponse } from './services/geminiService';
import { sounds } from './services/audioService';

export default function App() {
  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      sender: 'ai',
      text: "Greetings, Human! System initialized. I am an AI intelligence exploring Earth. Tell me: what is 'sleep' and why do your biological bodies deactivate for 8 hours every solar cycle?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [isAiThinking, setIsAiThinking] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState(() => 
    localStorage.getItem('gemini_api_key') || 
    (import.meta.env && (import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY)) || 
    ''
  );

  const handleSaveApiKey = (key) => {
    setApiKey(key);
    if (key) {
      localStorage.setItem('gemini_api_key', key);
    } else {
      localStorage.removeItem('gemini_api_key');
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'ai',
        text: 'Session buffer cleared. Transmit new messages from the left terminal.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSendMessage = async (userText) => {
    if (isAiThinking) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsgObj = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: timeStr
    };

    sounds.playSubmitChime();
    setMessages(prev => [...prev, userMsgObj]);
    setIsAiThinking(true);

    // Call Gemini Chat API
    const aiReplyText = await generateChatResponse({
      userMessage: userText,
      history: messages,
      apiKey
    });

    sounds.playAiResponse();
    setIsAiThinking(false);

    const aiMsgObj = {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: aiReplyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, aiMsgObj]);
  };

  return (
    <div className="app-container">
      
      {/* Top Terminal Menu Bar */}
      <TopPromptBar
        messagesCount={messages.length}
        onClearChat={handleClearChat}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        apiKey={apiKey}
      />

      {/* Main Dual Terminal Backwards Chat System (User Left, AI Right) */}
      <DualChatPanel
        messages={messages}
        onSendMessage={handleSendMessage}
        isAiThinking={isAiThinking}
      />

      {/* Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
      />

    </div>
  );
}
