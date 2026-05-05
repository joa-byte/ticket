import {
  AppHeader,
  DebtRow,
  PaymentSummaryCard,
  PrimaryButton,
  Stepper,
} from "@/components";
import { colors, commonStyles, radii, shadows, spacing, typography } from "@/constants/theme";
import {
  debtsMock,
  paymentSummaryMock,
  ticketFlowMeta,
  ticketParticipantsMock,
} from "@/data";
import { ticketFlowSteps } from "@/data/stepper";
import { useTicketSplitStore } from "@/store/ticketSplitStore";
import { formatCurrency } from "@/utils/formatCurrency";
import { calculatePersonSummary } from "@/utils/ticketReview";
import { type Href, useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TicketExpensesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const reviewItems = useTicketSplitStore((s) => s.reviewItems);

  const personById = Object.fromEntries(
    ticketParticipantsMock.map((p) => [p.id, p]),
  );

  const totalConsumed = reviewItems.length
    ? reviewItems.reduce((sum, item) => sum + item.total, 0)
    : paymentSummaryMock.totalConsumed;

  const difference = paymentSummaryMock.totalPaid - totalConsumed;

  const resolve = (pid: string) =>
    personById[pid] ?? {
      id: pid,
      name: "?",
      avatarColor: colors.textMuted,
    };

  return (
    <View style={commonStyles.screen}>
      <AppHeader title={ticketFlowMeta.title} onBackPress={() => router.back()} />
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.meta}>
          {ticketFlowMeta.dateLabel} · {ticketFlowMeta.peopleCount} personas
        </Text>
        <View style={styles.stepper}>
          <Stepper steps={ticketFlowSteps} activeIndex={3} />
        </View>

        <Text style={styles.blockTitle}>Resumen de pagos</Text>
        <PaymentSummaryCard
          payerLabel={`${personById[paymentSummaryMock.payerPersonId]?.name ?? "Joa"} pagó`}
          totalPaid={paymentSummaryMock.totalPaid}
          totalConsumed={paymentSummaryMock.totalConsumed}
          difference={paymentSummaryMock.difference}
        />

        {reviewItems.length > 0 ? (
          <View style={styles.personSummary}>
            <Text style={styles.sectionTitle}>Resumen por persona</Text>
            {calculatePersonSummary(reviewItems, ticketParticipantsMock).map((summary) => (
              <View key={summary.personId} style={styles.personSummaryRow}>
                <Text style={styles.personSummaryName}>{summary.name}</Text>
                <Text style={styles.personSummaryAmount}>{formatCurrency(summary.amount)}</Text>
              </View>
            ))}
          </View>
        ) : null}

        <Text style={styles.debtsTitle}>¿Quién le debe a quién?</Text>
        <View style={styles.debts}>
          {debtsMock.map((d) => (
            <DebtRow
              key={d.id}
              from={resolve(d.fromPersonId)}
              to={resolve(d.toPersonId)}
              amount={d.amount}
            />
          ))}
        </View>

        <PrimaryButton
          label="Cerrar ticket"
          variant="success"
          onPress={() => router.replace("/(tabs)" as Href)}
          style={{ marginTop: spacing.lg }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  meta: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  stepper: { marginBottom: spacing.lg },
  blockTitle: {
    ...typography.subtitle,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  debtsTitle: {
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
    ...typography.subtitle,
    color: colors.text,
  },
  debts: { marginBottom: spacing.md },
  personSummary: {
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: radii.card,
    backgroundColor: colors.cardGlass,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    ...shadows.soft,
  },
  sectionTitle: {
    ...typography.bodyMedium,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  personSummaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  personSummaryName: {
    ...typography.bodyMedium,
    color: colors.text,
  },
  personSummaryAmount: {
    ...typography.bodyMedium,
    color: colors.primaryDark,
  },
});
