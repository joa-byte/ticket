export type TicketStatus = "a_dividir" | "dividido" | "cerrado";

export type ActivityTone = "success" | "danger";

export type MoneyMovement = {
  id: string;
  label: string;
  amount: number;
  tone: ActivityTone;
};

export type Person = {
  id: string;
  name: string;
  username?: string;
  avatarColor: string;
};

export type GroupIcon = "home" | "people" | "briefcase";

export type Group = {
  id: string;
  name: string;
  memberCount: number;
  icon: GroupIcon;
  gradient: readonly [string, string];
};

export type TicketListIcon = "receipt" | "cart" | "plane";

export type Ticket = {
  id: string;
  name: string;
  dateLabel: string;
  status: TicketStatus;
  amount: number;
  peopleCount?: number;
  listIcon: TicketListIcon;
};

export type TicketLineItem = {
  id: string;
  label: string;
  price: number;
};

export type DebtTransfer = {
  id: string;
  fromPersonId: string;
  toPersonId: string;
  amount: number;
};

export type StepperStep = {
  key: string;
  label: string;
};
