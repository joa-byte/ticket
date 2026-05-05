import { AppHeader, PrimaryButton, Stepper } from "@/components";
import { PersonAvatarSelectable } from "@/components/PersonAvatarSelectable";
import { colors, commonStyles, radii, shadows, spacing, typography } from "@/constants/theme";
import {
    paymentSummaryMock,
    ticketFlowMeta,
    ticketParticipantsMock,
} from "@/data";
import { ticketFlowSteps } from "@/data/stepper";
import { useTicketRouteId } from "@/hooks/useTicketRouteId";
import { useTicketSplitStore } from "@/store/ticketSplitStore";
import { formatCurrency } from "@/utils/formatCurrency";
import { type Href, useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TicketPayerScreen() {
  const id = useTicketRouteId();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const payerId = useTicketSplitStore((s) => s.payerId);
  const setPayerId = useTicketSplitStore((s) => s.setPayerId);

  const payer = ticketParticipantsMock.find((p) => p.id === payerId);

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
          <Stepper steps={ticketFlowSteps} activeIndex={2} />
        </View>

        <Text style={styles.blockTitle}>¿Quién pagó?</Text>
        <Text style={styles.blockSub}>
          Seleccioná quién salió con la tarjeta o efectivo.
        </Text>

        <View style={styles.payerRow}>
          {ticketParticipantsMock.map((p) => (
            <PersonAvatarSelectable
              key={p.id}
              person={p}
              selected={payerId === p.id}
              onPress={() => setPayerId(p.id)}
            />
          ))}
        </View>

        <View style={styles.payBanner}>
          <Text style={styles.payLabel}>
            {payer?.name ?? "—"} pagó {formatCurrency(paymentSummaryMock.totalPaid)}
          </Text>
        </View>

        <PrimaryButton
          label="Ver gastos"
          onPress={() => router.push(`/ticket/${id}/expenses` as Href)}
          style={{ marginTop: spacing.xl }}
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
  blockTitle: { ...typography.subtitle, color: colors.text, marginBottom: spacing.xs },
  blockSub: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  payerRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: spacing.lg + 2,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.cardGlass,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    ...shadows.soft,
  },
  payBanner: {
    marginTop: spacing.xl,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.card,
    backgroundColor: colors.primaryFill,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    ...shadows.soft,
  },
  payLabel: {
    ...typography.bodyMedium,
    fontSize: 16,
    color: colors.primaryDark,
    textAlign: "center",
    letterSpacing: -0.15,
    lineHeight: 24,
  },
});
