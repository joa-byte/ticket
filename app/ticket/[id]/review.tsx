import { AppHeader, PrimaryButton, Stepper } from "@/components";
import { colors, commonStyles, radii, shadows, spacing, typography } from "@/constants/theme";
import {
    ticketFlowMeta,
    ticketFlowTip,
    ticketLineItemsMock,
    ticketParticipantsMock,
} from "@/data";
import { ticketFlowSteps } from "@/data/stepper";
import { useTicketRouteId } from "@/hooks/useTicketRouteId";
import { useTicketSplitStore } from "@/store/ticketSplitStore";
import type { TicketReviewItem } from "@/types";
import { formatCurrency } from "@/utils/formatCurrency";
import {
    calculateAssignedQuantity,
    calculateItemTotal,
    calculatePersonSummary,
    calculateRemainingQuantity,
    hasReviewErrors,
    normalizeTicketReviewItems,
    validateReviewItem,
} from "@/utils/ticketReview";
import { type Href, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const parseNumeric = (value: string) => {
  const digits = value.replace(/[^0-9]/g, "");
  return digits.length === 0 ? 0 : Number(digits);
};

export default function TicketReviewScreen() {
  const id = useTicketRouteId();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const storeReviewItems = useTicketSplitStore((s) => s.reviewItems);
  const setReviewItems = useTicketSplitStore((s) => s.setReviewItems);
  const setAssignments = useTicketSplitStore((s) => s.setAssignments);

  const [items, setItems] = useState<TicketReviewItem[]>(
    storeReviewItems.length > 0
      ? storeReviewItems
      : normalizeTicketReviewItems(ticketLineItemsMock),
  );

  const personSummary = useMemo(
    () => calculatePersonSummary(items, ticketParticipantsMock),
    [items],
  );

  const errorsPerItem = items.map((item) => validateReviewItem(item));
  const hasErrors = hasReviewErrors(items);

  const updateItemField = (
    itemId: string,
    field: "label" | "quantity" | "unitPrice" | "total" | "notes",
    value: string,
  ) => {
    setItems((current) =>
      current.map((item) => {
        if (item.id !== itemId) return item;
        const next = { ...item };
        if (field === "quantity") {
          const quantity = Math.max(0, parseNumeric(value));
          next.quantity = quantity;
          next.total = calculateItemTotal(quantity, next.unitPrice);
        }
        if (field === "unitPrice") {
          const unitPrice = Math.max(0, parseNumeric(value));
          next.unitPrice = unitPrice;
          next.total = calculateItemTotal(next.quantity, unitPrice);
        }
        if (field === "total") {
          next.total = Math.max(0, parseNumeric(value));
        }
        if (field === "label") {
          next.label = value;
        }
        if (field === "notes") {
          next.notes = value;
        }
        return next;
      }),
    );
  };

  const updatePersonQuantity = (
    itemId: string,
    personId: string,
    nextQuantity: number,
  ) => {
    setItems((current) =>
      current.map((item) => {
        if (item.id !== itemId) return item;
        const clamped = Math.max(0, nextQuantity);
        const assignedOthers =
          calculateAssignedQuantity(item) - (item.assignedQuantities[personId] ?? 0);
        const maxForPerson = Math.max(0, item.quantity - assignedOthers);
        const finalQuantity = Math.min(clamped, maxForPerson);
        return {
          ...item,
          assignedQuantities: {
            ...item.assignedQuantities,
            [personId]: finalQuantity,
          },
        };
      }),
    );
  };

  const handleConfirm = () => {
    setReviewItems(items);
    setAssignments(
      Object.fromEntries(
        items
          .map((item) => [
            item.id,
            Object.entries(item.assignedQuantities)
              .filter(([, quantity]) => quantity > 0)
              .map(([personId]) => personId),
          ])
          .filter(([, personIds]) => personIds.length > 0),
      ),
    );
    router.push(`/ticket/${id}/split` as Href);
  };

  const handleCancel = () => {
    setReviewItems([]);
    setAssignments({});
    router.replace(`/ticket/${id}/upload` as Href);
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
          <Stepper steps={ticketFlowSteps} activeIndex={1} />
        </View>
        <Text style={styles.title}>Revisión de ticket generado por IA</Text>
        <Text style={styles.description}>
          Verificá los ítems detectados y asigná consumos por persona antes de confirmar.
        </Text>
        <View style={styles.tipCard}>
          <Text style={styles.tipText}>{ticketFlowTip}</Text>
        </View>

        {items.map((item, index) => {
          const itemAssigned = calculateAssignedQuantity(item);
          const itemRemaining = calculateRemainingQuantity(item);
          return (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemLabel}>Ítem {index + 1}</Text>
                <Text style={styles.itemTotal}>{formatCurrency(item.total)}</Text>
              </View>

              <View style={styles.inputGrid}>
                <View style={styles.fieldBlock}>
                  <Text style={styles.fieldLabel}>Nombre</Text>
                  <TextInput
                    style={styles.input}
                    value={item.label}
                    placeholder="Descripción"
                    placeholderTextColor={colors.textMuted}
                    onChangeText={(value) => updateItemField(item.id, "label", value)}
                  />
                </View>
                <View style={styles.fieldBlock}>
                  <Text style={styles.fieldLabel}>Cantidad</Text>
                  <TextInput
                    style={styles.input}
                    value={String(item.quantity)}
                    keyboardType="numeric"
                    onChangeText={(value) =>
                      updateItemField(item.id, "quantity", value)
                    }
                  />
                </View>
              </View>

              <View style={styles.inputGrid}>
                <View style={styles.fieldBlock}>
                  <Text style={styles.fieldLabel}>Precio unitario</Text>
                  <TextInput
                    style={styles.input}
                    value={String(item.unitPrice)}
                    keyboardType="numeric"
                    onChangeText={(value) =>
                      updateItemField(item.id, "unitPrice", value)
                    }
                  />
                </View>
                <View style={styles.fieldBlock}>
                  <Text style={styles.fieldLabel}>Total</Text>
                  <TextInput
                    style={styles.input}
                    value={String(item.total)}
                    keyboardType="numeric"
                    onChangeText={(value) => updateItemField(item.id, "total", value)}
                  />
                </View>
              </View>

              <TextInput
                style={[styles.input, styles.notesInput]}
                value={item.notes ?? ""}
                placeholder="Observaciones o aclaraciones"
                placeholderTextColor={colors.textMuted}
                onChangeText={(value) => updateItemField(item.id, "notes", value)}
              />

              <View style={styles.assignHeader}>
                <View>
                  <Text style={styles.assignTitle}>Asignar cantidades</Text>
                  <Text style={styles.assignSubtitle}>
                    {itemAssigned} asignadas · {itemRemaining} sin asignar
                  </Text>
                </View>
                <Text style={styles.unitPriceText}>{formatCurrency(item.unitPrice)} c/u</Text>
              </View>

              {ticketParticipantsMock.map((person) => {
                const quantity = item.assignedQuantities[person.id] ?? 0;
                return (
                  <View key={`${item.id}-${person.id}`} style={styles.personRow}>
                    <View>
                      <Text style={styles.personName}>{person.name}</Text>
                      <Text style={styles.personAmount}>
                        {formatCurrency(calculateItemTotal(quantity, item.unitPrice))}
                      </Text>
                    </View>
                    <View style={styles.quantityRow}>
                      <Pressable
                        style={styles.qtyButton}
                        onPress={() =>
                          updatePersonQuantity(item.id, person.id, Math.max(0, quantity - 1))
                        }
                      >
                        <Text style={styles.qtyButtonText}>-</Text>
                      </Pressable>
                      <TextInput
                        style={styles.qtyInput}
                        keyboardType="numeric"
                        value={String(quantity)}
                        onChangeText={(value) => {
                          const next = Math.max(0, parseNumeric(value));
                          updatePersonQuantity(item.id, person.id, next);
                        }}
                      />
                      <Pressable
                        style={styles.qtyButton}
                        onPress={() =>
                          updatePersonQuantity(item.id, person.id, quantity + 1)
                        }
                      >
                        <Text style={styles.qtyButtonText}>+</Text>
                      </Pressable>
                    </View>
                  </View>
                );
              })}

              {errorsPerItem[index].length > 0 ? (
                <View style={styles.errorBox}>
                  {errorsPerItem[index].map((error) => (
                    <Text key={`${item.id}-${error}`} style={styles.errorText}>
                      {error}
                    </Text>
                  ))}
                </View>
              ) : null}
            </View>
          );
        })}

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Resumen por persona</Text>
          {personSummary.map((summary) => (
            <View key={summary.personId} style={styles.summaryRow}>
              <Text style={styles.summaryName}>{summary.name}</Text>
              <Text style={styles.summaryAmount}>
                {formatCurrency(summary.amount)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.buttonRow}>
          <PrimaryButton
            label="Cancelar"
            variant="ghost"
            onPress={handleCancel}
            style={{ flex: 1, marginRight: spacing.sm }}
          />
          <PrimaryButton
            label="Confirmar ticket"
            onPress={handleConfirm}
            disabled={hasErrors}
            style={{ flex: 1, marginLeft: spacing.sm }}
          />
        </View>
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
  title: {
    ...typography.subtitle,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    lineHeight: 20,
  },
  tipCard: {
    padding: spacing.md,
    borderRadius: radii.card,
    backgroundColor: colors.primaryFill,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    marginBottom: spacing.lg,
  },
  tipText: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  itemCard: {
    backgroundColor: colors.cardGlass,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.soft,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  itemLabel: {
    ...typography.bodyMedium,
    fontWeight: "700",
    color: colors.text,
  },
  itemTotal: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
  },
  inputGrid: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  fieldBlock: {
    flex: 1,
  },
  fieldLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  input: {
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    backgroundColor: colors.surfaceMuted,
    padding: spacing.sm,
    color: colors.text,
    ...typography.bodyMedium,
  },
  notesInput: {
    minHeight: 56,
    marginBottom: spacing.md,
  },
  assignHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  assignTitle: {
    ...typography.bodyMedium,
    fontWeight: "700",
    color: colors.text,
  },
  assignSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  unitPriceText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  personRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderColor: colors.cardBorder,
  },
  personName: {
    ...typography.bodyMedium,
    color: colors.text,
  },
  personAmount: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  qtyButton: {
    width: 34,
    height: 34,
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    backgroundColor: colors.surfaceMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyButtonText: {
    ...typography.bodyMedium,
    color: colors.text,
    fontWeight: "700",
  },
  qtyInput: {
    width: 54,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    backgroundColor: colors.surfaceMuted,
    padding: spacing.sm,
    textAlign: "center",
    color: colors.text,
    ...typography.bodyMedium,
  },
  errorBox: {
    padding: spacing.sm,
    marginTop: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.dangerSoft,
    borderWidth: 1,
    borderColor: colors.danger,
  },
  errorText: {
    ...typography.caption,
    color: colors.danger,
    lineHeight: 18,
  },
  summaryCard: {
    backgroundColor: colors.cardGlass,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.soft,
  },
  summaryTitle: {
    ...typography.bodyMedium,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  summaryName: {
    ...typography.bodyMedium,
    color: colors.text,
  },
  summaryAmount: {
    ...typography.bodyMedium,
    color: colors.primaryDark,
  },
  buttonRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
});
