import { StyleSheet, Text, View } from "react-native";
import { colors, radii, shadows, spacing, typography } from "@/constants/theme";
import { formatCurrency } from "@/utils/formatCurrency";

type BalanceCardProps = {
  total: number;
  owedToYou: number;
  youOwe: number;
};

export function BalanceCard({ total, owedToYou, youOwe }: BalanceCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.labelTotal}>Saldo total</Text>
      <Text style={styles.total}>{formatCurrency(total)}</Text>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.muted}>Te deben</Text>
          <Text style={styles.positive}>{formatCurrency(owedToYou)}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.col}>
          <Text style={styles.muted}>Debés</Text>
          <Text style={styles.owe}>{formatCurrency(youOwe)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardGlass,
    borderRadius: radii.card,
    paddingVertical: spacing.xxl - 4,
    paddingHorizontal: spacing.xxl,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    ...shadows.card,
  },
  labelTotal: {
    ...typography.caption,
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: "600",
  },
  total: {
    marginTop: spacing.sm,
    ...typography.title,
    fontSize: 30,
    letterSpacing: -0.7,
    color: colors.success,
  },
  row: {
    flexDirection: "row",
    marginTop: spacing.xl,
    alignItems: "center",
  },
  col: { flex: 1 },
  divider: {
    width: 1,
    height: 44,
    backgroundColor: colors.borderSoft,
    marginHorizontal: spacing.lg,
  },
  muted: { ...typography.caption, color: colors.textMuted },
  positive: {
    marginTop: 6,
    ...typography.subtitle,
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: -0.3,
    color: colors.success,
  },
  owe: {
    marginTop: 6,
    ...typography.subtitle,
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: -0.3,
    color: colors.oweBlue,
  },
});
