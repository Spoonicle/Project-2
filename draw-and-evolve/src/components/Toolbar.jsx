import React, { useEffect, useState } from 'react';
import { 
  Pencil, 
  Paintbrush, 
  Eraser, 
  PaintBucket, 
  Pipette, 
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import { sounds } from '../services/audioService';

const TOOLS = [
  { id: 'brush', name: 'Brush', icon: Paintbrush },
  { id: 'marker', name: 'Marker', icon: Pencil },
  { id: 'eraser', name: 'Eraser', icon: Eraser },
  { id: 'bucket', name: 'Fill Bucket', icon: PaintBucket },
  { id: 'eyedropper', name: 'Eyedropper', icon: Pipette },
];

const Toolbar = ({
  color,
  setColor,
  tool,
  setTool,
  brushSize,
  setBrushSize,
  opacity,
  setOpacity,
  colorPalette,
  colorChangedPulse
}) => {
  const [showSettings, setShowSettings] = useState(false);

  const handleColorSelect = (newColor) => {
    sounds.playColorChange();
    setColor(newColor);
  };

  return (
    <div className="glass-panel rounded-2xl p-3 flex flex-wrap md:flex-nowrap items-center justify-between gap-3 w-full border border-white/10">
      
      {/* Tools selector */}
      <div className="flex items-center gap-1.5 bg-slate-900/60 p-1.5 rounded-xl border border-white/5">
        {TOOLS.map((t) => {
          const Icon = t.icon;
          const isActive = tool === t.id;
          return (
            <button
              key={t.id}
              onClick={() => {
                setTool(t.id);
                sounds.playColorChange();
              }}
              className={`p-2 rounded-lg transition-all duration-200 flex items-center gap-1.5 text-xs font-medium ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25 scale-105'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
              data-tooltip={t.name}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{t.name}</span>
            </button>
          );
        })}
      </div>

      {/* Color Swatches & Active Pen Color Badge */}
      <div className="flex items-center gap-2 flex-1 overflow-x-auto py-1 px-1">
        {/* Active Pen Color Indicator with pulse effect on auto-change */}
        <div 
          className={`relative group flex items-center gap-2 bg-slate-900/70 pl-2 pr-3 py-1.5 rounded-xl border border-white/10 ${
            colorChangedPulse ? 'color-changed-pulse border-pink-500' : ''
          }`}
          data-tooltip="Active Pen Color (Changes each iteration!)"
        >
          <div 
            className="w-6 h-6 rounded-full shadow-inner border-2 border-white/40 cursor-pointer transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: color }}
          />
          <input
            type="color"
            value={color}
            onChange={(e) => handleColorSelect(e.target.value)}
            className="absolute opacity-0 inset-0 w-full h-full cursor-pointer"
          />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider leading-none">Active Pen</span>
            <span className="text-xs font-mono font-semibold text-white leading-tight">{color}</span>
          </div>

          {colorChangedPulse && (
            <span className="absolute -top-2 -right-1 bg-gradient-to-r from-pink-500 to-purple-500 text-[9px] font-bold text-white px-1.5 py-0.5 rounded-full flex items-center gap-0.5 animate-bounce shadow-md">
              <Sparkles className="w-2.5 h-2.5" /> New Color!
            </span>
          )}
        </div>

        {/* Quick Swatches Palette */}
        <div className="flex items-center gap-1.5 pl-2 border-l border-white/10">
          {colorPalette.map((c, i) => (
            <button
              key={i}
              onClick={() => handleColorSelect(c)}
              className={`w-6 h-6 rounded-full transition-all duration-200 ${
                color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110' : 'hover:scale-110 opacity-80 hover:opacity-100'
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      {/* Brush Size & Opacity controls */}
      <div className="flex items-center gap-3 bg-slate-900/60 py-1.5 px-3 rounded-xl border border-white/5">
        {/* Size Slider */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium w-8">Size</span>
          <input
            type="range"
            min="2"
            max="60"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-24 accent-indigo-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
          />
          <div 
            className="w-5 h-5 flex items-center justify-center rounded-full bg-slate-800"
            data-tooltip={`Size: ${brushSize}px`}
          >
            <div 
              className="rounded-full bg-white"
              style={{ width: `${Math.min(brushSize, 18)}px`, height: `${Math.min(brushSize, 18)}px` }}
            />
          </div>
        </div>

        {/* Opacity toggle/slider */}
        <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-white/10">
          <span className="text-xs text-slate-400 font-medium">Opacity</span>
          <input
            type="range"
            min="0.1"
            max="1.0"
            step="0.05"
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="w-20 accent-pink-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
          />
          <span className="text-xs font-mono text-slate-300 w-8 text-right">{Math.round(opacity * 100)}%</span>
        </div>
      </div>

    </div>
  );
};

export default Toolbar;
