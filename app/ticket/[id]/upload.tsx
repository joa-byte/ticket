import { Ionicons } from "@expo/vector-icons";
import { type Href, useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppHeader, PrimaryButton, Stepper } from "@/components";
import { colors, commonStyles, radii, shadows, spacing, typography } from "@/constants/theme";
import { ticketFlowMeta, ticketFlowTip } from "@/data";
import { ticketFlowSteps } from "@/data/stepper";
import { useTicketRouteId } from "@/hooks/useTicketRouteId";

export default function TicketUploadScreen() {
  const id = useTicketRouteId();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={commonStyles.screen}>
      <AppHeader
        title={ticketFlowMeta.title}
        onBackPress={() => router.back()}
        rightAction="edit"
        onRightPress={() => {}}
      />
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
          <Stepper steps={ticketFlowSteps} activeIndex={0} />
        </View>

        <View style={styles.drop}>
          <Ionicons name="image-outline" size={40} color={colors.textMuted} />
          <Text style={styles.dropTitle}>
            Subí la foto del ticket o arrastrala acá
          </Text>
        </View>

        <View style={styles.tip}>
          <Ionicons name="bulb-outline" size={18} color={colors.primaryDark} />
          <Text style={styles.tipText}>{ticketFlowTip}</Text>
        </View>

        <PrimaryButton
          label="Seleccionar foto"
          onPress={() => router.push(`/ticket/${id}/split` as Href)}
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
  stepper: { marginBottom: spacing.xl },
  drop: {
    minHeight: 232,
    borderRadius: radii.card,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "rgba(184, 166, 248, 0.35)",
    backgroundColor: colors.cardGlass,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xxl,
    marginBottom: spacing.lg,
    ...shadows.soft,
  },
  dropTitle: {
    marginTop: spacing.md,
    ...typography.bodyMedium,
    color: colors.textSecondary,
    textAlign: "center",
    paddingHorizontal: spacing.md,
  },
  tip: {
    flexDirection: "row",
    gap: spacing.sm,
    alignItems: "flex-start",
    marginBottom: spacing.xl,
    padding: spacing.md,
    backgroundColor: colors.primarySoft,
    borderRadius: radii.xxl,
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
  tipText: {
    flex: 1,
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
