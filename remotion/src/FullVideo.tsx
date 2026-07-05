import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Sequence } from "remotion";
import { Scene1_NaiveIntro } from "./Scene1_NaiveIntro";
import { Scene2_NaiveFailure } from "./Scene2_NaiveFailure";
import { Scene3_ResilientIntro } from "./Scene3_ResilientIntro";
import { Scene4_ResilientSuccess } from "./Scene4_ResilientSuccess";

/**
 * 🎬 FullVideo — Stitches all 4 scenes with fade-to-black transitions.
 * Total: 600 frames at 30fps = 20 seconds.
 */
export const FullVideo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a" }}>
      <Sequence from={0} durationInFrames={150} name="Scene 1: Naive Intro">
        <Scene1_NaiveIntro />
      </Sequence>

      <Sequence from={150} durationInFrames={150} name="Scene 2: Naive Failure">
        <Scene2_NaiveFailure />
      </Sequence>

      <Sequence from={300} durationInFrames={150} name="Scene 3: Resilient Intro">
        <Scene3_ResilientIntro />
      </Sequence>

      <Sequence from={450} durationInFrames={150} name="Scene 4: Resilient Success">
        <Scene4_ResilientSuccess />
      </Sequence>

      {/* Scene transition overlays */}
      {frame > 140 && frame < 160 && (
        <div style={{
          position: "absolute", inset: 0,
          backgroundColor: `rgba(0,0,0,${interpolate(frame, [140, 150, 155, 160], [0, 1, 1, 0])})`,
          pointerEvents: "none",
        }} />
      )}
      {frame > 290 && frame < 310 && (
        <div style={{
          position: "absolute", inset: 0,
          backgroundColor: `rgba(0,0,0,${interpolate(frame, [290, 300, 305, 310], [0, 1, 1, 0])})`,
          pointerEvents: "none",
        }} />
      )}
      {frame > 440 && frame < 460 && (
        <div style={{
          position: "absolute", inset: 0,
          backgroundColor: `rgba(0,0,0,${interpolate(frame, [440, 450, 455, 460], [0, 1, 1, 0])})`,
          pointerEvents: "none",
        }} />
      )}
    </AbsoluteFill>
  );
};

export const getCompositions = () => {
  return [
    {
      id: "Scene1_NaiveIntro",
      component: Scene1_NaiveIntro,
      durationInFrames: 150,
      fps: 30,
      width: 1920,
      height: 1080,
    },
    {
      id: "Scene2_NaiveFailure",
      component: Scene2_NaiveFailure,
      durationInFrames: 150,
      fps: 30,
      width: 1920,
      height: 1080,
    },
    {
      id: "Scene3_ResilientIntro",
      component: Scene3_ResilientIntro,
      durationInFrames: 150,
      fps: 30,
      width: 1920,
      height: 1080,
    },
    {
      id: "Scene4_ResilientSuccess",
      component: Scene4_ResilientSuccess,
      durationInFrames: 150,
      fps: 30,
      width: 1920,
      height: 1080,
    },
    {
      id: "FullVideo",
      component: FullVideo,
      durationInFrames: 600,
      fps: 30,
      width: 1920,
      height: 1080,
    },
  ];
};
