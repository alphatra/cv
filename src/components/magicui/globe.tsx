"use client";

import { cn } from "@/lib/utils";
import createGlobe from "cobe";
import { useEffect, useRef } from "react";

// Define specific types for Cobe state and instance
/* Remove unused CobeState type
type CobeState = {
  phi: number;
  theta: number;
  width?: number; // Add other known properties if available
  height?: number;
  [key: string]: any; // Allow other unknown properties if necessary
};
*/

type CobeInstance = {
  destroy: () => void;
  resize: () => void;
  // Add other known methods if available
  // Remove properties that belong to config
};

// Define a type for the cobe configuration
type CobeConfig = {
  width: number;
  height: number;
  phi: number;
  theta: number;
  mapSamples: number;
  mapBrightness: number;
  baseColor: [number, number, number];
  markerColor: [number, number, number];
  glowColor: [number, number, number];
  markers: { location: [number, number]; size: number }[]; // Example marker type
  diffuse: number;
  dark: number;
  opacity: number;
  scale: number;
  offset: [number, number]; // Correct location
  devicePixelRatio: number; // Correct location
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRender: (state: Record<string, any>) => void; // Correct location
};

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
    baseColor: [1, 1, 1],
    markerColor: [251 / 255, 100 / 255, 21 / 255],
    glowColor: [1.2, 1.2, 1.2],
    markers: [],
    diffuse: 0.4,
    dark: 1,
    opacity: 1.0,
    scale: 1.0,
    offset: [0, 0],
    onRender: () => {} // Default empty function
  },
}: {
  className?: string;
  config?: Partial<CobeConfig>; // Use partial as not all props might be provided
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Explicitly type the globe instance ref if possible, otherwise use 'any'
  // Assuming 'createGlobe' returns a specific type 'CobeInstance'
  // Replace 'any' with 'CobeInstance | null' if you have the type
  const globeRef = useRef<CobeInstance | null>(null); // Use specific CobeInstance type
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  // Simulate r based on movement. Use useRef to ensure it persists across renders.
  const r = useRef({ get: () => pointerInteractionMovement.current / 200 }).current;
  // const api = useRef({ start: () => { /* Update logic if needed */ } }).current; // Removed unused api mock

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
    }
  };

  const onResize = () => {
    if (canvasRef.current && globeRef.current) {
      // const currentWidth = canvasRef.current.offsetWidth; // Unused variable removed
      // Update the config object directly if needed, but cobe handles resize internally
      if (globeRef.current) {
        globeRef.current.resize();
      }
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use provided config values or defaults
    let currentPhi = config?.phi ?? 0;
    const currentTheta = config?.theta ?? 0.3; // Use const as it's not reassigned

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

      // Define the render function separately
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const renderFunction = (state: Record<string, any>) => { // Revert to Record<string, any>
        // Call provided onRender first if it exists
        config?.onRender?.(state);
        // Default render logic
        if (!pointerInteracting.current) {
          currentPhi += 0.005;
        }
        state.phi = currentPhi + r.get();
        state.theta = currentTheta;
      };

      const globeConfig: CobeConfig = {
        // Base config properties from props or defaults
        ...(config ?? {}),
        // Required/overridden properties
        devicePixelRatio: config?.devicePixelRatio ?? 2, // Ensure default value
        width: currentCanvas.offsetWidth * 2,
        height: currentCanvas.offsetHeight * 2,
        phi: currentPhi,
        theta: currentTheta,
        // Ensure required props have defaults if not in config
        dark: config?.dark ?? 1,
        diffuse: config?.diffuse ?? 1.2,
        mapSamples: config?.mapSamples ?? 16000,
        mapBrightness: config?.mapBrightness ?? 6,
        baseColor: config?.baseColor ?? [0.3, 0.3, 0.3],
        markerColor: config?.markerColor ?? [0.1, 0.8, 1],
        glowColor: config?.glowColor ?? [1, 1, 1],
        markers: config?.markers ?? [],
        opacity: config?.opacity ?? 1.0,
        scale: config?.scale ?? 1.0,
        offset: config?.offset ?? [0, 0],
        // Assign the defined render function
        onRender: renderFunction,
      };

      // Assign the result directly. The return type of createGlobe should be assignable to CobeInstance.
      globeRef.current = createGlobe(currentCanvas, globeConfig);
    }, 10);

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
  }, [config, r]); // Removed updateMovement dependency for now, consider useCallback if needed

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