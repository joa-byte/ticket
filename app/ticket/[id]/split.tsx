import { AppHeader, ItemSplitCard, PrimaryButton, Stepper } from "@/components";
import { colors, commonStyles, spacing, typography } from "@/constants/theme";
import { ticketFlowMeta, ticketLineItemsMock, ticketParticipantsMock } from "@/data";
import { ticketFlowSteps } from "@/data/stepper";
import { useTicketRouteId } from "@/hooks/useTicketRouteId";
import { useTicketSplitStore } from "@/store/ticketSplitStore";
import type { TicketReviewItem } from "@/types";
import { formatCurrency } from "@/utils/formatCurrency";
import { type Href, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function splitSummary(item: TicketReviewItem | typeof ticketLineItemsMock[number], count: number): string | null {
  if (count < 2) return null;
  if ("quantity" in item && item.quantity > 1) {
    return `Asignado ${count} / ${item.quantity} unidades`;
  }
  const price = "price" in item ? item.price : item.total;
  const each = Math.round(price / count);
  return `Se dividirá ${formatCurrency(price)} entre ${count} personas\n→ ${formatCurrency(each)} c/u`;
}

export default function TicketSplitScreen() {
  const id = useTicketRouteId();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const selectedItemId = useTicketSplitStore((s) => s.selectedItemId);
  const setSelectedItemId = useTicketSplitStore((s) => s.setSelectedItemId);
  const assignments = useTicketSplitStore((s) => s.assignments);
  const reviewItems = useTicketSplitStore((s) => s.reviewItems);
  const togglePersonOnItem = useTicketSplitStore((s) => s.togglePersonOnItem);

  const renderedItems =
    reviewItems.length > 0
      ? reviewItems.map((reviewItem) => ({
          id: reviewItem.id,
          label: reviewItem.label,
          price: reviewItem.total,
        }))
      : ticketLineItemsMock;

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

        <Text style={styles.section}>Ítems detectados</Text>
        {renderedItems.map((item) => {
          const reviewItem = reviewItems.find((review) => review.id === item.id);
          const ids = reviewItem
            ? Object.entries(reviewItem.assignedQuantities)
                .filter(([, quantity]) => quantity > 0)
                .map(([personId]) => personId)
            : assignments[item.id] ?? [];
          const summary = reviewItem
            ? `Asignadas ${
                Object.values(reviewItem.assignedQuantities).reduce(
                  (sum, quantity) => sum + quantity,
                  0,
                )
              } / ${reviewItem.quantity} unidades`
            : splitSummary(item.price, ids.length);
          return (
            <ItemSplitCard
              key={item.id}
              item={item}
              people={ticketParticipantsMock}
              selectedItem={selectedItemId === item.id}
              selectedPersonIds={ids}
              onSelectItem={() => setSelectedItemId(item.id)}
              onTogglePerson={(pid) => togglePersonOnItem(item.id, pid)}
              splitSummary={summary}
            />
          );
        })}

        <Pressable
          onPress={() => setSelectedItemId(null)}
          style={({ pressed }) => [styles.clear, pressed && styles.clearPressed]}
        >
          <Text style={styles.clearText}>Deseleccionar ítem</Text>
        </Pressable>

        <PrimaryButton
          label="Guardar y seguir"
          onPress={() => router.push(`/ticket/${id}/payer` as Href)}
          style={{ marginTop: spacing.md }}
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
  section: {
    ...typography.subtitle,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  clear: { alignSelf: "center", paddingVertical: spacing.sm, paddingHorizontal: spacing.md },
  clearPressed: { opacity: 0.65 },
  clearText: { ...typography.caption, color: colors.primaryDark, fontWeight: "600" },
});
