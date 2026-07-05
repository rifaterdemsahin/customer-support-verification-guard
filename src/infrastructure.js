/**
 * @fileoverview Simulated I/O infrastructure with typed error classes.
 * Implements get_customer, lookup_order, process_refund as mock services.
 */

import { findCustomerByName, findOrderById, getCustomerById } from "./domain.js";
import { sleep } from "./utils.js";

// ── Typed Error Classes ───────────────────────────────────────────

export class CustomerNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomerNotFoundError";
    this.recoverable = false;
  }
}

export class OrderNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "OrderNotFoundError";
    this.recoverable = false;
  }
}

export class VerificationRequiredError extends Error {
  constructor(message = "get_customer prerequisite not met — customer ID required") {
    super(message);
    this.name = "VerificationRequiredError";
    this.recoverable = false;
  }
}

export class InvalidAccountError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidAccountError";
    this.recoverable = false;
  }
}

// ── Simulated I/O Services ────────────────────────────────────────

export async function get_customer(customerName) {
  await sleep(80);
  const customer = findCustomerByName(customerName);
  if (!customer) {
    throw new CustomerNotFoundError(`Customer "${customerName}" not found`);
  }
  return { id: customer.id, name: customer.name, email: customer.email, tier: customer.tier };
}

export async function lookup_order(orderId, customerId) {
  await sleep(60);
  if (!customerId) {
    throw new VerificationRequiredError();
  }
  const order = findOrderById(orderId);
  if (!order) {
    throw new OrderNotFoundError(`Order "${orderId}" not found`);
  }
  const owner = getCustomerById(customerId);
  if (order.customerId !== customerId) {
    throw new InvalidAccountError(
      `Order ${orderId} belongs to ${order.customerId}, not ${customerId}`
    );
  }
  return { id: order.id, amount: order.amount, item: order.item, status: order.status, owner: owner.name };
}

export async function process_refund(orderId, amount, customerId) {
  await sleep(100);
  if (!customerId) {
    throw new VerificationRequiredError();
  }
  const order = findOrderById(orderId);
  if (!order) {
    throw new OrderNotFoundError(`Order "${orderId}" not found`);
  }
  if (order.customerId !== customerId) {
    throw new InvalidAccountError(
      `Refund blocked: order ${orderId} belongs to ${order.customerId}, not ${customerId}`
    );
  }
  return { success: true, refundId: `REF-${orderId}`, amount, message: "Refund processed successfully" };
}
