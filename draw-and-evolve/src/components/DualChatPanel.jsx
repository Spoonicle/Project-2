import React, { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw, Cpu, User } from 'lucide-react';
import { textToBinary } from '../utils/binary';

const DualChatPanel = ({
  messages,
  onSendMessage,
  isAiThinking,
  isBinaryMode
}) => {
  const [inputText, setInputText] = useState('');
  const chatStreamEndRef = useRef(null);

  // Auto-scroll chat stream
  useEffect(() => {
    chatStreamEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiThinking]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim() || isAiThinking) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="single-stream-chat-container font-mono">

      {/* Main Alternating Y-Axis Message Stream */}
      <div className="alternating-chat-stream">
        {messages.map((msg, idx) => (
          <div
            key={msg.id || idx}
            className={`alternating-row ${msg.sender === 'user' ? 'user-row' : 'ai-row'}`}
          >
            <div className={`terminal-message-card ${msg.sender === 'user' ? 'user-msg-card' : 'ai-msg-card'}`}>
              <div className="msg-meta">
                <span className="flex items-center gap-1.5 font-bold">
                  {msg.sender === 'user' ? (
                    <>
                      <User className="w-3 h-3 text-white" />
                      <span>{isBinaryMode ? textToBinary("user@term:~$") : "user@term:~$"}</span>
                    </>
                  ) : (
                    <>
                      <Cpu className="w-3 h-3 text-white" />
                      <span>{isBinaryMode ? textToBinary("gemini-ai@3.6-flash:~$") : "gemini-ai@3.6-flash:~$"}</span>
                    </>
                  )}
                </span>
                <span>{isBinaryMode ? textToBinary(msg.timestamp) : msg.timestamp}</span>
              </div>
              <p className="msg-text" title={msg.text}>
                {isBinaryMode ? textToBinary(msg.text) : msg.text}
              </p>
            </div>
          </div>
        ))}

        {isAiThinking && (
          <div className="alternating-row ai-row">
            <div className="terminal-message-card ai-thinking-card">
              <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>
                  {isBinaryMode 
                    ? textToBinary("GEMINI_PROCESSING_RESPONSE...") 
                    : "[GEMINI_3.6_FLASH_PROCESSING_RESPONSE...]"}
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={chatStreamEndRef} />
      </div>

      {/* Extended Bottom User Terminal Input Bar */}
      <form onSubmit={handleSubmit} className="bottom-terminal-input-bar">
        <div className="input-prompt-label">
          <span>{isBinaryMode ? textToBinary("user@terminal:~$ transmit_directive >") : "user@terminal:~$ transmit_directive >"}</span>
        </div>
        <div className="input-row">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isBinaryMode ? textToBinary("TYPE_MESSAGE...") : "Type your message or prompt here... (Press Enter to transmit)"}
            rows={2}
            className="bottom-textarea font-mono"
            disabled={isAiThinking}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isAiThinking}
            className="bottom-send-btn font-mono"
            title={isBinaryMode ? textToBinary("SEND (ENTER)") : "SEND (ENTER)"}
          >
            <Send className="w-4 h-4 text-current" />
            <span>{isBinaryMode ? textToBinary("SEND") : "SEND"}</span>
            <kbd className="key-badge">
              {isBinaryMode ? textToBinary("ENTER") : "Enter ↵"}
            </kbd>
          </button>
        </div>
      </form>

    </div>
  );
};

export default DualChatPanel;
