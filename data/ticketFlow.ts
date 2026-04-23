import type { DebtTransfer, TicketLineItem } from "@/types";

export const ticketFlowMeta = {
  id: "sushi-juan",
  title: "Sushi con Juan",
  dateLabel: "22 abr 2026",
  peopleCount: 3,
};

export const ticketLineItemsMock: TicketLineItem[] = [
  { id: "li-1", label: "Sushi variado", price: 12_000 },
  { id: "li-2", label: "Vino", price: 8_000 },
  { id: "li-3", label: "Cerveza", price: 3_500 },
  { id: "li-4", label: "Postre", price: 2_000 },
];

export const ticketFlowTip =
  "Consejo: usá buena luz y evitá reflejos para leer bien los ítems.";

export const paymentSummaryMock = {
  payerPersonId: "joa",
  payerLabel: "Joa pagó",
  totalPaid: 24_000,
  totalConsumed: 25_500,
  difference: 1_500,
};

export const debtsMock: DebtTransfer[] = [
  { id: "d1", fromPersonId: "juan", toPersonId: "joa", amount: 3_000 },
  { id: "d2", fromPersonId: "ana", toPersonId: "joa", amount: 1_500 },
];
