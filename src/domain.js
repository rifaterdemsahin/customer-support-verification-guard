/**
 * @fileoverview Domain model: Customers, Orders, Refunds, and test corpus.
 * Simulates production data where ~12% of cases skip get_customer.
 */

export class Customer {
  constructor(id, name, email, tier) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.tier = tier; // 'free' | 'pro' | 'enterprise'
  }
}

export class Order {
  constructor(id, customerId, amount, item, status) {
    this.id = id;
    this.customerId = customerId;
    this.amount = amount;
    this.item = item;
    this.status = status; // 'pending' | 'completed' | 'refunded'
  }
}

export class Refund {
  constructor(orderId, amount, targetCustomerId) {
    this.orderId = orderId;
    this.amount = amount;
    this.targetCustomerId = targetCustomerId;
    this.processed = false;
    this.success = null;
    this.errorMessage = null;
  }
}

export class Result {
  constructor(success, message, details = {}) {
    this.success = success;
    this.message = message;
    this.details = details;
  }
}

const CUSTOMERS = [
  new Customer("C001", "Alice Johnson", "alice@example.com", "pro"),
  new Customer("C002", "Bob Smith", "bob@example.com", "free"),
  new Customer("C003", "Charlie Brown", "charlie@example.com", "enterprise"),
  new Customer("C004", "Diana Prince", "diana@example.com", "pro"),
  new Customer("C005", "Eve Wilson", "eve@example.com", "free"),
];

const ORDERS = [
  new Order("ORD-101", "C001", 49.99, "Wireless Mouse", "completed"),
  new Order("ORD-102", "C002", 129.50, "Keyboard", "completed"),
  new Order("ORD-103", "C003", 299.00, "Monitor", "completed"),
  new Order("ORD-104", "C004", 79.99, "Webcam", "completed"),
  new Order("ORD-105", "C005", 19.99, "USB Cable", "completed"),
  new Order("ORD-106", "C001", 199.00, "Headset", "completed"),
  new Order("ORD-107", "C002", 59.99, "Mouse Pad", "completed"),
  new Order("ORD-108", "C003", 499.00, "Docking Station", "completed"),
  new Order("ORD-109", "C004", 34.99, "Screen Protector", "completed"),
  new Order("ORD-110", "C005", 89.99, "External Drive", "completed"),
];

/**
 * Simulated production requests.
 * ~12% (3 out of 25) skip get_customer — matching the 12% failure rate.
 */
export const TEST_CORPUS = [
  { customerName: "Alice Johnson", orderId: "ORD-101", withCustomerId: true },
  { customerName: "Bob Smith", orderId: "ORD-102", withCustomerId: true },
  { customerName: "Charlie Brown", orderId: "ORD-103", withCustomerId: true },
  { customerName: "Diana Prince", orderId: "ORD-104", withCustomerId: true },
  { customerName: "Eve Wilson", orderId: "ORD-105", withCustomerId: true },
  { customerName: "Alice Johnson", orderId: "ORD-106", withCustomerId: true },
  { customerName: "Bob Smith", orderId: "ORD-102", withCustomerId: false }, // SKIP: 12% case
  { customerName: "Charlie Brown", orderId: "ORD-108", withCustomerId: true },
  { customerName: "Diana Prince", orderId: "ORD-109", withCustomerId: false }, // SKIP: 12% case
  { customerName: "Eve Wilson", orderId: "ORD-110", withCustomerId: true },
  { customerName: "Alice Johnson", orderId: "ORD-101", withCustomerId: true },
  { customerName: "Bob Smith", orderId: "ORD-107", withCustomerId: false }, // SKIP: 12% case
  { customerName: "Charlie Brown", orderId: "ORD-103", withCustomerId: true },
  { customerName: "Diana Prince", orderId: "ORD-104", withCustomerId: true },
  { customerName: "Eve Wilson", orderId: "ORD-105", withCustomerId: true },
  { customerName: "Alice Johnson", orderId: "ORD-106", withCustomerId: true },
  { customerName: "Bob Smith", orderId: "ORD-102", withCustomerId: true },
  { customerName: "Charlie Brown", orderId: "ORD-108", withCustomerId: true },
  { customerName: "Diana Prince", orderId: "ORD-109", withCustomerId: true },
  { customerName: "Eve Wilson", orderId: "ORD-110", withCustomerId: true },
  { customerName: "Alice Johnson", orderId: "ORD-101", withCustomerId: true },
  { customerName: "Bob Smith", orderId: "ORD-107", withCustomerId: true },
  { customerName: "Charlie Brown", orderId: "ORD-103", withCustomerId: true },
  { customerName: "Diana Prince", orderId: "ORD-104", withCustomerId: true },
  { customerName: "Eve Wilson", orderId: "ORD-105", withCustomerId: true },
];

export function findCustomerByName(name) {
  return CUSTOMERS.find((c) => c.name === name) || null;
}

export function findOrdersByCustomerId(customerId) {
  return ORDERS.filter((o) => o.customerId === customerId);
}

export function findOrderById(orderId) {
  return ORDERS.find((o) => o.id === orderId) || null;
}

export function getCustomerById(customerId) {
  return CUSTOMERS.find((c) => c.id === customerId) || null;
}
