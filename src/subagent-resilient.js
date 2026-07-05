/**
 * @fileoverview ✅ Resilient Subagent — The Answer implementation.
 * Enforces a programmatic prerequisite: blocks lookup_order and
 * process_refund calls until get_customer has returned a verified
 * customer ID. This eliminates misidentified account refunds.
 *
 * Pattern: Strict runtime validation rule — no downstream tool call
 * executes without the prerequisite verification parameter.
 */

import { get_customer, lookup_order, process_refund } from "./infrastructure.js";
import { Result } from "./domain.js";

export const MODE = "resilient";

export async function handleRequest({ customerName, orderId, withCustomerId }) {
  const attemptLog = [];
  let customerId = null;
  let customerData = null;

  // ✅ PROGRAMMATIC PREREQUISITE: Always call get_customer first.
  // The withCustomerId flag is IGNORED — verification is non-optional.
  try {
    customerData = await get_customer(customerName);
    customerId = customerData.id;
    attemptLog.push({ step: "get_customer", status: "success", customerId });
  } catch (err) {
    attemptLog.push({ step: "get_customer", status: "failed", error: err.name });
    return new Result(false, `🛡️ Blocked: ${err.message}`, {
      step: "get_customer",
      customerName,
      error: err.name,
      skipped: false,
      attemptLog,
      tokenCost: 120,
      interventions: 1,
    });
  }

  // ✅ GUARD: Programmatic prerequisite check — blocks downstream calls.
  if (!customerId) {
    return new Result(false, "🛡️ Blocked: Customer ID required before downstream operations", {
      step: "prerequisite_check",
      customerName,
      error: "VerificationRequiredError",
      attemptLog,
      tokenCost: 100,
      interventions: 1,
    });
  }

  try {
    const order = await lookup_order(orderId, customerId);
    attemptLog.push({ step: "lookup_order", status: "success", orderId });

    const refund = await process_refund(orderId, order.amount, customerId);
    attemptLog.push({ step: "process_refund", status: "success", refundId: refund.refundId });

    return new Result(true, `✅ Refund OK: ${order.item} → ${order.owner}`, {
      step: "process_refund",
      refund,
      customerId,
      attemptLog,
      tokenCost: 280,
      interventions: 0,
    });
  } catch (err) {
    attemptLog.push({ step: err.name === "InvalidAccountError" ? "process_refund" : "lookup_order", status: "failed", error: err.name });
    return new Result(false, `🛡️ Blocked: ${err.message}`, {
      step: "validation",
      error: err.name,
      customerId,
      attemptLog,
      tokenCost: 200,
      interventions: 1,
    });
  }
}
