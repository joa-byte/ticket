import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { colors, radii, shadows, spacing, typography } from "@/constants/theme";
import { formatCurrency } from "@/utils/formatCurrency";
import type { Person } from "@/types";

type DebtRowProps = {
  from: Person;
  to: Person;
  amount: number;
};

function MiniAvatar({ person }: { person: Person }) {
  return (
    <View
      style={[
        styles.mini,
        { backgroundColor: person.avatarColor },
      ]}
    >
      <Text style={styles.miniText}>{person.name[0]}</Text>
    </View>
  );
}

export function DebtRow({ from, to, amount }: DebtRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.cluster}>
        <MiniAvatar person={from} />
        <Ionicons
          name="arrow-forward"
          size={13}
          color={colors.textFaint}
          style={styles.arrow}
        />
        <MiniAvatar person={to} />
      </View>
      <View style={styles.textCol}>
        <Text style={styles.desc} numberOfLines={2}>
          {from.name} le debe a {to.name}
        </Text>
      </View>
      <Text style={styles.amount}>{formatCurrency(amount)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.cardGlass,
    borderRadius: radii.card,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    gap: spacing.md,
    ...shadows.soft,
  },
  cluster: { flexDirection: "row", alignItems: "center" },
  mini: {
    width: 38,
    height: 38,
    borderRadius: radii.full,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.85)",
  },
  miniText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  arrow: { marginHorizontal: 4 },
  textCol: { flex: 1, minWidth: 0 },
  desc: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 21,
  },
  amount: {
    ...typography.bodyMedium,
    fontSize: 16,
    fontWeight: "700",
    color: colors.orangeDebt,
    letterSpacing: -0.2,
  },
});
