import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { type ComponentProps } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radii, shadows, spacing, typography } from "@/constants/theme";
import type { Group, GroupIcon } from "@/types";

type IonName = NonNullable<ComponentProps<typeof Ionicons>["name"]>;

const iconNames: Record<GroupIcon, IonName> = {
  home: "home",
  people: "people",
  briefcase: "briefcase",
};

/** Bruma pastel hacia esquina superior (sin círculos duros) */
const MIST_BY_ID: Record<string, readonly [string, string, string]> = {
  casa: [
    "rgba(255, 205, 188, 0.26)",
    "rgba(255, 205, 188, 0.07)",
    "transparent",
  ],
  amigos: [
    "rgba(175, 225, 200, 0.22)",
    "rgba(175, 225, 200, 0.06)",
    "transparent",
  ],
  trabajo: [
    "rgba(200, 190, 245, 0.24)",
    "rgba(200, 190, 245, 0.06)",
    "transparent",
  ],
};

type GroupCardProps = {
  group: Group;
  onPress?: () => void;
};

export function GroupCard({ group, onPress }: GroupCardProps) {
  const mist = MIST_BY_ID[group.id] ?? MIST_BY_ID.casa;
  const mistLayout =
    group.id === "amigos"
      ? styles.mistAmigos
      : group.id === "trabajo"
        ? styles.mistTrabajo
        : styles.mistCasa;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.press, pressed && styles.pressed]}
    >
      <View style={styles.card}>
        <LinearGradient
          pointerEvents="none"
          colors={[...mist]}
          locations={[0, 0.38, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.mistBase, mistLayout]}
        />
        <View style={styles.foreground}>
          <View style={styles.iconBlob}>
            <Ionicons name={iconNames[group.icon]} size={21} color={colors.textSecondary} />
          </View>
          <Text style={styles.title}>{group.name}</Text>
          <Text style={styles.sub}>
            {group.memberCount}{" "}
            {group.memberCount === 1 ? "persona" : "personas"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  press: { marginRight: spacing.md },
  pressed: { opacity: 0.94, transform: [{ scale: 0.98 }] },
  card: {
    width: 138,
    minHeight: 132,
    borderRadius: radii.card,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    backgroundColor: colors.cardGlass,
    overflow: "hidden",
    ...shadows.card,
    justifyContent: "flex-end",
  },
  mistBase: {
    position: "absolute",
    width: 240,
    height: 210,
  },
  mistCasa: { top: -78, left: -92 },
  mistAmigos: { top: -64, left: -48 },
  mistTrabajo: { top: -52, left: -72 },
  foreground: {
    zIndex: 1,
    flex: 1,
    justifyContent: "flex-end",
    minHeight: 84,
  },
  iconBlob: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 48,
    height: 48,
    borderRadius: radii.md,
    backgroundColor: "rgba(255,255,255,0.5)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.65)",
  },
  title: {
    ...typography.bodyMedium,
    fontSize: 16,
    color: colors.text,
    letterSpacing: -0.2,
  },
  sub: {
    marginTop: 6,
    ...typography.caption,
    color: colors.textSecondary,
  },
});
