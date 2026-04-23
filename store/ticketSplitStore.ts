import { create } from "zustand";

type Assignments = Record<string, string[]>;

type TicketSplitState = {
  selectedItemId: string | null;
  assignments: Assignments;
  payerId: string | null;
  setSelectedItemId: (id: string | null) => void;
  togglePersonOnItem: (itemId: string, personId: string) => void;
  setPayerId: (id: string | null) => void;
  reset: () => void;
};

const initialAssignments: Assignments = {};

export const useTicketSplitStore = create<TicketSplitState>((set, get) => ({
  selectedItemId: null,
  assignments: initialAssignments,
  payerId: "joa",
  setSelectedItemId: (id) => set({ selectedItemId: id }),
  togglePersonOnItem: (itemId, personId) => {
    const current = get().assignments[itemId] ?? [];
    const has = current.includes(personId);
    const next = has
      ? current.filter((p) => p !== personId)
      : [...current, personId];
    set({
      assignments: { ...get().assignments, [itemId]: next },
    });
  },
  setPayerId: (id) => set({ payerId: id }),
  reset: () =>
    set({
      selectedItemId: null,
      assignments: {},
      payerId: "joa",
    }),
}));
