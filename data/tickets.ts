import type { Ticket } from "@/types";

export const ticketsMock: Ticket[] = [
  {
    id: "sushi-juan",
    name: "Sushi con Juan",
    dateLabel: "22 abr 2026",
    status: "a_dividir",
    amount: 24_000,
    peopleCount: 3,
    listIcon: "receipt",
  },
  {
    id: "casa-mayo",
    name: "Supermercado Casa",
    dateLabel: "18 abr 2026",
    status: "dividido",
    amount: 42_300,
    peopleCount: 4,
    listIcon: "cart",
  },
  {
    id: "asado",
    name: "Asado finde",
    dateLabel: "12 abr 2026",
    status: "cerrado",
    amount: 18_900,
    peopleCount: 6,
    listIcon: "plane",
  },
];
