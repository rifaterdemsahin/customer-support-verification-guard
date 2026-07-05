/**
 * @fileoverview Shared utilities: sleep, formatters, latency simulation.
 */

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export function formatPercent(value, total) {
  if (total === 0) return "0.00%";
  return ((value / total) * 100).toFixed(2) + "%";
}

export function padRight(str, len) {
  return str.padEnd(len, " ");
}

export function padLeft(str, len) {
  return str.padStart(len, " ");
}

export function hr(char = "─", len = 60) {
  return char.repeat(len);
}

export function banner(title) {
  const line = hr("═", 64);
  const pad = " ".repeat(Math.max(0, (64 - title.length) / 2));
  return `\n${line}\n${pad}${title}\n${line}\n`;
}

export function randomLatency(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function median(arr) {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}
