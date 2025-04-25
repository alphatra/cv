"use client";

import { cn } from "@/lib/utils";
import createGlobe from "cobe";
import { useEffect, useRef } from "react";

// NOTE: This is a simplified version for demonstration.
// For the full features and options, refer to the magicui documentation.

export function Globe({
  className,
  config = { // Provide a default config object shape
    width: 600,
    height: 600,
    phi: 0,
    theta: 0.3,
    mapSamples: 16000,
    mapBrightness: 1.2,
    baseColor: [1, 1, 1] as [number, number, number],
    markerColor: [251 / 255, 100 / 255, 21 / 255] as [number, number, number],
    glowColor: [1.2, 1.2, 1.2] as [number, number, number],
    markers: [],
    diffuse: 0.4,
    dark: 1,
    opacity: 1.0,
    scale: 1.0,
    offset: [0, 0],
    onRender: (state: Record<string, any>) => {}
  },
}: {
  className?: string;
  config?: any; // Using any for simplicity, refer to cobe types for specifics
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<any>(null); // To store the globe instance
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const r = { value: 0, get: () => 0 }; // Mock 'r' object
  const api = { start: (_config: any) => {} }; // Mock 'api' object, accepting an argument

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      api.start({ r: delta / 200 }); // Mock call
    }
  };

  const onResize = () => {
    if (canvasRef.current && globeRef.current) {
      const currentWidth = canvasRef.current.offsetWidth;
      // Update the config object directly if needed, but cobe handles resize internally
      if (globeRef.current) {
        globeRef.current.resize();
      }
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let currentPhi = config.phi;
    let currentTheta = config.theta;

    const onMouseMove = (e: MouseEvent) => updateMovement(e.clientX);
    const onTouchMove = (e: TouchEvent) => e.touches[0] && updateMovement(e.touches[0].clientX);
    const onMouseUp = () => {
      updatePointerInteraction(null);
      // Update internal phi state based on drag
      currentPhi = currentPhi + pointerInteractionMovement.current / 200;
    };
    const onMouseDown = (e: MouseEvent) => {
      updatePointerInteraction(e.clientX);
      pointerInteractionMovement.current = 0; // Reset movement on new press
    };
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches[0]) {
        updatePointerInteraction(e.touches[0].clientX);
        pointerInteractionMovement.current = 0; // Reset movement on new press
      }
    };

    window.addEventListener('resize', onResize);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("touchend", onMouseUp);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });

    const timeoutId = setTimeout(() => {
      const currentCanvas = canvasRef.current;
      if (!currentCanvas || currentCanvas.offsetWidth === 0) return;

      const minimalConfig = {
        devicePixelRatio: 2,
        width: currentCanvas.offsetWidth * 2,
        height: currentCanvas.offsetHeight * 2,
        phi: currentPhi,
        theta: currentTheta,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.3, 0.3, 0.3] as [number, number, number],
        markerColor: [0.1, 0.8, 1] as [number, number, number],
        glowColor: [1, 1, 1] as [number, number, number],
        markers: [], // Start with no markers
        onRender: (state: Record<string, any>) => {
          if (!pointerInteracting.current) {
            currentPhi += 0.005;
            state.phi = currentPhi + r.get();
          } else {
            state.phi = currentPhi + pointerInteractionMovement.current / 200;
          }
          state.theta = currentTheta;
          // Ensure width/height are updated in state if needed, though resize handles canvas
          state.width = currentCanvas.offsetWidth * 2;
          state.height = currentCanvas.offsetHeight * 2;
        }
      };
      globeRef.current = createGlobe(currentCanvas, minimalConfig);
    }, 10); // Small delay might help

    return () => {
      clearTimeout(timeoutId);
      globeRef.current?.destroy();
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchend", onMouseUp);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("touchmove", onTouchMove);
    };
  }, []); // Rerun effect only on mount/unmount

  return (
    <div className={cn(
      "aspect-square w-full",
      className
    )}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          contain: "layout paint size",
          cursor: "auto",
          userSelect: "none",
        }}
      />
    </div>
  );
} 