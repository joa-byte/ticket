import type { TicketReviewItem } from "@/types";
import { create } from "zustand";

type Assignments = Record<string, string[]>;

type TicketSplitState = {
  selectedItemId: string | null;
  assignments: Assignments;
  reviewItems: TicketReviewItem[];
  payerId: string | null;
  setSelectedItemId: (id: string | null) => void;
  togglePersonOnItem: (itemId: string, personId: string) => void;
  setReviewItems: (items: TicketReviewItem[]) => void;
  setAssignments: (assignments: Assignments) => void;
  setPayerId: (id: string | null) => void;
  reset: () => void;
};

const initialAssignments: Assignments = {};

export const useTicketSplitStore = create<TicketSplitState>((set, get) => ({
  selectedItemId: null,
  assignments: initialAssignments,
  reviewItems: [],
  payerId: "joa",
  setSelectedItemId: (id) => set({ selectedItemId: id }),
  togglePersonOnItem: (itemId, personId) => {
    const reviewItems = get().reviewItems;
    if (reviewItems.length > 0) {
      const nextItems = reviewItems.map((item) => {
        if (item.id !== itemId) return item;
        const currentQty = item.assignedQuantities[personId] ?? 0;
        const assignedOthers =
          Object.values(item.assignedQuantities).reduce((sum, value) => sum + value, 0) - currentQty;
        const remaining = Math.max(0, item.quantity - assignedOthers);
        const nextQuantity = currentQty > 0 ? 0 : Math.min(1, remaining);
        return {
          ...item,
          assignedQuantities: {
            ...item.assignedQuantities,
            [personId]: nextQuantity,
          },
        };
      });
      const assignments = Object.fromEntries(
        nextItems
          .map((item) => [
            item.id,
            Object.entries(item.assignedQuantities)
              .filter(([, value]) => value > 0)
              .map(([personId]) => personId),
          ])
          .filter(([, personIds]) => personIds.length > 0),
      );
      set({ reviewItems: nextItems, assignments });
      return;
    }

    const current = get().assignments[itemId] ?? [];
    const has = current.includes(personId);
    const next = has
      ? current.filter((p) => p !== personId)
      : [...current, personId];
    set({
      assignments: { ...get().assignments, [itemId]: next },
    });
  },
  setReviewItems: (items) => set({ reviewItems: items }),
  setAssignments: (assignments) => set({ assignments }),
  setPayerId: (id) => set({ payerId: id }),
  reset: () =>
    set({
      selectedItemId: null,
      assignments: {},
      reviewItems: [],
      payerId: "joa",
    }),
}));
