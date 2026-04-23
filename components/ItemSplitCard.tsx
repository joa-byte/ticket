import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radii, shadows, spacing, typography } from "@/constants/theme";
import { formatCurrency } from "@/utils/formatCurrency";
import type { Person, TicketLineItem } from "@/types";
import { PersonAvatarSelectable } from "./PersonAvatarSelectable";

type ItemSplitCardProps = {
  item: TicketLineItem;
  people: Person[];
  selectedItem: boolean;
  selectedPersonIds: string[];
  onSelectItem: () => void;
  onTogglePerson: (personId: string) => void;
  splitSummary?: string | null;
};

export function ItemSplitCard({
  item,
  people,
  selectedItem,
  selectedPersonIds,
  onSelectItem,
  onTogglePerson,
  splitSummary,
}: ItemSplitCardProps) {
  return (
    <Pressable
      onPress={onSelectItem}
      style={({ pressed }) => [
        styles.card,
        selectedItem && styles.cardSelected,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.headerRow}>
        <Text style={styles.label}>{item.label}</Text>
        <Text style={styles.price}>{formatCurrency(item.price)}</Text>
      </View>
      {selectedItem ? (
        <Text style={styles.prompt}>{`¿Quién consumió '${item.label}'?`}</Text>
      ) : null}
      <View style={styles.avatars}>
        {people.map((p) => (
          <PersonAvatarSelectable
            key={p.id}
            person={p}
            selected={selectedPersonIds.includes(p.id)}
            onPress={() => {
              onSelectItem();
              onTogglePerson(p.id);
            }}
            size="sm"
          />
        ))}
      </View>
      {splitSummary ? (
        <View style={styles.summaryBox}>
          {splitSummary.split("\n").map((line, i) => (
            <Text
              key={`${item.id}-sum-${i}`}
              style={i === 0 ? styles.summaryLine1 : styles.summaryLine2}
            >
              {line}
            </Text>
          ))}
        </View>
      ) : null}
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
    ...shadows.soft,
  },
  cardSelected: {
    borderColor: "rgba(184, 166, 248, 0.38)",
    backgroundColor: colors.primaryFill,
    ...shadows.soft,
  },
  cardPressed: {
    opacity: 0.95,
    transform: [{ scale: 0.993 }],
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  label: {
    flex: 1,
    ...typography.bodyMedium,
    fontSize: 16,
    color: colors.text,
    marginRight: spacing.sm,
    letterSpacing: -0.15,
  },
  price: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
  },
  prompt: {
    ...typography.caption,
    color: colors.primaryDark,
    fontWeight: "600",
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  avatars: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.lg,
    justifyContent: "flex-start",
  },
  summaryBox: {
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radii.md,
    backgroundColor: "rgba(255,255,255,0.55)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.65)",
  },
  summaryLine1: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 21,
  },
  summaryLine2: {
    marginTop: 6,
    ...typography.bodyMedium,
    color: colors.primaryDark,
  },
});
