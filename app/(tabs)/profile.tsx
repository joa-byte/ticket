import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { type Href, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppHeader, BalanceCard, SectionTitle } from "@/components";
import { colors, commonStyles, radii, shadows, spacing, typography } from "@/constants/theme";
import { balanceMock, currentUser, recentActivity } from "@/data";
import { formatCurrency } from "@/utils/formatCurrency";

/** Halos muy suaves (gradiente → transparente), sin círculos recortados */
const WASH_ORANGE = ["rgba(255, 205, 185, 0.2)", "rgba(255, 205, 185, 0.06)", "transparent"] as const;
const WASH_VIOLET = ["rgba(210, 198, 250, 0.18)", "rgba(210, 198, 250, 0.05)", "transparent"] as const;
const WASH_GREEN = ["rgba(175, 230, 200, 0.16)", "rgba(175, 230, 200, 0.04)", "transparent"] as const;
const WASH_BLUE = ["rgba(175, 200, 240, 0.16)", "rgba(175, 200, 240, 0.04)", "transparent"] as const;

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={commonStyles.screen}>
      <View style={styles.bgWash} pointerEvents="none">
        <LinearGradient
          colors={[...WASH_ORANGE]}
          locations={[0, 0.32, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.9, y: 0.85 }}
          style={styles.wash1}
        />
        <LinearGradient
          colors={[...WASH_VIOLET]}
          locations={[0, 0.28, 1]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0.15, y: 0.75 }}
          style={styles.wash2}
        />
        <LinearGradient
          colors={[...WASH_GREEN]}
          locations={[0, 0.35, 1]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 0.85, y: 0.2 }}
          style={styles.wash3}
        />
        <LinearGradient
          colors={[...WASH_BLUE]}
          locations={[0, 0.3, 1]}
          start={{ x: 0.85, y: 1 }}
          end={{ x: 0.1, y: 0.35 }}
          style={styles.wash4}
        />
      </View>
      <AppHeader
        title="Perfil"
        onBackPress={() => router.push("/(tabs)" as Href)}
        rightAction="settings"
        onRightPress={() => {}}
      />
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: 120 + insets.bottom, paddingTop: spacing.sm },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View
            style={[styles.avatar, { backgroundColor: currentUser.avatarColor }]}
            accessibilityLabel="Foto de perfil"
          >
            <Text style={styles.avatarText}>
              {currentUser.name.slice(0, 2).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.name}>{currentUser.name}</Text>
          <Text style={styles.username}>{currentUser.username}</Text>
        </View>

        <View style={styles.balanceWrap}>
          <BalanceCard
            total={balanceMock.total}
            owedToYou={balanceMock.owedToYou}
            youOwe={balanceMock.youOwe}
          />
        </View>

        <SectionTitle title="Actividad reciente" />
        <View style={styles.list}>
          {recentActivity.map((m) => {
            const ok = m.tone === "success";
            return (
              <View key={m.id} style={styles.moveRow}>
                <View style={styles.moveText}>
                  <Text style={styles.moveLabel}>{m.label}</Text>
                  <Text
                    style={[
                      styles.moveAmount,
                      ok ? styles.amountIn : styles.amountOut,
                    ]}
                  >
                    {ok ? "+" : "−"} {formatCurrency(m.amount)}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <Pressable
          style={({ pressed }) => [styles.history, pressed && styles.historyPressed]}
          onPress={() => {}}
        >
          <Text style={styles.historyText}>Ver historial completo</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.primaryDark} />
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bgWash: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
    overflow: "hidden",
  },
  wash1: {
    position: "absolute",
    width: "155%",
    height: "48%",
    top: "-18%",
    left: "-35%",
  },
  wash2: {
    position: "absolute",
    width: "140%",
    height: "42%",
    top: "-12%",
    right: "-40%",
  },
  wash3: {
    position: "absolute",
    width: "130%",
    height: "55%",
    bottom: "8%",
    left: "-45%",
  },
  wash4: {
    position: "absolute",
    width: "145%",
    height: "50%",
    bottom: "-22%",
    right: "-38%",
  },
  scroll: { paddingHorizontal: spacing.lg, zIndex: 1 },
  hero: {
    width: "100%",
    minHeight: 200,
    alignItems: "center",
    marginBottom: spacing.lg,
    paddingTop: spacing.lg,
  },
  avatar: {
    width: 114,
    height: 114,
    borderRadius: radii.full,
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.75)",
    alignItems: "center",
    justifyContent: "center",
    ...shadows.card,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 1,
  },
  name: {
    marginTop: spacing.md,
    ...typography.title,
    color: colors.text,
  },
  username: {
    marginTop: 4,
    ...typography.caption,
    color: colors.textMuted,
  },
  balanceWrap: { marginBottom: spacing.md },
  list: { gap: spacing.sm },
  moveRow: {
    backgroundColor: colors.cardGlass,
    borderRadius: radii.card,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    ...shadows.soft,
  },
  moveText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  moveLabel: { ...typography.body, color: colors.text, flex: 1, marginRight: spacing.sm },
  moveAmount: { ...typography.bodyMedium },
  amountIn: { color: colors.success },
  amountOut: { color: colors.danger },
  history: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
    paddingVertical: spacing.sm,
  },
  historyPressed: { opacity: 0.75 },
  historyText: {
    ...typography.bodyMedium,
    color: colors.primaryDark,
  },
});
