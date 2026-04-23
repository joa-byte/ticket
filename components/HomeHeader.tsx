import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radii, shadows, spacing, typography } from "@/constants/theme";

type HomeHeaderProps = {
  greeting: string;
  onGroupsPress?: () => void;
  onNotificationsPress?: () => void;
};

export function HomeHeader({
  greeting,
  onGroupsPress,
  onNotificationsPress,
}: HomeHeaderProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.greeting}>{greeting}</Text>
      <View style={styles.actions}>
        <Pressable
          onPress={onGroupsPress}
          hitSlop={10}
          style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
        >
          <Ionicons name="people-outline" size={22} color={colors.textSecondary} />
        </Pressable>
        <Pressable
          onPress={onNotificationsPress}
          hitSlop={10}
          style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
        >
          <Ionicons name="notifications-outline" size={22} color={colors.textSecondary} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  greeting: {
    flex: 1,
    ...typography.hero,
    color: colors.text,
  },
  actions: { flexDirection: "row", gap: spacing.sm },
  iconBtn: {
    width: 46,
    height: 46,
    borderRadius: radii.md,
    backgroundColor: colors.cardGlass,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.soft,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.95 }],
    backgroundColor: colors.surfaceMuted,
  },
});
