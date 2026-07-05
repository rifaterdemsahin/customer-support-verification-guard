import { registerRoot } from "remotion";
import { getCompositions } from "./FullVideo";

// Bare registration — Remotion discovers compositions via getCompositions()
registerRoot(() => null);

export { getCompositions };
