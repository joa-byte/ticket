import type { Person, PersonAmountSummary, TicketLineItem, TicketReviewItem } from "@/types";
import { formatCurrency } from "@/utils/formatCurrency";

export function normalizeTicketReviewItems(
  items: TicketLineItem[],
): TicketReviewItem[] {
  return items.map((item) => ({
    id: item.id,
    label: item.label,
    notes: "",
    quantity: 1,
    unitPrice: item.price,
    total: item.price,
    assignedQuantities: {},
  }));
}

export function calculateItemTotal(quantity: number, unitPrice: number) {
  return Math.max(0, Math.round(quantity * unitPrice));
}

export function calculateAssignedQuantity(item: TicketReviewItem) {
  return Object.values(item.assignedQuantities).reduce((sum, quantity) => sum + quantity, 0);
}

export function calculateRemainingQuantity(item: TicketReviewItem) {
  const assigned = calculateAssignedQuantity(item);
  return Math.max(0, item.quantity - assigned);
}

export function calculateItemPersonAmount(item: TicketReviewItem, personId: string) {
  return Math.max(0, (item.assignedQuantities[personId] ?? 0) * item.unitPrice);
}

export function calculatePersonSummary(
  items: TicketReviewItem[],
  people: Person[],
): PersonAmountSummary[] {
  return people.map((person) => {
    const assignedQuantity = items.reduce(
      (sum, item) => sum + (item.assignedQuantities[person.id] ?? 0),
      0,
    );
    const amount = items.reduce(
      (sum, item) => sum + calculateItemPersonAmount(item, person.id),
      0,
    );
    return {
      personId: person.id,
      name: person.name,
      assignedQuantity,
      amount,
    };
  });
}

export function validateReviewItem(item: TicketReviewItem) {
  const errors: string[] = [];

  if (!item.label.trim()) {
    errors.push("El nombre del item es obligatorio.");
  }

  if (item.quantity < 1) {
    errors.push("La cantidad debe ser mayor a 0.");
  }

  if (item.unitPrice < 0) {
    errors.push("El precio unitario no puede ser negativo.");
  }

  if (item.total < 0) {
    errors.push("El total no puede ser negativo.");
  }

  const computedTotal = calculateItemTotal(item.quantity, item.unitPrice);
  if (item.total !== computedTotal) {
    errors.push(
      `El total debería ser ${formatCurrency(computedTotal)} según cantidad x precio unitario.`,
    );
  }

  const assigned = calculateAssignedQuantity(item);
  if (assigned > item.quantity) {
    errors.push("La asignación supera la cantidad total.");
  }

  return errors;
}

export function hasReviewErrors(items: TicketReviewItem[]) {
  return items.some((item) => validateReviewItem(item).length > 0);
}
