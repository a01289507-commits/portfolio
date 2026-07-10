"use client";

import { useEffect, useRef } from "react";

const THROTTLE_MS = 25;

export default function RainbowCursorTrail() {
  const lastSpawn = useRef(0);
  const hue = useRef(0);

  useEffect(() => {
    function spawnDot(x: number, y: number) {
      const dot = document.createElement("div");
      dot.style.position = "fixed";
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      dot.style.width = "10px";
      dot.style.height = "10px";
      dot.style.borderRadius = "50%";
      dot.style.background = `hsl(${hue.current}, 85%, 60%)`;
      dot.style.pointerEvents = "none";
      dot.style.transform = "translate(-50%, -50%)";
      dot.style.zIndex = "9999";
      document.body.appendChild(dot);

      hue.current = (hue.current + 8) % 360;

      let start: number | null = null;
      const duration = 700;

      function frame(t: number) {
        if (start === null) start = t;
        const p = (t - start) / duration;
        if (p >= 1) {
          dot.remove();
          return;
        }
        dot.style.transform = `translate(-50%, -50%) scale(${1 - p * 0.6})`;
        dot.style.opacity = `${1 - p}`;
        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    function handleMouseMove(e: MouseEvent) {
      const now = Date.now();
      if (now - lastSpawn.current < THROTTLE_MS) return;
      lastSpawn.current = now;
      spawnDot(e.clientX, e.clientY);
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return null;
}