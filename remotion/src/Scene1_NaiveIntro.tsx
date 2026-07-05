import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, Sequence } from "remotion";

/**
 * 🎬 Scene 1 — Naive Intro: Introduces the anti-pattern where get_customer is skipped.
 * Dark tech aesthetic, cyan flowchart showing get_customer → lookup_order → process_refund
 * with get_customer greyed out.
 */

const BG = "#0a0a1a";
const CYAN = "#00d4aa";
const CRIMSON = "#e94560";
const MUTED = "#8888aa";
const WHITE = "#e0e0e0";

const flowSteps = [
  { label: "🧑‍💼 get_customer", greyed: true, x: 50 },
  { label: "📦 lookup_order", greyed: false, x: 50 },
  { label: "💸 process_refund", greyed: false, x: 50 },
];

export const Scene1_NaiveIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOpacity = interpolate(frame, [0, 30], [0, 1]);
  const subtitleOpacity = interpolate(frame, [20, 50], [0, 1]);
  const flowOpacity = interpolate(frame, [40, 70], [0, 1]);
  const warningScale = spring({ frame: frame - 80, fps, config: { mass: 2, damping: 50 } });
  const isWarning = frame > 80;

  return (
    <AbsoluteFill style={{ backgroundColor: BG, fontFamily: "'SF Pro Display', sans-serif" }}>
      {/* Title */}
      <div style={{
        position: "absolute", top: 60, width: "100%", textAlign: "center",
        opacity: titleOpacity,
      }}>
        <h1 style={{ fontSize: 52, fontWeight: 800, color: CRIMSON, margin: 0 }}>
          ❌ The Naive Approach
        </h1>
      </div>

      {/* Subtitle */}
      <div style={{
        position: "absolute", top: 140, width: "100%", textAlign: "center",
        opacity: subtitleOpacity,
      }}>
        <p style={{ fontSize: 24, color: MUTED, maxWidth: 700, margin: "0 auto", lineHeight: 1.4 }}>
          Prompt-based guardrails only — no programmatic enforcement
        </p>
      </div>

      {/* Flow Diagram */}
      <div style={{
        position: "absolute", top: 300, left: 0, right: 0,
        display: "flex", justifyContent: "center", alignItems: "center", gap: 24,
        opacity: flowOpacity,
      }}>
        {/* Step 1: get_customer GREYED */}
        <div style={{
          border: `2px dashed ${CRIMSON}`, borderRadius: 12, padding: "20px 28px",
          backgroundColor: "rgba(233,69,96,0.08)", textAlign: "center",
          minWidth: 180, opacity: 0.4,
        }}>
          <div style={{ fontSize: 32 }}>🧑‍💼</div>
          <div style={{ fontSize: 18, color: MUTED, marginTop: 8 }}>get_customer</div>
          <div style={{ fontSize: 12, color: CRIMSON, marginTop: 4 }}>⚠️ SKIPPED</div>
        </div>

        <div style={{ fontSize: 28, color: MUTED }}>→</div>

        {/* Step 2: lookup_order */}
        <div style={{
          border: `2px solid ${MUTED}`, borderRadius: 12, padding: "20px 28px",
          backgroundColor: "#12122a", textAlign: "center", minWidth: 180,
        }}>
          <div style={{ fontSize: 32 }}>📦</div>
          <div style={{ fontSize: 18, color: WHITE, marginTop: 8 }}>lookup_order</div>
          <div style={{ fontSize: 12, color: MUTED, marginTop: 4 }}>by name only</div>
        </div>

        <div style={{ fontSize: 28, color: MUTED }}>→</div>

        {/* Step 3: process_refund */}
        <div style={{
          border: `2px solid ${MUTED}`, borderRadius: 12, padding: "20px 28px",
          backgroundColor: "#12122a", textAlign: "center", minWidth: 180,
        }}>
          <div style={{ fontSize: 32 }}>💸</div>
          <div style={{ fontSize: 18, color: WHITE, marginTop: 8 }}>process_refund</div>
          <div style={{ fontSize: 12, color: CRIMSON, marginTop: 4 }}>❌ WRONG ACCOUNT</div>
        </div>
      </div>

      {/* Warning icon */}
      {isWarning && (
        <div style={{
          position: "absolute", top: 500, width: "100%", textAlign: "center",
          transform: `scale(${warningScale})`,
        }}>
          <div style={{ fontSize: 60 }}>⚠️</div>
          <div style={{ fontSize: 20, color: CRIMSON, marginTop: 8 }}>12% failure rate in production</div>
        </div>
      )}
    </AbsoluteFill>
  );
};
