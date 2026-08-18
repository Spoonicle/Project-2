import React, { useState } from 'react';
import { Terminal, ChevronUp, ChevronDown, History } from 'lucide-react';
import { textToBinary } from '../utils/binary';

const AiCommentarySection = ({ commentary, isAiThinking, currentStage, history }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const binaryCommentary = textToBinary(commentary);
  const binaryHeader = textToBinary("STDOUT");
  const binaryStage = textToBinary(`STAGE ${currentStage}`);
  const binaryLogs = textToBinary("LOGS");
  const binaryThinking = textToBinary("PIXEL_ANALYSIS_IN_PROGRESS");

  return (
    <div className="ai-commentary-banner">
      <div className="commentary-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center gap-2.5">
          <div className="commentary-avatar">
            <Terminal className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className="commentary-title" title="STDOUT">{binaryHeader}</span>
            <span className="commentary-stage-tag" title={`STAGE_${currentStage}`}>{binaryStage}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowHistoryModal(!showHistoryModal);
              }}
              className="commentary-log-btn"
              title="View History Logs"
            >
              <History className="w-3.5 h-3.5" />
              <span>{binaryLogs} ({history.length})</span>
            </button>
          )}

          <button className="expand-btn">
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="commentary-body">
          {isAiThinking ? (
            <div className="commentary-thinking">
              <span className="animate-pulse">&gt; {binaryThinking}</span>
            </div>
          ) : (
            <div className="commentary-content" title={commentary}>
              <span className="commentary-prompt-symbol">&gt;&gt;&gt;</span>
              <p className="commentary-text">{binaryCommentary}</p>
            </div>
          )}
        </div>
      )}

      {/* History Log Popover */}
      {showHistoryModal && (
        <div className="commentary-history-popover font-mono">
          <div className="popover-header">
            <span>[{textToBinary("STDOUT_BUFFER")}]</span>
            <button onClick={() => setShowHistoryModal(false)} className="text-slate-400 hover:text-white font-mono">✕</button>
          </div>
          <div className="popover-list">
            {history.map((item, idx) => (
              <div key={idx} className="popover-item" title={item.commentary}>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1 font-bold">
                  <span>{textToBinary(item.stageBadge)}</span>
                  <span>{item.timestamp}</span>
                </div>
                <p className="text-xs text-white italic mb-1">&gt;&gt;&gt; {textToBinary(item.commentary)}</p>
                <p className="text-[10px] text-slate-400 font-semibold">$ {textToBinary(item.prompt)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AiCommentarySection;
