// src/styles/tokens.ts
// Single source of truth for the LOrdEnRYQuE design system.

export const tokens = {
  colors: {
    brand: {
      bg: "#050505",       // Deep Obsidian
      surface: "#0B0B0B",  // Surface Level 1
      surface2: "#141414", // Surface Level 2
      text: "#F5F5F5",     // Primary text
      muted: "#A1A1AA",    // Muted text
      accent: "#94A3B8",   // Prismatic Silver (Base)
      silver: "#94A3B8",
      blue: "#3B82F6",
      green: "#10B981",
      purple: "#8B5CF6",
      accentAlpha: "rgba(148, 163, 184, 0.15)", // For highlights and glows
      border: "rgba(255, 255, 255, 0.08)", // Subtle glass border
    }
  },
  animation: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
    },
    easing: {
      smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    }
  }
};
