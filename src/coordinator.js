/**
 * @fileoverview Coordinator — Orchestrates both naive and resilient subagents
 * against the same test corpus via a duck-typed interface.
 *
 * Both subagents expose: async handleRequest({ customerName, orderId, withCustomerId }) → Result
 */

import { TEST_CORPUS } from "./domain.js";

export async function runScenario(subagent, label) {
  const results = [];
  const metrics = {
    label,
    total: TEST_CORPUS.length,
    success: 0,
    failure: 0,
    misidentified: 0,
    blocked: 0,
    tokenCost: 0,
    interventions: 0,
    latencies: [],
  };

  const startTime = performance.now();

  for (const item of TEST_CORPUS) {
    const t0 = performance.now();
    const result = await subagent.handleRequest(item);
    const elapsed = performance.now() - t0;

    metrics.latencies.push(elapsed);
    metrics.tokenCost += result.details.tokenCost || 0;
    metrics.interventions += result.details.interventions || 0;

    if (result.success) {
      metrics.success++;
    } else {
      metrics.failure++;
      if (result.details.misidentified) {
        metrics.misidentified++;
      }
      if (result.message.includes("Blocked")) {
        metrics.blocked++;
      }
    }

    results.push({ input: item, result, latencyMs: elapsed });
  }

  metrics.totalTime = performance.now() - startTime;
  return { results, metrics };
}
