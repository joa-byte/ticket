import { LinearGradient } from "expo-linear-gradient";
import { type ViewStyle, Pressable, StyleSheet, Text } from "react-native";
import { colors, gradients, radii, shadows, spacing, typography } from "@/constants/theme";

type Variant = "primary" | "success" | "ghost";

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  style?: ViewStyle;
};

export function PrimaryButton({
  label,
  onPress,
  variant = "primary",
  disabled,
  style,
}: PrimaryButtonProps) {
  if (variant === "ghost") {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => [
          styles.ghostOuter,
          disabled && styles.disabled,
          pressed && !disabled && styles.ghostPressed,
          style,
        ]}
      >
        <Text style={[styles.ghostText, disabled && styles.textDisabled]}>{label}</Text>
      </Pressable>
    );
  }

  const grad = variant === "success" ? gradients.success : gradients.primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.gradOuter,
        shadows.cta,
        disabled && styles.disabled,
        pressed && !disabled && styles.gradPressed,
        style,
      ]}
    >
      <LinearGradient
        colors={[...grad]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradInner}
      >
        <Text style={styles.gradText}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  gradOuter: {
    borderRadius: radii.full,
    overflow: "hidden",
    minHeight: 56,
    justifyContent: "center",
  },
  gradInner: {
    paddingVertical: 17,
    paddingHorizontal: spacing.xxl,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
  },
  gradText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    letterSpacing: 0.15,
  },
  gradPressed: {
    opacity: 0.94,
    transform: [{ scale: 0.985 }],
  },
  ghostOuter: {
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.xxl,
    borderRadius: radii.full,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 52,
    backgroundColor: colors.cardGlass,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    ...shadows.soft,
  },
  ghostText: {
    ...typography.bodyMedium,
    color: colors.text,
  },
  ghostPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.988 }],
    backgroundColor: "rgba(255,255,255,0.78)",
  },
  disabled: { opacity: 0.42 },
  textDisabled: { color: colors.textMuted },
});
