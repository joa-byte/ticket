import { StyleSheet, Text, View } from "react-native";
import { colors, radii, shadows, spacing, typography } from "@/constants/theme";
import { formatCurrency } from "@/utils/formatCurrency";

type PaymentSummaryCardProps = {
  payerLabel: string;
  totalPaid: number;
  totalConsumed: number;
  difference: number;
};

export function PaymentSummaryCard({
  payerLabel,
  totalPaid,
  totalConsumed,
  difference,
}: PaymentSummaryCardProps) {
  const diffColor = difference !== 0 ? colors.orangeDebt : colors.textMuted;
  return (
    <View style={styles.card}>
      <Row label={payerLabel} value={formatCurrency(totalPaid)} emphasized />
      <View style={styles.sep} />
      <Row label="Total consumido" value={formatCurrency(totalConsumed)} />
      <View style={styles.sep} />
      <Row
        label="Diferencia"
        value={formatCurrency(difference)}
        valueColor={diffColor}
        diffHighlight={difference !== 0}
      />
    </View>
  );
}

function Row({
  label,
  value,
  emphasized,
  valueColor,
  diffHighlight,
}: {
  label: string;
  value: string;
  emphasized?: boolean;
  valueColor?: string;
  diffHighlight?: boolean;
}) {
  return (
    <View style={styles.row}>
      <Text style={[styles.label, emphasized && styles.labelEm]}>{label}</Text>
      <Text
        style={[
          styles.value,
          valueColor ? { color: valueColor } : null,
          diffHighlight && styles.valueDiff,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardGlass,
    borderRadius: radii.card,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xxl - 4,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    ...shadows.card,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  label: { ...typography.body, color: colors.textMuted, flex: 1 },
  labelEm: { ...typography.bodyMedium, color: colors.text },
  value: {
    ...typography.bodyMedium,
    color: colors.text,
    letterSpacing: -0.2,
  },
  valueDiff: { fontWeight: "700" },
  sep: {
    height: 1,
    backgroundColor: colors.borderSoft,
    marginVertical: spacing.sm + 2,
  },
});
