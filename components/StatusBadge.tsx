import { StyleSheet, Text, View } from "react-native";
import { colors, radii } from "@/constants/theme";
import type { TicketStatus } from "@/types";

const copy: Record<TicketStatus, string> = {
  a_dividir: "A dividir",
  dividido: "Dividido",
  cerrado: "Cerrado",
};

function palette(status: TicketStatus) {
  switch (status) {
    case "a_dividir":
      return {
        bg: colors.primarySoft,
        fg: colors.primaryDark,
      };
    case "dividido":
      return {
        bg: colors.chipGreenSoft,
        fg: colors.chipGreen,
      };
    case "cerrado":
      return {
        bg: colors.cerradoSoft,
        fg: colors.cerradoMuted,
      };
  }
}

/** Chip suave tipo pastilla, sin borde duro */
export function StatusBadge({ status }: { status: TicketStatus }) {
  const p = palette(status);
  return (
    <View style={[styles.badge, { backgroundColor: p.bg }]}>
      <Text style={[styles.text, { color: p.fg }]}>{copy[status]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radii.full,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.15,
  },
});
