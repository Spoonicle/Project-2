import React from 'react';
import { Terminal, Key, Trash2, Binary } from 'lucide-react';
import { textToBinary } from '../utils/binary';

const TopPromptBar = ({
  messagesCount,
  onClearChat,
  onOpenApiKeyModal,
  apiKey
}) => {
  return (
    <header className="site-header-bar font-mono">

      {/* Left: Terminal Window Dots & Identity */}
      <div className="bot-tag">
        <div className="term-dots">
          <span className="term-dot term-dot-red" title={textToBinary("CLOSE")}></span>
          <span className="term-dot term-dot-yellow" title={textToBinary("MINIMIZE")}></span>
          <span className="term-dot term-dot-green" title={textToBinary("EXPAND")}></span>
        </div>

        <div className="bot-avatar">
          <Terminal className="w-5 h-5 text-white" />
        </div>
        <div className="bot-info">
          <span className="bot-title" title={textToBinary("root@gemini-term:~/studio#")}>
            {textToBinary("root@gemini-term:~/studio#")}
          </span>
          <span className="stage-badge">
            {textToBinary(`LOGS: ${messagesCount}`)}
          </span>
        </div>
      </div>

      {/* Center: Session Status CLI Box */}
      <div className="prompt-box">
        <span className="prompt-prefix">
          {textToBinary("bash$ ./chat.sh >")}
        </span>
        <p className="prompt-text">
          {textToBinary("GEMINI 3.6 FLASH // HUMAN_WORLD_EXPLORER_AI")}
        </p>
        <span className="cli-cursor"></span>
      </div>

      {/* Right: Action Controls */}
      <div className="actions-group">

        {/* Permanent ASCII Binary Mode Indicator */}
        <div
          className="mode-toggle-btn active-binary"
          title={textToBinary("ASCII_BINARY_MODE_ONLY")}
        >
          <Binary className="w-4 h-4 text-current" />
          <span>{textToBinary("BINARY")}</span>
        </div>

        {/* Clear Chat Button */}
        <button
          onClick={onClearChat}
          className="icon-btn"
          title={textToBinary("CLEAR")}
        >
          <Trash2 className="w-4 h-4" />
        </button>

        {/* API Key Modal Button */}
        <button
          onClick={onOpenApiKeyModal}
          className="icon-btn"
          title={textToBinary(apiKey ? "API_KEY_ACTIVE" : "CONFIGURE_API_KEY")}
          style={apiKey ? { backgroundColor: '#ffffff', color: '#000000' } : {}}
        >
          <Key className="w-4 h-4" />
        </button>

      </div>

    </header>
  );
};

export default TopPromptBar;
