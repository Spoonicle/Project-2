import React, { useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  Bot, 
  Key, 
  Images, 
  HelpCircle, 
  RefreshCw, 
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { PROMPT_THEMES } from '../data/promptThemes';
import { sounds } from '../services/audioService';

const ChatPanel = ({
  theme,
  setThemeId,
  currentStage,
  activePrompt,
  chatMessages,
  onSubmitDrawing,
  isAiThinking,
  onOpenApiKeyModal,
  onOpenGallery,
  apiKey
}) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isAiThinking]);

  return (
    <div className="glass-panel rounded-2xl flex flex-col h-full w-full overflow-hidden border border-white/10">
      
      {/* AI Companion Header */}
      <div className="p-3.5 bg-slate-900/80 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${theme.badgeColor} flex items-center justify-center text-xl shadow-md`}>
            {theme.botAvatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-bold text-sm text-white">{theme.botName}</h3>
              <span className="text-[10px] font-semibold uppercase bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">
                Stage {currentStage + 1}
              </span>
            </div>
            <p className="text-xs text-slate-400">AI Co-Creative Coach</p>
          </div>
        </div>

        {/* Theme Picker & Options */}
        <div className="flex items-center gap-1.5">
          <div className="relative group">
            <select
              value={theme.id}
              onChange={(e) => setThemeId(e.target.value)}
              className="glass-button text-xs py-1.5 px-2 pr-7 bg-slate-800/80 hover:bg-slate-700 text-slate-200 cursor-pointer appearance-none rounded-xl"
            >
              {PROMPT_THEMES.map(t => (
                <option key={t.id} value={t.id} className="bg-slate-900 text-white">
                  {t.botAvatar} {t.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            onClick={onOpenGallery}
            className="glass-button p-2 text-slate-300 hover:text-white"
            data-tooltip="View Timeline Gallery"
          >
            <Images className="w-4 h-4 text-purple-400" />
          </button>

          <button
            onClick={onOpenApiKeyModal}
            className={`glass-button p-2 ${apiKey ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' : 'text-slate-400'}`}
            data-tooltip={apiKey ? "Gemini API Key Active" : "Add Gemini API Key (Optional)"}
          >
            <Key className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Current Objective Card */}
      <div className="p-3.5 bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900/40 border-b border-indigo-500/20">
        <div className="flex items-start gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">Current Challenge</span>
              <span className="text-[10px] text-pink-300 bg-pink-500/10 px-2 py-0.5 rounded-full border border-pink-500/20 font-mono">
                Press Enter to Submit ↵
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-100 mt-1 leading-relaxed">
              {activePrompt}
            </p>
          </div>
        </div>
      </div>

      {/* Chat Messages Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/30">
        {chatMessages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-fade-in`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-semibold text-slate-400">
                {msg.sender === 'user' ? 'You' : theme.botName}
              </span>
              <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
            </div>

            <div
              className={`max-w-[90%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none shadow-md shadow-indigo-500/10'
                  : 'bg-slate-900/90 border border-white/10 text-slate-200 rounded-bl-none shadow-lg'
              }`}
            >
              {msg.snapshotUrl && (
                <div className="mb-2.5 rounded-xl overflow-hidden border border-white/15 bg-white shadow-inner">
                  <img src={msg.snapshotUrl} alt="Drawing Stage" className="w-full max-h-48 object-contain" />
                </div>
              )}

              <p>{msg.text}</p>

              {msg.stageBadge && (
                <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-1.5 text-xs font-semibold text-indigo-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{msg.stageBadge}</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {isAiThinking && (
          <div className="flex items-start gap-2 animate-fade-in">
            <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-sm">
              🤖
            </div>
            <div className="bg-slate-900/90 border border-white/10 p-3 rounded-2xl rounded-bl-none text-xs text-indigo-300 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-pink-400" />
              <span>Looking closely at your drawing...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Primary Submit Section */}
      <div className="p-3.5 bg-slate-900/90 border-t border-white/10 flex flex-col gap-2">
        <button
          onClick={() => {
            sounds.playSubmitChime();
            onSubmitDrawing();
          }}
          disabled={isAiThinking}
          className="w-full glass-button primary-btn pulse-submit-btn py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-bold shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-pink-300 animate-spin" />
          <span>Submit Drawing to AI</span>
          <kbd className="bg-white/20 text-white px-2 py-0.5 rounded text-[11px] font-mono ml-2 border border-white/30">
            Enter ↵
          </kbd>
        </button>

        <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
          <span>🎨 Draw feature ➔ Press Enter to update AI</span>
          <span>{apiKey ? '⚡ Gemini 2.5 Flash Vision' : '✨ Built-in Smart Engine'}</span>
        </div>
      </div>

    </div>
  );
};

export default ChatPanel;
