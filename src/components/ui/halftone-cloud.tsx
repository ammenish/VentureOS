"use client";

import React, { useMemo } from "react";

interface HalftoneCloudProps {
  className?: string;
  width?: number;
  height?: number;
}

export function HalftoneCloud({
  className = "",
  width = 440,
  height = 340,
}: HalftoneCloudProps) {
  // Generate a stable grid of halftone dots with varying density
  const dots = useMemo(() => {
    const list: Array<{ cx: number; cy: number; r: number; opacity: number }> = [];
    const step = 9;
    const cols = Math.floor(width / step);
    const rows = Math.floor(height / step);

    // Primary attractor centers for the cloud
    const centers = [
      { x: cols * 0.75, y: rows * 0.45, power: 1.2, radius: 18 },
      { x: cols * 0.55, y: rows * 0.65, power: 1.0, radius: 16 },
      { x: cols * 0.85, y: rows * 0.75, power: 0.9, radius: 14 },
      { x: cols * 0.4, y: rows * 0.35, power: 0.6, radius: 12 },
    ];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Compute influence from attractors
        let influence = 0;
        centers.forEach((center) => {
          const dx = c - center.x;
          const dy = r - center.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < center.radius * 2.2) {
            const factor = Math.cos((dist / (center.radius * 2.2)) * (Math.PI / 2));
            influence += Math.pow(factor, 2) * center.power;
          }
        });

        // Add subtle pseudo-noise based on coordinates
        const noise = Math.sin(c * 0.35) * Math.cos(r * 0.35) * 0.2;
        const total = Math.max(0, Math.min(1, influence + noise));

        // Threshold cutoff so it has crisp contoured cloud edges like the image
        if (total > 0.18) {
          const radius = 0.8 + total * 2.6;
          const opacity = 0.25 + total * 0.65;
          list.push({
            cx: c * step + step / 2,
            cy: r * step + step / 2,
            r: Math.min(3.4, radius),
            opacity: Math.min(0.9, opacity),
          });
        }
      }
    }
    return list;
  }, [width, height]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto select-none pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="halftoneGlow" cx="70%" cy="50%" r="45%">
            <stop offset="0%" stopColor="#111110" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#111110" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient backing aura */}
        <circle cx={width * 0.7} cy={height * 0.5} r={height * 0.45} fill="url(#halftoneGlow)" />

        {/* Halftone dots */}
        {dots.map((dot, idx) => (
          <circle
            key={idx}
            cx={dot.cx}
            cy={dot.cy}
            r={dot.r}
            fill="#111110"
            fillOpacity={dot.opacity}
          />
        ))}
      </svg>
    </div>
  );
}
