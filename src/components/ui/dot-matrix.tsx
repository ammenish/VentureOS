"use client";

import React from "react";

// 5x7 standard bitmap font representation (5 columns, 7 rows per char)
// Each row is encoded as a 5-bit integer (bit 4 = left, bit 0 = right)
const FONT_5X7: Record<string, number[]> = {
  A: [0x0e, 0x11, 0x11, 0x1f, 0x11, 0x11, 0x11],
  B: [0x1e, 0x11, 0x11, 0x1e, 0x11, 0x11, 0x1e],
  C: [0x0e, 0x11, 0x10, 0x10, 0x10, 0x11, 0x0e],
  D: [0x1c, 0x12, 0x11, 0x11, 0x11, 0x12, 0x1c],
  E: [0x1f, 0x10, 0x10, 0x1e, 0x10, 0x10, 0x1f],
  F: [0x1f, 0x10, 0x10, 0x1e, 0x10, 0x10, 0x10],
  G: [0x0e, 0x11, 0x10, 0x17, 0x11, 0x11, 0x0f],
  H: [0x11, 0x11, 0x11, 0x1f, 0x11, 0x11, 0x11],
  I: [0x0e, 0x04, 0x04, 0x04, 0x04, 0x04, 0x0e],
  J: [0x07, 0x02, 0x02, 0x02, 0x02, 0x12, 0x0c],
  K: [0x11, 0x12, 0x14, 0x18, 0x14, 0x12, 0x11],
  L: [0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x1f],
  M: [0x11, 0x1b, 0x15, 0x15, 0x11, 0x11, 0x11],
  N: [0x11, 0x19, 0x15, 0x13, 0x11, 0x11, 0x11],
  O: [0x0e, 0x11, 0x11, 0x11, 0x11, 0x11, 0x0e],
  P: [0x1e, 0x11, 0x11, 0x1e, 0x10, 0x10, 0x10],
  Q: [0x0e, 0x11, 0x11, 0x11, 0x15, 0x12, 0x0d],
  R: [0x1e, 0x11, 0x11, 0x1e, 0x14, 0x12, 0x11],
  S: [0x0e, 0x11, 0x10, 0x0e, 0x01, 0x11, 0x0e],
  T: [0x1f, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04],
  U: [0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x0e],
  V: [0x11, 0x11, 0x11, 0x11, 0x11, 0x0a, 0x04],
  W: [0x11, 0x11, 0x11, 0x15, 0x15, 0x1b, 0x11],
  X: [0x11, 0x11, 0x0a, 0x04, 0x0a, 0x11, 0x11],
  Y: [0x11, 0x11, 0x0a, 0x04, 0x04, 0x04, 0x04],
  Z: [0x1f, 0x01, 0x02, 0x04, 0x08, 0x10, 0x1f],
  "0": [0x0e, 0x11, 0x13, 0x15, 0x19, 0x11, 0x0e],
  "1": [0x04, 0x0c, 0x04, 0x04, 0x04, 0x04, 0x0e],
  "2": [0x0e, 0x11, 0x01, 0x06, 0x08, 0x10, 0x1f],
  "3": [0x1e, 0x01, 0x01, 0x0e, 0x01, 0x01, 0x1e],
  "4": [0x02, 0x06, 0x0a, 0x12, 0x1f, 0x02, 0x02],
  "5": [0x1f, 0x10, 0x1e, 0x01, 0x01, 0x11, 0x0e],
  "6": [0x06, 0x08, 0x10, 0x1e, 0x11, 0x11, 0x0e],
  "7": [0x1f, 0x01, 0x02, 0x04, 0x08, 0x08, 0x08],
  "8": [0x0e, 0x11, 0x11, 0x0e, 0x11, 0x11, 0x0e],
  "9": [0x0e, 0x11, 0x11, 0x0f, 0x01, 0x02, 0x0c],
  ".": [0x00, 0x00, 0x00, 0x00, 0x00, 0x04, 0x04],
  ",": [0x00, 0x00, 0x00, 0x00, 0x00, 0x04, 0x08],
  ":": [0x00, 0x04, 0x04, 0x00, 0x04, 0x04, 0x00],
  "-": [0x00, 0x00, 0x00, 0x1f, 0x00, 0x00, 0x00],
  "+": [0x00, 0x04, 0x04, 0x1f, 0x04, 0x04, 0x00],
  "%": [0x19, 0x19, 0x02, 0x04, 0x08, 0x13, 0x13],
  x: [0x00, 0x00, 0x11, 0x0a, 0x04, 0x0a, 0x11],
  " ": [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
};

interface DotMatrixTextProps {
  text: string;
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  dotColor?: string;
  ghostColor?: string;
  showGhost?: boolean;
  className?: string;
}

export function DotMatrixText({
  text,
  size = "md",
  dotColor = "#111110",
  ghostColor = "rgba(0, 0, 0, 0.04)",
  showGhost = true,
  className = "",
}: DotMatrixTextProps) {
  // Config per size
  const config = {
    sm: { pitch: 3.2, radius: 1.0, charSpacing: 1.5 },
    md: { pitch: 4.2, radius: 1.35, charSpacing: 2 },
    lg: { pitch: 5.6, radius: 1.8, charSpacing: 2.8 },
    xl: { pitch: 7.2, radius: 2.3, charSpacing: 3.5 },
    hero: { pitch: 9.0, radius: 2.9, charSpacing: 4.5 },
  }[size];

  const chars = text.toUpperCase().split("");
  const charWidth = 5;
  const charHeight = 7;
  const colPitch = config.pitch;
  const rowPitch = config.pitch;
  const charSpace = config.charSpacing * colPitch;

  // Calculate total SVG viewBox
  let totalWidth = 0;
  chars.forEach((char, index) => {
    const isSpecialDot = char === ".";
    const width = isSpecialDot ? 2 * colPitch : charWidth * colPitch;
    totalWidth += width;
    if (index < chars.length - 1) totalWidth += charSpace;
  });

  const totalHeight = charHeight * rowPitch;

  let currentX = 0;

  return (
    <svg
      viewBox={`-2 -2 ${totalWidth + 4} ${totalHeight + 4}`}
      className={`inline-block align-middle select-none ${className}`}
      style={{
        height: `${totalHeight}px`,
        maxWidth: "100%",
        display: "inline-block",
      }}
      aria-label={text}
      role="img"
    >
      {chars.map((char, charIdx) => {
        const matrix = FONT_5X7[char] || FONT_5X7[" "];
        const isDot = char === ".";
        const numCols = isDot ? 2 : charWidth;
        const charStartX = currentX;

        // Advance cursor for next char
        currentX += (numCols * colPitch) + (charIdx < chars.length - 1 ? charSpace : 0);

        const dots: React.ReactNode[] = [];

        for (let r = 0; r < charHeight; r++) {
          const rowVal = matrix[r] ?? 0;
          for (let c = 0; c < numCols; c++) {
            // For 5 columns, bit 4 is leftmost (c=0), bit 0 is rightmost (c=4)
            const bit = (rowVal >> (4 - c)) & 1;
            const cx = charStartX + c * colPitch + colPitch / 2;
            const cy = r * rowPitch + rowPitch / 2;

            if (bit === 1) {
              dots.push(
                <circle
                  key={`dot-${charIdx}-${r}-${c}`}
                  cx={cx}
                  cy={cy}
                  r={config.radius}
                  fill={dotColor}
                />
              );
            } else if (showGhost) {
              dots.push(
                <circle
                  key={`ghost-${charIdx}-${r}-${c}`}
                  cx={cx}
                  cy={cy}
                  r={config.radius * 0.75}
                  fill={ghostColor}
                />
              );
            }
          }
        }

        return <g key={`char-${charIdx}`}>{dots}</g>;
      })}
    </svg>
  );
}

// PlayerZero style high-tech badge icon (3x3 grid inside pill or square)
export function DotBadgeIcon({
  variant = "coral",
  size = "md",
}: {
  variant?: "coral" | "white" | "monochrome" | "emerald";
  size?: "sm" | "md";
}) {
  const dotColor = {
    coral: "#FF4F00",
    white: "#FFFFFF",
    monochrome: "#71717A",
    emerald: "#10B981",
  }[variant];

  const dim = size === "sm" ? 14 : 18;
  const dotR = size === "sm" ? 1.2 : 1.5;

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-md ${
        variant === "coral"
          ? "bg-[#FF4F00]/15 border border-[#FF4F00]/30"
          : "bg-white/10 border border-white/20"
      }`}
      style={{ width: dim, height: dim }}
    >
      <svg width={dim} height={dim} viewBox="0 0 16 16">
        {/* 3x3 dot matrix */}
        {[3.5, 8, 12.5].map((y, row) =>
          [3.5, 8, 12.5].map((x, col) => (
            <circle
              key={`${row}-${col}`}
              cx={x}
              cy={y}
              r={dotR}
              fill={dotColor}
              opacity={(row + col) % 2 === 0 ? 1 : 0.75}
            />
          ))
        )}
      </svg>
    </div>
  );
}

// Geometric emblem inspired by the center logo in the reference screenshot
export function VentureMark({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="40" height="40" rx="10" fill="#111110" />
      {/* 4 balanced corner squircle petals forming an aperture */}
      <rect x="8" y="8" width="10" height="10" rx="3" fill="#FFFFFF" />
      <rect x="22" y="8" width="10" height="10" rx="3" fill="#FFFFFF" />
      <rect x="8" y="22" width="10" height="10" rx="3" fill="#FFFFFF" />
      <rect x="22" y="22" width="10" height="10" rx="3" fill="#FFFFFF" />
      {/* Center micro core dot */}
      <circle cx="20" cy="20" r="2.5" fill="#FF4F00" />
    </svg>
  );
}
