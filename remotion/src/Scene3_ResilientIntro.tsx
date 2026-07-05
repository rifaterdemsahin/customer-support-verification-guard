import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";

/**
 * 🎬 Scene 3 — Resilient Intro: Violet/green shift with lock icon on get_customer.
 * Introduces the programmatic prerequisite architecture.
 */

const BG = "#0a0a1a";
const CYAN = "#00d4aa";
const VIOLET = "#8b5cf6";
const MUTED = "#8888aa";
const WHITE = "#e0e0e0";

export const Scene3_ResilientIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOpacity = interpolate(frame, [0, 25], [0, 1]);
  const subtitleOpacity = interpolate(frame, [15, 45], [0, 1]);

  // Flow steps illuminate in sequence
  const step1Glow = interpolate(frame, [30, 45], [0, 1], { extrapolateRight: "clamp" });
  const step2Glow = interpolate(frame, [50, 65], [0, 1], { extrapolateRight: "clamp" });
  const step3Glow = interpolate(frame, [70, 85], [0, 1], { extrapolateRight: "clamp" });
  const step4Glow = interpolate(frame, [90, 105], [0, 1], { extrapolateRight: "clamp" });

  const lockScale = spring({ frame: frame - 40, fps, config: { mass: 1.5, damping: 40 } });
  const codeBlockOpacity = interpolate(frame, [95, 120], [0, 1], { extrapolateRight: "clamp" });

  const glowColor = (t: number) => `0 0 ${20 * t}px rgba(0,212,170,${0.4 * t})`;
  const borderColor = (t: number) => {
    const r = Math.round(0 * (1 - t) + 0 * t);
    const g = Math.round(136 * (1 - t) + 212 * t);
    const b = Math.round(170 * (1 - t) + 170 * t);
    return `rgb(${r},${g},${b})`;
  };

  return (
    <AbsoluteFill style={{ backgroundColor: BG, fontFamily: "'SF Pro Display', sans-serif" }}>
      {/* Title */}
      <div style={{
        position: "absolute", top: 50, width: "100%", textAlign: "center",
        opacity: titleOpacity,
      }}>
        <h1 style={{ fontSize: 48, fontWeight: 800, color: VIOLET, margin: 0 }}>
          ✅ The Resilient Architecture
        </h1>
      </div>

      {/* Subtitle */}
      <div style={{
        position: "absolute", top: 130, width: "100%", textAlign: "center",
        opacity: subtitleOpacity,
      }}>
        <p style={{ fontSize: 22, color: MUTED, maxWidth: 700, margin: "0 auto" }}>
          Programmatic prerequisite: blocks downstream until get_customer returns verified ID
        </p>
      </div>

      {/* Flow Diagram */}
      <div style={{
        position: "absolute", top: 250, left: 0, right: 0,
        display: "flex", justifyContent: "center", alignItems: "center", gap: 16,
        flexWrap: "wrap", padding: "0 20px",
      }}>
        {[
          { icon: "🔒", label: "get_customer", sub: "VERIFIED FIRST", t: step1Glow },
          { icon: "🔑", label: "verify ID", sub: "guard check", t: step2Glow },
          { icon: "📦", label: "lookup_order", sub: "safe to call", t: step3Glow },
          { icon: "💸", label: "process_refund", sub: "correct account", t: step4Glow },
        ].map((item, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div style={{ fontSize: 24, color: MUTED }}>→</div>}
            <div style={{
              border: `2px solid ${borderColor(item.t)}`, borderRadius: 12, padding: "16px 22px",
              backgroundColor: `rgba(0,212,170,${0.06 * item.t})`,
              textAlign: "center", minWidth: 150,
              boxShadow: glowColor(item.t),
              transition: "all 0.3s",
            }}>
              <div style={{ fontSize: 30 }}>{item.icon}</div>
              <div style={{ fontSize: 16, color: WHITE, marginTop: 6 }}>{item.label}</div>
              <div style={{ fontSize: 11, color: item.t > 0.5 ? CYAN : MUTED, marginTop: 2 }}>{item.sub}</div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Lock icon animation */}
      <div style={{
        position: "absolute", top: 400, width: "100%", textAlign: "center",
        transform: `scale(${lockScale})`,
      }}>
        <div style={{ fontSize: 50 }}>🔒</div>
        <div style={{ fontSize: 18, color: CYAN, marginTop: 8 }}>
          if (!customerId) throw Error
        </div>
      </div>

      {/* Code block */}
      <div style={{
        position: "absolute", bottom: 60, left: "50%", transform: "translateX(-50%)",
        opacity: codeBlockOpacity,
        backgroundColor: "rgba(0,0,0,0.4)", borderRadius: 8, padding: "16px 24px",
        border: "1px solid rgba(0,212,170,0.3)",
      }}>
        <code style={{ fontSize: 13, color: CYAN, fontFamily: "'SF Mono', monospace" }}>
          const customer = await get_customer(name); // ALWAYS
        </code>
        <br />
        <code style={{ fontSize: 13, color: VIOLET, fontFamily: "'SF Mono', monospace" }}>
          if (!customer.id) throw new VerificationRequiredError();
        </code>
      </div>
    </AbsoluteFill>
  );
};
