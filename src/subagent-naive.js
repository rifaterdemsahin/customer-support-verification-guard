/**
 * @fileoverview ❌ Naive Subagent — Anti-pattern implementation.
 * Skips get_customer ~12% of the time, calling lookup_order with only
 * the customer's stated name. This leads to misidentified accounts
 * and incorrect refunds.
 *
 * Pattern: Prompt-based guidance only. No programmatic enforcement.
 */

import { get_customer, lookup_order, process_refund } from "./infrastructure.js";
import { Result } from "./domain.js";

export const MODE = "naive";

export async function handleRequest({ customerName, orderId, withCustomerId }) {
  let customerId = null;
  let customerData = null;

  if (withCustomerId) {
    try {
      customerData = await get_customer(customerName);
      customerId = customerData.id;
    } catch (err) {
      return new Result(false, err.message, {
        step: "get_customer",
        customerName,
        error: err.name,
        skipped: false,
      });
    }
  }
  // ❌ ANTI-PATTERN: When withCustomerId is false, the agent skips
  // get_customer entirely and proceeds with only the customer's name.
  // No programmatic guard prevents lookup_order from running.

  try {
    const order = await lookup_order(orderId, customerId);
    if (!customerId) {
      return new Result(false, "❌ Refund processed on WRONG account (no customer ID)", {
        step: "lookup_order",
        orderId,
        customerId: null,
        orderOwner: order.owner,
        misidentified: true,
      });
    }
    const refund = await process_refund(orderId, order.amount, customerId);
    return new Result(true, `✅ Refund OK: ${order.item} → ${order.owner}`, {
      step: "process_refund",
      refund,
      customerId,
      tokenCost: 420,
      interventions: 0,
    });
  } catch (err) {
    return new Result(false, `❌ ${err.message}`, {
      step: err.name === "InvalidAccountError" ? "process_refund" : "lookup_order",
      error: err.name,
      customerId,
      tokenCost: 380,
      interventions: 1,
    });
  }
}
