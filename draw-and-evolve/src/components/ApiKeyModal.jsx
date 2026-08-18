import React, { useState } from 'react';
import { X, Key, Check, ExternalLink, ShieldCheck } from 'lucide-react';
import { textToBinary } from '../utils/binary';

const ApiKeyModal = ({ isOpen, onClose, apiKey, onSaveApiKey }) => {
  const [inputKey, setInputKey] = useState(apiKey || '');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveApiKey(inputKey.trim());
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setInputKey('');
    onSaveApiKey('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 font-mono">
      <div className="w-full max-w-md rounded-md overflow-hidden bg-[#000000] border border-white shadow-2xl text-white">
        
        {/* Header */}
        <div className="p-4 bg-[#0a0a0a] border-b border-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="term-dots">
              <span className="term-dot term-dot-red"></span>
              <span className="term-dot term-dot-yellow"></span>
              <span className="term-dot term-dot-green"></span>
            </div>
            <div className="p-2 rounded bg-black border border-white">
              <Key className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-mono font-extrabold text-sm text-white" title={textToBinary("API_KEY_CONFIG")}>
                {textToBinary("API_KEY_CONFIG")}
              </h3>
              <p className="text-xs text-slate-400" title={textToBinary("MULTIMODAL_VISION")}>
                {textToBinary("MULTIMODAL_VISION")}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSave} className="p-5 flex flex-col gap-4 bg-[#000000]">
          <div className="text-xs text-slate-300 leading-relaxed bg-[#0a0a0a] p-3.5 rounded border border-white/40">
            <p className="mb-2" title={textToBinary("GEMINI_3.6_FLASH_VISION_ENGINE")}>
              {textToBinary("GEMINI_3.6_FLASH_VISION_ENGINE")}
            </p>
            <div className="flex items-center gap-1.5 text-white font-mono" title={textToBinary("LOCAL_STORAGE")}>
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>{textToBinary("LOCAL_STORAGE")}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-white mb-1.5 font-mono" title={textToBinary("ENTER_KEY")}>
              {textToBinary("ENTER_KEY")} &gt;
            </label>
            <input
              type="password"
              placeholder="01000001 01001001..."
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="w-full bg-[#000000] border border-white rounded px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none font-mono"
            />
          </div>

          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-300 hover:text-white underline flex items-center gap-1.5 font-mono"
            title={textToBinary("GOOGLE_AI_STUDIO")}
          >
            <span>{textToBinary("GOOGLE_AI_STUDIO")}</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <div className="flex items-center justify-between pt-3 border-t border-white/30 font-mono">
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-slate-400 hover:text-white font-bold"
              title={textToBinary("CLEAR")}
            >
              [{textToBinary("CLEAR")}]
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="bg-[#000000] text-slate-300 border border-slate-600 text-xs py-1.5 px-3 rounded hover:text-white hover:border-white"
              >
                {textToBinary("CANCEL")}
              </button>
              <button
                type="submit"
                className="bg-black text-white border border-white font-bold text-xs py-1.5 px-4 rounded hover:bg-white hover:text-black flex items-center gap-1.5 transition-all"
              >
                {isSaved ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-current" />
                    <span>{textToBinary("SAVED")}</span>
                  </>
                ) : (
                  <span>{textToBinary("SAVE")}</span>
                )}
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};

export default ApiKeyModal;
