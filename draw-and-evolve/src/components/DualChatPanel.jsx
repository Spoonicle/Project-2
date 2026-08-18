import React, { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw, Cpu, User } from 'lucide-react';
import { textToBinary } from '../utils/binary';

const DualChatPanel = ({
  messages,
  onSendMessage,
  isAiThinking
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
    // 1. Submit on Enter
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
      return;
    }

    // 2. Handle Backspace key (removes full 8-bit byte chunk)
    if (e.key === 'Backspace') {
      e.preventDefault();
      setInputText(prev => {
        const trimmed = prev.trimEnd();
        if (!trimmed) return '';
        const parts = trimmed.split(/\s+/);
        parts.pop();
        return parts.length > 0 ? parts.join(' ') + ' ' : '';
      });
      return;
    }

    // 3. Allow standard system shortcut & navigation keys
    if (
      e.ctrlKey || 
      e.metaKey || 
      e.altKey || 
      e.key === 'Tab' || 
      e.key === 'Escape' || 
      e.key.startsWith('Arrow')
    ) {
      return;
    }

    // 4. Intercept key press and type out its full 8-bit ASCII binary byte signature at once
    if (e.key.length === 1) {
      e.preventDefault();
      
      let binaryByte = '';
      if (e.key === '0' || e.key === '1') {
        binaryByte = e.key;
      } else {
        binaryByte = e.key.charCodeAt(0).toString(2).padStart(8, '0');
      }

      setInputText(prev => {
        if (!prev) return binaryByte + ' ';
        if (prev.endsWith(' ')) return prev + binaryByte + ' ';
        return prev + ' ' + binaryByte + ' ';
      });
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
                      <span>{textToBinary("user@term:~$")}</span>
                    </>
                  ) : (
                    <>
                      <Cpu className="w-3 h-3 text-white" />
                      <span>{textToBinary("gemini-ai@3.6-flash:~$")}</span>
                    </>
                  )}
                </span>
                <span>{textToBinary(msg.timestamp)}</span>
              </div>
              <p className="msg-text" title={textToBinary(msg.text)}>
                {textToBinary(msg.text)}
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
                  {textToBinary("GEMINI_PROCESSING_RESPONSE...")}
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
          <span>{textToBinary("user@terminal:~$ transmit_directive >")}</span>
        </div>
        <div className="input-row">
          <textarea
            value={inputText}
            onChange={() => {}}
            onKeyDown={handleKeyDown}
            placeholder={textToBinary("Press any key to generate binary (0/1)...")}
            rows={2}
            className="bottom-textarea font-mono"
            disabled={isAiThinking}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isAiThinking}
            className="bottom-send-btn font-mono"
            title={textToBinary("SEND (ENTER)")}
          >
            <Send className="w-4 h-4 text-current" />
            <span>{textToBinary("SEND")}</span>
            <kbd className="key-badge">
              {textToBinary("ENTER")}
            </kbd>
          </button>
        </div>
      </form>

    </div>
  );
};

export default DualChatPanel;
