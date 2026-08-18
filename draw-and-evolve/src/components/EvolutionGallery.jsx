import React from 'react';
import { X, Terminal, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { textToBinary } from '../utils/binary';

const EvolutionGallery = ({ isOpen, onClose, history }) => {
  if (!isOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleDownloadImage = (snapshotUrl, stageNum) => {
    const a = document.createElement('a');
    a.href = snapshotUrl;
    a.download = `binary-drawing-stage-${stageNum}.png`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 font-mono">
      <div className="w-full max-w-4xl max-h-[90vh] rounded-md overflow-hidden flex flex-col bg-[#000000] border border-white shadow-2xl text-white">
        
        {/* Header */}
        <div className="p-4 bg-[#0a0a0a] border-b border-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="term-dots">
              <span className="term-dot term-dot-red"></span>
              <span className="term-dot term-dot-yellow"></span>
              <span className="term-dot term-dot-green"></span>
            </div>
            <div className="p-2 rounded bg-black border border-white">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-mono font-extrabold text-base text-white">{textToBinary("GALLERY_BUFFER")}</h3>
              <p className="text-xs text-slate-400">{textToBinary("VISUAL_SNAPSHOTS")}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={triggerConfetti}
              className="bg-black text-white border border-white hover:bg-white hover:text-black font-mono text-xs py-1.5 px-3 rounded font-bold transition-all"
              title="CELEBRATE 🎉"
            >
              [{textToBinary("PARTY")}]
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 overflow-y-auto bg-[#000000]">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-slate-500 gap-3">
              <Terminal className="w-12 h-12 text-white/40" />
              <p className="text-sm font-mono text-white">[{textToBinary("BUFFER_EMPTY")}]</p>
              <p className="text-xs text-slate-500 font-mono">{textToBinary("EXECUTE_DRAWINGS_TO_POPULATE")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {history.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#0a0a0a] rounded p-3 border border-white/40 flex flex-col gap-3 hover:border-white transition-all shadow-md"
                >
                  {/* Stage Image */}
                  <div className="relative rounded overflow-hidden bg-white aspect-video flex items-center justify-center border border-white">
                    <img
                      src={item.snapshotUrl}
                      alt={`Stage ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute top-2 left-2 bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded border border-white font-mono">
                      {textToBinary(`STAGE ${idx + 1}`)}
                    </div>
                  </div>

                  {/* Stage Info */}
                  <div className="flex-1 flex flex-col justify-between font-mono">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400">
                        {textToBinary("DIRECTIVE")} &gt;
                      </h4>
                      <p className="text-[11px] text-white mt-0.5 uppercase font-semibold">
                        {textToBinary(item.prompt)}
                      </p>

                      {item.commentary && (
                        <div className="mt-2.5 p-2 bg-[#000000] rounded border border-white/30" title={item.commentary}>
                          <span className="text-[10px] font-bold text-slate-400 block">&gt;&gt;&gt; [{textToBinary("FEEDBACK")}]:</span>
                          <p className="text-[11px] text-slate-200 italic mt-0.5">{textToBinary(item.commentary)}</p>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 pt-2 border-t border-white/20 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500">{item.timestamp}</span>
                      <button
                        onClick={() => handleDownloadImage(item.snapshotUrl, idx + 1)}
                        className="bg-black text-white border border-white hover:bg-white hover:text-black font-mono font-bold text-[10px] py-1 px-2.5 rounded transition-all"
                        title="SAVE PNG"
                      >
                        [{textToBinary("PNG")}]
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0a0a0a] border-t border-white flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>{textToBinary("ENTRIES")}: {history.length}</span>
          <button
            onClick={onClose}
            className="bg-black text-white border border-white font-mono font-bold text-xs py-2 px-5 rounded hover:bg-white hover:text-black transition-all"
          >
            {textToBinary("RETURN")}
          </button>
        </div>

      </div>
    </div>
  );
};

export default EvolutionGallery;
