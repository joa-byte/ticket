import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radii, shadows, spacing, typography } from "@/constants/theme";

type AppHeaderProps = {
  title: string;
  onBackPress?: () => void;
  rightAction?: "settings" | "edit" | "none";
  onRightPress?: () => void;
};

export function AppHeader({
  title,
  onBackPress,
  rightAction = "none",
  onRightPress,
}: AppHeaderProps) {
  const rightIcon =
    rightAction === "settings"
      ? ("settings-outline" as const)
      : rightAction === "edit"
        ? ("create-outline" as const)
        : null;

  return (
    <View style={styles.row}>
      <View style={styles.side}>
        {onBackPress ? (
          <Pressable
            onPress={onBackPress}
            hitSlop={12}
            style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
          >
            <Ionicons name="chevron-back" size={24} color={colors.textSecondary} />
          </Pressable>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={[styles.side, styles.sideRight]}>
        {rightIcon && onRightPress ? (
          <Pressable
            onPress={onRightPress}
            hitSlop={12}
            style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
          >
            <Ionicons name={rightIcon} size={21} color={colors.textSecondary} />
          </Pressable>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    minHeight: 52,
  },
  side: { width: 46, alignItems: "flex-start" },
  sideRight: { alignItems: "flex-end" },
  title: {
    flex: 1,
    textAlign: "center",
    ...typography.subtitle,
    color: colors.text,
    letterSpacing: -0.35,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.cardGlass,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    ...shadows.soft,
  },
  placeholder: { width: 44, height: 44 },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.96 }],
    backgroundColor: colors.surfaceMuted,
  },
});
