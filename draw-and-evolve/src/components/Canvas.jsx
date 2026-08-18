import React, { useRef, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import { Terminal } from 'lucide-react';
import { textToBinary } from '../utils/binary';

const Canvas = forwardRef(({
  color,
  onSubmitDrawing,
  isAiThinking
}, ref) => {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef({ x: 0, y: 0 });
  const pointsRef = useRef([]);

  const hasInitializedRef = useRef(false);

  // Resize canvas to fill dedicated container area
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let existingData = null;
    
    if (hasInitializedRef.current && canvas.width > 0 && canvas.height > 0) {
      existingData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }

    const width = parent.clientWidth;
    const height = parent.clientHeight;

    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    if (existingData) {
      ctx.putImageData(existingData, 0, 0);
    }

    hasInitializedRef.current = true;
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: Math.round((clientX - rect.left) * (canvas.width / rect.width)),
      y: Math.round((clientY - rect.top) * (canvas.height / rect.height))
    };
  };

  const startDrawing = (e) => {
    if (isAiThinking) return;
    const point = getCoordinates(e);

    isDrawingRef.current = true;
    lastPointRef.current = point;
    pointsRef.current = [point];

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  };

  const draw = (e) => {
    if (!isDrawingRef.current || isAiThinking) return;
    const point = getCoordinates(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    pointsRef.current.push(point);
    const points = pointsRef.current;

    ctx.beginPath();
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = color;

    // Bezier curve smoothing
    if (points.length > 2) {
      const lastTwo = points.slice(-3);
      const xc = (lastTwo[1].x + lastTwo[2].x) / 2;
      const yc = (lastTwo[1].y + lastTwo[2].y) / 2;
      ctx.moveTo(lastTwo[0].x, lastTwo[0].y);
      ctx.quadraticCurveTo(lastTwo[1].x, lastTwo[1].y, xc, yc);
    } else {
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(point.x, point.y);
    }

    ctx.stroke();
    lastPointRef.current = point;
  };

  const stopDrawing = () => {
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      pointsRef.current = [];
    }
  };

  useImperativeHandle(ref, () => ({
    getSnapshot: () => {
      return canvasRef.current ? canvasRef.current.toDataURL('image/png') : null;
    }
  }));

  // Enter Key Listener to submit drawing
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (onSubmitDrawing && !isAiThinking) {
          onSubmitDrawing();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSubmitDrawing, isAiThinking]);

  return (
    <div className="canvas-container-area">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="w-full h-full block cursor-crosshair touch-none"
      />

      {/* Binary Telemetry Status Bar */}
      <div className="canvas-status-bar font-mono">
        <div className="flex items-center gap-3">
          <span title="TERM">{textToBinary("TERM")}: <strong className="status-tag" title="xterm">{textToBinary("xterm")}</strong></span>
          <span className="hidden sm:inline" title="ENGINE">| {textToBinary("ENGINE")}: <strong className="status-tag" title="gemini-3.6">{textToBinary("gemini-3.6")}</strong></span>
        </div>
        <div className="flex items-center gap-3">
          <span title="KEYBIND">{textToBinary("KEY")}: <strong className="status-tag" title="ENTER">{textToBinary("ENTER")}</strong></span>
          <span className="hidden sm:inline" title="STATUS">| {textToBinary("STAT")}: <strong className="text-white" title="200 OK">{textToBinary("200 OK")}</strong></span>
        </div>
      </div>

      {/* AI Processing Overlay */}
      {isAiThinking && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-4 z-30 animate-fade-in font-mono text-white">
          <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-white animate-spin" />
          <div className="flex items-center gap-2.5 font-extrabold text-base tracking-wider">
            <Terminal className="w-5 h-5 text-white animate-pulse" />
            <span>[{textToBinary("PROCESSING")}]...</span>
          </div>
        </div>
      )}
    </div>
  );
});

export default Canvas;
