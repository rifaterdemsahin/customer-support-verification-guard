import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";

/**
 * 🎬 Scene 2 — Naive Failure: Red flash overlay, misidentified account warning.
 * Shows the consequence of skipping the prerequisite check.
 */

const BG = "#0a0a1a";
const CRIMSON = "#e94560";
const MUTED = "#8888aa";
const WHITE = "#e0e0e0";

export const Scene2_NaiveFailure: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOpacity = interpolate(frame, [0, 25], [0, 1]);
  const subtitleOpacity = interpolate(frame, [15, 45], [0, 1]);

  // Red flash: pulses at frame 60, 70, 80
  const flash1 = interpolate(frame, [58, 62], [0, 0.6], { extrapolateRight: "clamp" });
  const flashFade1 = interpolate(frame, [62, 70], [0.6, 0], { extrapolateRight: "clamp" });
  const flash2 = interpolate(frame, [70, 74], [0, 0.4], { extrapolateRight: "clamp" });
  const flashFade2 = interpolate(frame, [74, 80], [0.4, 0], { extrapolateRight: "clamp" });
  const flash3 = interpolate(frame, [82, 86], [0, 0.8], { extrapolateRight: "clamp" });
  const flashFade3 = interpolate(frame, [86, 100], [0.8, 0], { extrapolateRight: "clamp" });

  const flashOpacity = flash1 + flash2 + flash3;
  const flashOpacityFade = flashFade1 + flashFade2 + flashFade3;
  const finalFlash = frame > 58 ? flashOpacity : flashOpacityFade;

  // Warning panel
  const warnScale = spring({ frame: frame - 62, fps, config: { mass: 1, damping: 30 } });
  const isWarn = frame > 62;
  const chainsOpacity = interpolate(frame, [30, 60], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, fontFamily: "'SF Pro Display', sans-serif" }}>
      {/* Red flash overlay */}
      {frame > 58 && (
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(circle, rgba(233,69,96,${finalFlash}) 0%, transparent 70%)`,
          zIndex: 10,
        }} />
      )}

      {/* Title */}
      <div style={{
        position: "absolute", top: 60, width: "100%", textAlign: "center",
        opacity: titleOpacity,
      }}>
        <h1 style={{ fontSize: 52, fontWeight: 800, color: CRIMSON, margin: 0 }}>
          💥 System Compromised
        </h1>
      </div>

      {/* Subtitle */}
      <div style={{
        position: "absolute", top: 150, width: "100%", textAlign: "center",
        opacity: subtitleOpacity,
      }}>
        <p style={{ fontSize: 24, color: MUTED, maxWidth: 700, margin: "0 auto" }}>
          Without a verified customer ID — the wrong account is charged
        </p>
      </div>

      {/* Failure boxes */}
      <div style={{
        position: "absolute", top: 300, left: 0, right: 0,
        display: "flex", justifyContent: "center", gap: 24, opacity: chainsOpacity,
        flexWrap: "wrap", padding: "0 40px",
      }}>
        {[
          { icon: "🔒", label: "Misidentified", sub: "Alice's refund → Bob's account", accent: CRIMSON },
          { icon: "⚠️", label: "Data Leak", sub: "Cross-account exposure", accent: CRIMSON },
          { icon: "💸", label: "Wrong Refund", sub: "$129.50 lost", accent: CRIMSON },
        ].map((item, i) => (
          <div key={i} style={{
            border: `2px solid ${CRIMSON}`, borderRadius: 12, padding: "20px 28px",
            backgroundColor: "rgba(233,69,96,0.08)", textAlign: "center", minWidth: 200,
          }}>
            <div style={{ fontSize: 36 }}>{item.icon}</div>
            <div style={{ fontSize: 20, color: CRIMSON, fontWeight: 700, marginTop: 8 }}>❌ {item.label}</div>
            <div style={{ fontSize: 14, color: MUTED, marginTop: 4 }}>{item.sub}</div>
          </div>
        ))}
      </div>

      {/* Warning panel */}
      {isWarn && (
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: `translate(-50%,-50%) scale(${warnScale})`,
          textAlign: "center", zIndex: 20,
        }}>
          <div style={{ fontSize: 48, fontWeight: 900, color: CRIMSON, textShadow: "0 0 40px #e94560" }}>
            ⚠️ UNAUTHORIZED REFUND
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
