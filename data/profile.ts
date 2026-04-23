import type { MoneyMovement, Person } from "@/types";

export const currentUser: Person = {
  id: "joa",
  name: "Joa",
  username: "@joa.dev",
  avatarColor: "#A78BFA",
};

export const balanceMock = {
  total: 12_300,
  owedToYou: 7_200,
  youOwe: 5_100,
};

export const recentActivity: MoneyMovement[] = [
  { id: "1", label: "Pagaste 'Sushi con Juan'", amount: 8_400, tone: "danger" },
  { id: "2", label: "Te deben 'Super semana'", amount: 2_300, tone: "success" },
  { id: "3", label: "Pagaste 'Cena finde'", amount: 5_100, tone: "danger" },
  { id: "4", label: "Te deben 'Trabajo lunch'", amount: 1_800, tone: "success" },
];
