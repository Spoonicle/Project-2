import React from 'react';
import { Terminal, Key, Trash2, Binary, FileText } from 'lucide-react';
import { textToBinary } from '../utils/binary';

const TopPromptBar = ({
  messagesCount,
  onClearChat,
  onOpenApiKeyModal,
  apiKey,
  isBinaryMode,
  onToggleBinaryMode
}) => {
  return (
    <header className="site-header-bar font-mono">

      {/* Left: Terminal Window Dots & Identity */}
      <div className="bot-tag">
        <div className="term-dots">
          <span className="term-dot term-dot-red" title={isBinaryMode ? textToBinary("CLOSE") : "close"}></span>
          <span className="term-dot term-dot-yellow" title={isBinaryMode ? textToBinary("MINIMIZE") : "minimize"}></span>
          <span className="term-dot term-dot-green" title={isBinaryMode ? textToBinary("EXPAND") : "expand"}></span>
        </div>

        <div className="bot-avatar">
          <Terminal className="w-5 h-5 text-white" />
        </div>
        <div className="bot-info">
          <span className="bot-title" title={isBinaryMode ? textToBinary("root@gemini-term:~/studio#") : "root@gemini-term:~/studio#"}>
            {isBinaryMode ? textToBinary("root@gemini-term:~/studio#") : "root@gemini-term:~/studio#"}
          </span>
          <span className="stage-badge">
            {isBinaryMode ? textToBinary(`LOGS: ${messagesCount}`) : `TOTAL_LOGS: ${messagesCount}`}
          </span>
        </div>
      </div>

      {/* Center: Session Status CLI Box */}
      <div className="prompt-box">
        <span className="prompt-prefix">
          {isBinaryMode ? textToBinary("bash$ ./chat.sh >") : "bash$ ./chat.sh >"}
        </span>
        <p className="prompt-text">
          {isBinaryMode
            ? textToBinary("GEMINI 3.6 FLASH // HUMAN_WORLD_EXPLORER_AI")
            : "GEMINI 3.6 FLASH // HUMAN_WORLD_EXPLORER_AI"}
        </p>
        <span className="cli-cursor"></span>
      </div>

      {/* Right: Action Buttons */}
      <div className="actions-group">

        {/* Binary / Plain Text Mode Toggle Button */}
        <button
          onClick={onToggleBinaryMode}
          className={`mode-toggle-btn ${isBinaryMode ? 'active-binary' : ''}`}
          title={isBinaryMode ? textToBinary("SWITCH_TO_TEXT") : "Switch to ASCII Binary Mode"}
        >
          {isBinaryMode ? (
            <>
              <Binary className="w-4 h-4 text-current" />
              <span>{textToBinary("BINARY")}</span>
            </>
          ) : (
            <>
              <FileText className="w-4 h-4 text-current" />
              <span>[TEXT_MODE]</span>
            </>
          )}
        </button>

        {/* Clear Chat Button */}
        <button
          onClick={onClearChat}
          className="icon-btn"
          title={isBinaryMode ? textToBinary("CLEAR") : "[CLEAR] Reset Chat Session"}
        >
          <Trash2 className="w-4 h-4" />
        </button>

        {/* API Key Modal Button */}
        <button
          onClick={onOpenApiKeyModal}
          className="icon-btn"
          title={isBinaryMode ? textToBinary("API_KEY") : (apiKey ? "[KEY] Gemini API Active" : "[KEY] Configure Gemini API Key")}
          style={apiKey ? { backgroundColor: '#ffffff', color: '#000000' } : {}}
        >
          <Key className="w-4 h-4" />
        </button>

      </div>

    </header>
  );
};

export default TopPromptBar;
