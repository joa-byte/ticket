import { Ionicons } from "@expo/vector-icons";
import { type ComponentProps } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radii, shadows, spacing, typography } from "@/constants/theme";
import { formatCurrency } from "@/utils/formatCurrency";
import type { Ticket, TicketListIcon } from "@/types";
import { StatusBadge } from "./StatusBadge";

type IonName = NonNullable<ComponentProps<typeof Ionicons>["name"]>;

const listIcons: Record<TicketListIcon, IonName> = {
  receipt: "receipt-outline",
  cart: "cart-outline",
  plane: "airplane-outline",
};

type TicketCardProps = {
  ticket: Ticket;
  onPress?: () => void;
};

export function TicketCard({ ticket, onPress }: TicketCardProps) {
  const iconName = listIcons[ticket.listIcon];
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <Ionicons name={iconName} size={23} color={colors.primaryDark} />
        </View>
        <View style={styles.mid}>
          <Text style={styles.name}>{ticket.name}</Text>
          <Text style={styles.date}>{ticket.dateLabel}</Text>
          <View style={styles.badgeWrap}>
            <StatusBadge status={ticket.status} />
          </View>
        </View>
        <Text style={styles.amount}>{formatCurrency(ticket.amount)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardGlass,
    borderRadius: radii.card,
    paddingVertical: spacing.lg + 2,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    ...shadows.card,
  },
  pressed: {
    opacity: 0.94,
    transform: [{ scale: 0.992 }],
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: radii.lg,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  mid: { flex: 1, minWidth: 0 },
  name: {
    ...typography.bodyMedium,
    fontSize: 16,
    color: colors.text,
    letterSpacing: -0.2,
  },
  date: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 5,
  },
  badgeWrap: { marginTop: spacing.md },
  amount: {
    ...typography.section,
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
    letterSpacing: -0.4,
    alignSelf: "flex-start",
  },
});
