import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radii, shadows, spacing, typography } from "@/constants/theme";
import type { Person } from "@/types";

type PersonAvatarSelectableProps = {
  person: Person;
  selected: boolean;
  onPress: () => void;
  size?: "sm" | "md";
};

export function PersonAvatarSelectable({
  person,
  selected,
  onPress,
  size = "md",
}: PersonAvatarSelectableProps) {
  const dim = size === "md" ? 52 : 46;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.wrap,
        selected && styles.wrapSelected,
        pressed && styles.wrapPressed,
      ]}
    >
      <View style={styles.avatarSlot}>
        <View
          style={[
            styles.avatar,
            {
              width: dim,
              height: dim,
              borderRadius: dim / 2,
              backgroundColor: person.avatarColor,
            },
            selected && styles.avatarSelected,
          ]}
        >
          <Text style={[styles.initials, size === "sm" && styles.initialsSm]}>
            {person.name.slice(0, 2).toUpperCase()}
          </Text>
        </View>
        {selected ? (
          <View style={styles.check}>
            <Ionicons name="checkmark-circle" size={22} color={colors.successMid} />
          </View>
        ) : null}
      </View>
      <Text style={[styles.name, selected && styles.nameSelected]} numberOfLines={1}>
        {person.name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    maxWidth: 84,
    paddingVertical: spacing.xs,
    paddingHorizontal: 6,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: "transparent",
  },
  wrapSelected: {
    backgroundColor: colors.primaryFill,
    borderColor: "rgba(184, 166, 248, 0.28)",
  },
  wrapPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.97 }],
  },
  avatarSlot: { position: "relative" },
  avatar: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2.5,
    borderColor: "transparent",
  },
  avatarSelected: {
    borderColor: colors.successRing,
    ...shadows.soft,
  },
  check: {
    position: "absolute",
    right: -6,
    bottom: -4,
    backgroundColor: colors.surface,
    borderRadius: radii.full,
    ...shadows.soft,
  },
  initials: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.2,
  },
  initialsSm: { fontSize: 14 },
  name: {
    marginTop: 8,
    ...typography.caption,
    fontWeight: "500",
    color: colors.textMuted,
    maxWidth: 78,
    textAlign: "center",
  },
  nameSelected: {
    color: colors.primaryDark,
    fontWeight: "600",
  },
});
