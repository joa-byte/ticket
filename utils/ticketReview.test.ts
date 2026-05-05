import type { Person, TicketReviewItem } from "@/types";
import {
    calculateAssignedQuantity,
    calculateItemTotal,
    calculatePersonSummary,
    calculateRemainingQuantity,
    normalizeTicketReviewItems,
    validateReviewItem,
} from "@/utils/ticketReview";

describe("Ticket Review Calculations", () => {
  const mockItems = [
    { id: "item-1", label: "Birra", price: 2000 },
    { id: "item-2", label: "Pizza", price: 5000 },
  ];

  const mockPeople: Person[] = [
    { id: "p1", name: "Nico", avatarColor: "#A78FF2" },
    { id: "p2", name: "Juan", avatarColor: "#6FD4A8" },
    { id: "p3", name: "Sofía", avatarColor: "#F4B28C" },
  ];

  test("normalizeTicketReviewItems creates items with default structure", () => {
    const normalized = normalizeTicketReviewItems(mockItems);
    expect(normalized).toHaveLength(2);
    expect(normalized[0]).toMatchObject({
      id: "item-1",
      label: "Birra",
      quantity: 1,
      unitPrice: 2000,
      total: 2000,
      assignedQuantities: {},
    });
  });

  test("calculateItemTotal multiplies quantity by unit price", () => {
    const total = calculateItemTotal(10, 2000);
    expect(total).toBe(20000);
  });

  test("calculateAssignedQuantity sums all person quantities", () => {
    const item: TicketReviewItem = {
      id: "i1",
      label: "Test",
      notes: "",
      quantity: 10,
      unitPrice: 100,
      total: 1000,
      assignedQuantities: { p1: 4, p2: 3, p3: 2 },
    };
    const assigned = calculateAssignedQuantity(item);
    expect(assigned).toBe(9);
  });

  test("calculateRemainingQuantity calculates unassigned units", () => {
    const item: TicketReviewItem = {
      id: "i1",
      label: "Test",
      notes: "",
      quantity: 10,
      unitPrice: 100,
      total: 1000,
      assignedQuantities: { p1: 4, p2: 3 },
    };
    const remaining = calculateRemainingQuantity(item);
    expect(remaining).toBe(3);
  });

  test("calculatePersonSummary aggregates amounts per person", () => {
    const items: TicketReviewItem[] = [
      {
        id: "i1",
        label: "Birra",
        notes: "",
        quantity: 10,
        unitPrice: 2000,
        total: 20000,
        assignedQuantities: { p1: 4, p2: 3, p3: 3 },
      },
    ];
    const summary = calculatePersonSummary(items, mockPeople);
    expect(summary).toHaveLength(3);
    expect(summary[0]).toMatchObject({ personId: "p1", name: "Nico", amount: 8000 });
    expect(summary[1]).toMatchObject({ personId: "p2", name: "Juan", amount: 6000 });
    expect(summary[2]).toMatchObject({ personId: "p3", name: "Sofía", amount: 6000 });
  });

  test("validateReviewItem detects quantity less than 1", () => {
    const item: TicketReviewItem = {
      id: "i1",
      label: "Test",
      notes: "",
      quantity: 0,
      unitPrice: 100,
      total: 0,
      assignedQuantities: {},
    };
    const errors = validateReviewItem(item);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.includes("cantidad"))).toBe(true);
  });

  test("validateReviewItem detects total mismatch", () => {
    const item: TicketReviewItem = {
      id: "i1",
      label: "Test",
      notes: "",
      quantity: 5,
      unitPrice: 100,
      total: 600, // Should be 500
      assignedQuantities: {},
    };
    const errors = validateReviewItem(item);
    expect(errors.some((e) => e.includes("total"))).toBe(true);
  });

  test("validateReviewItem detects excess assignment", () => {
    const item: TicketReviewItem = {
      id: "i1",
      label: "Test",
      notes: "",
      quantity: 5,
      unitPrice: 100,
      total: 500,
      assignedQuantities: { p1: 3, p2: 3 }, // Total 6 > 5
    };
    const errors = validateReviewItem(item);
    expect(errors.some((e) => e.includes("asignación"))).toBe(true);
  });
});
