import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { type Href, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MOCK_TICKET_FLOW_ID } from "@/constants/routes";
import { colors, gradients, radii, shadows, spacing, typography } from "@/constants/theme";
import { useTicketSplitStore } from "@/store/ticketSplitStore";

export function MainTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const resetSplit = useTicketSplitStore((s) => s.reset);

  const active = state.routes[state.index]?.name;

  const goHome = () => {
    navigation.navigate("index" as never);
  };
  const goProfile = () => {
    navigation.navigate("profile" as never);
  };

  return (
    <View
      style={[
        styles.floatWrap,
        {
          paddingBottom: Math.max(insets.bottom, 12),
        },
      ]}
    >
      <View style={styles.bar}>
        <Pressable
          onPress={goHome}
          style={({ pressed }) => [styles.half, pressed && styles.tabPressed]}
        >
          <Ionicons
            name={active === "index" ? "home" : "home-outline"}
            size={25}
            color={active === "index" ? colors.primaryDark : colors.textFaint}
          />
          <Text
            style={[
              styles.label,
              { color: active === "index" ? colors.primaryDark : colors.textMuted },
            ]}
          >
            Inicio
          </Text>
        </Pressable>
        <View style={styles.gap} />
        <Pressable
          onPress={goProfile}
          style={({ pressed }) => [styles.half, pressed && styles.tabPressed]}
        >
          <Ionicons
            name={active === "profile" ? "person" : "person-outline"}
            size={25}
            color={active === "profile" ? colors.primaryDark : colors.textFaint}
          />
          <Text
            style={[
              styles.label,
              { color: active === "profile" ? colors.primaryDark : colors.textMuted },
            ]}
          >
            Perfil
          </Text>
        </Pressable>
      </View>

      <View style={styles.fabWrap} pointerEvents="box-none">
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            resetSplit();
            router.push(`/ticket/${MOCK_TICKET_FLOW_ID}/upload` as Href);
          }}
          style={({ pressed }) => [styles.fabOuter, pressed && styles.fabPressed]}
        >
          <LinearGradient
            colors={[...gradients.primaryFab]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.fabInner}
          >
            <Ionicons name="add" size={30} color="#fff" />
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  floatWrap: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  bar: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.lg + 2,
    paddingBottom: spacing.md,
    backgroundColor: colors.cardGlass,
    borderRadius: radii.xxxl,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    ...shadows.card,
  },
  half: {
    flex: 1,
    alignItems: "center",
    gap: 4,
    paddingVertical: spacing.xxs,
  },
  tabPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.97 }],
  },
  gap: { width: 76 },
  label: {
    ...typography.small,
    fontSize: 11,
    letterSpacing: 0.2,
    fontWeight: "600",
  },
  fabWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    top: -34,
    alignItems: "center",
  },
  fabOuter: {
    borderRadius: radii.full,
    overflow: "hidden",
    ...shadows.fab,
  },
  fabPressed: {
    opacity: 0.93,
    transform: [{ scale: 0.95 }],
  },
  fabInner: {
    width: 60,
    height: 60,
    borderRadius: radii.full,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
    borderColor: colors.background,
  },
});
