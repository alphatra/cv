"use client";

import React, { useRef, useEffect } from 'react';
import createGlobe from "cobe";

// Define a type for the globe instance if possible, otherwise use a generic approach
// Assuming the instance has destroy() and resize() methods based on usage
type GlobeInstance = { destroy: () => void; resize: () => void; };

const GlobeCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    let globeInstance: GlobeInstance | null = null;
    const currentCanvas = canvasRef.current;

    if (currentCanvas && currentCanvas.offsetWidth > 0) {
      globeInstance = createGlobe(currentCanvas, {
        devicePixelRatio: 2,
        width: currentCanvas.offsetWidth * 2,
        height: currentCanvas.offsetHeight * 2,
        phi: 0,
        theta: 0.1,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.3, 0.3, 0.3],
        markerColor: [0.1, 0.8, 1],
        glowColor: [1, 1, 1],
        markers: [],
        onRender: (state) => {
          if (!canvasRef.current) return;
          state.phi = phi;
          phi += 0.005;
          state.width = canvasRef.current.offsetWidth * 2;
          state.height = canvasRef.current.offsetHeight * 2;
        }
      });

      setTimeout(() => globeInstance?.resize(), 10);
    } else if (currentCanvas) {
      const retryTimeout = setTimeout(() => {
         if (canvasRef.current && canvasRef.current.offsetWidth > 0) {
             console.log("Retrying globe init");
             // Potentially re-call the setup logic if needed
         }
      }, 50);
      return () => clearTimeout(retryTimeout);
    }

    return (): void => {
      globeInstance?.destroy();
    };
  }, []);

  return (
    <div className="bg-[#BA9CFF] border-none shadow-lg flex items-center justify-center h-full overflow-hidden rounded-lg">
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          contain: 'layout paint size',
          cursor: 'grab',
          userSelect: 'none',
        }}
      />
    </div>
  );
};

export default GlobeCard; 