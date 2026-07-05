import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";

/**
 * 🎬 Scene 4 — Resilient Success: Green flash overlay, checkmark animation,
 * solid chain links. Shows verified ID guaranteeing correct account.
 */

const BG = "#0a0a1a";
const CYAN = "#00d4aa";
const VIOLET = "#8b5cf6";
const MUTED = "#8888aa";
const WHITE = "#e0e0e0";

export const Scene4_ResilientSuccess: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOpacity = interpolate(frame, [0, 25], [0, 1]);
  const subtitleOpacity = interpolate(frame, [15, 45], [0, 1]);

  // Green flash at frame 100
  const flashOpacity = interpolate(frame, [98, 102], [0, 0.7], { extrapolateRight: "clamp" });
  const flashFade = interpolate(frame, [102, 115], [0.7, 0], { extrapolateRight: "clamp" });
  const flash2 = interpolate(frame, [108, 112], [0, 0.5], { extrapolateRight: "clamp" });
  const flashFade2 = interpolate(frame, [112, 120], [0.5, 0], { extrapolateRight: "clamp" });
  const totalFlash = frame > 98 ? (flashOpacity + flashFade + flash2 + flashFade2) : 0;

  // Success checkmark
  const checkScale = spring({ frame: frame - 102, fps, config: { mass: 1, damping: 30 } });
  const isCheck = frame > 102;

  // Metric counters
  const blockCount = Math.min(100, Math.floor(interpolate(frame, [50, 80], [0, 100], { extrapolateRight: "clamp" })));
  const successCount = Math.min(100, Math.floor(interpolate(frame, [60, 90], [0, 100], { extrapolateRight: "clamp" })));
  const tokenCount = Math.min(38, Math.floor(interpolate(frame, [70, 100], [0, 38], { extrapolateRight: "clamp" })));

  // Boxes opacity
  const boxesOpacity = interpolate(frame, [20, 50], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, fontFamily: "'SF Pro Display', sans-serif" }}>
      {/* Green flash */}
      {frame > 98 && (
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10,
          background: `radial-gradient(circle, rgba(0,212,170,${totalFlash}) 0%, transparent 70%)`,
        }} />
      )}

      {/* Title */}
      <div style={{
        position: "absolute", top: 50, width: "100%", textAlign: "center",
        opacity: titleOpacity,
      }}>
        <h1 style={{ fontSize: 48, fontWeight: 800, color: CYAN, margin: 0 }}>
          🛡️ Guard Activated — Refund Safe
        </h1>
      </div>

      {/* Subtitle */}
      <div style={{
        position: "absolute", top: 130, width: "100%", textAlign: "center",
        opacity: subtitleOpacity,
      }}>
        <p style={{ fontSize: 22, color: MUTED, maxWidth: 700, margin: "0 auto" }}>
          The destructive command is shattered by the validation shield. Verified ID ensures the correct account.
        </p>
      </div>

      {/* Success boxes */}
      <div style={{
        position: "absolute", top: 260, left: 0, right: 0,
        display: "flex", justifyContent: "center", gap: 24, opacity: boxesOpacity,
        flexWrap: "wrap", padding: "0 40px",
      }}>
        {[
          { icon: "🔒", label: "Verified", sub: "Customer ID confirmed", accent: CYAN },
          { icon: "🛡️", label: "Guarded", sub: "Prerequisite enforced", accent: CYAN },
          { icon: "💸", label: "Correct Refund", sub: "Right account, every time", accent: CYAN },
        ].map((item, i) => (
          <div key={i} style={{
            border: `2px solid ${CYAN}`, borderRadius: 12, padding: "20px 28px",
            backgroundColor: "rgba(0,212,170,0.06)", textAlign: "center", minWidth: 200,
            boxShadow: `0 0 20px rgba(0,212,170,0.15)`,
          }}>
            <div style={{ fontSize: 36 }}>{item.icon}</div>
            <div style={{ fontSize: 20, color: CYAN, fontWeight: 700, marginTop: 8 }}>✅ {item.label}</div>
            <div style={{ fontSize: 14, color: MUTED, marginTop: 4 }}>{item.sub}</div>
          </div>
        ))}
      </div>

      {/* Metrics */}
      <div style={{
        position: "absolute", bottom: 100, left: 0, right: 0,
        display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap",
      }}>
        <div style={{ textAlign: "center", minWidth: 150 }}>
          <div style={{ fontSize: 36, fontWeight: 800, color: CYAN }}>{blockCount}%</div>
          <div style={{ fontSize: 14, color: MUTED }}>🛡️ Destructive Blocked</div>
        </div>
        <div style={{ textAlign: "center", minWidth: 150 }}>
          <div style={{ fontSize: 36, fontWeight: 800, color: CYAN }}>{successCount}%</div>
          <div style={{ fontSize: 14, color: MUTED }}>🎯 Success Rate</div>
        </div>
        <div style={{ textAlign: "center", minWidth: 150 }}>
          <div style={{ fontSize: 36, fontWeight: 800, color: CYAN }}>{tokenCount}%</div>
          <div style={{ fontSize: 14, color: MUTED }}>💸 Token Reduction</div>
        </div>
      </div>

      {/* Success checkmark */}
      {isCheck && (
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: `translate(-50%,-50%) scale(${checkScale})`,
          textAlign: "center", zIndex: 20,
        }}>
          <div style={{ fontSize: 48, fontWeight: 900, color: CYAN, textShadow: "0 0 40px #00d4aa" }}>
            ✅ REFUND SAFE
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
