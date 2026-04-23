import { Platform, StyleSheet } from "react-native";

/**
 * Fondo cálido + cards blancas suaves + sombras mínimas (sin gris pesado).
 */
export const colors = {
  background: "#F5F1EB",
  backgroundDeep: "#EAE4DB",
  backgroundElevated: "#FAF6F0",
  surface: "#FFFFFF",
  surfaceMuted: "#F3F0EA",
  cardGlass: "rgba(255,255,255,0.72)",
  cardBorder: "rgba(60, 40, 20, 0.06)",
  border: "#E5DFD6",
  borderSoft: "#EDE8E0",
  text: "#2B2B2B",
  textSecondary: "#6F6A64",
  textMuted: "#9A948C",
  textFaint: "#B8B2A8",
  primary: "#D4C8FC",
  primaryMid: "#C4B5FC",
  primaryDark: "#A890E0",
  primarySoft: "rgba(200, 188, 245, 0.22)",
  primaryFill: "rgba(200, 188, 245, 0.12)",
  primaryRing: "rgba(168, 144, 224, 0.32)",
  success: "#4ADE80",
  successMid: "#86EFAC",
  successSoft: "rgba(74, 222, 128, 0.16)",
  successRing: "rgba(110, 231, 160, 0.38)",
  oweBlue: "#98A8E8",
  oweBlueSoft: "rgba(152, 168, 232, 0.18)",
  danger: "#F87171",
  dangerSoft: "rgba(248, 113, 113, 0.16)",
  orangeDebt: "#E8A078",
  cerradoMuted: "#9E988F",
  cerradoSoft: "rgba(245, 241, 235, 0.92)",
  chipGreen: "#6DCEA3",
  chipGreenSoft: "rgba(109, 206, 163, 0.16)",
  stepperInactive: "#D8D2CA",
  stepperConnector: "#E5DFD7",
  stepperLabel: "#9A948C",
} as const;

/** CTAs: violeta refinado, baja saturación */
export const gradients = {
  primary: ["#E8E0FC", "#D4C4F8", "#BFA8F0"] as const,
  primaryFab: ["#DDD4FA", "#C4B0F0", "#AE98E8"] as const,
  success: ["#C6F6D9", "#86EFAC", "#4ADE80"] as const,
  auraA: ["#FDE8A8", "#FBC878", "#F4A462"] as const,
  auraB: ["#EDE4FF", "#D4C4FC", "#B8A6F8"] as const,
  groupCasa: ["#FFF6DD", "#FDE9A9"] as const,
  groupAmigos: ["#E8FCF0", "#C8F5DC"] as const,
  groupTrabajo: ["#E8EBFF", "#D4DAFD"] as const,
} as const;

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 44,
} as const;

export const radii = {
  sm: 14,
  md: 16,
  card: 18,
  lg: 20,
  xl: 22,
  xxl: 28,
  xxxl: 36,
  full: 9999,
} as const;

export const typography = {
  hero: {
    fontSize: 28,
    fontWeight: "700" as const,
    letterSpacing: -0.75,
    lineHeight: 34,
  },
  title: {
    fontSize: 24,
    fontWeight: "700" as const,
    letterSpacing: -0.55,
    lineHeight: 30,
  },
  section: {
    fontSize: 18,
    fontWeight: "600" as const,
    letterSpacing: -0.35,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: "600" as const,
    letterSpacing: -0.25,
    lineHeight: 23,
  },
  body: { fontSize: 15, fontWeight: "400" as const, lineHeight: 22 },
  bodyMedium: {
    fontSize: 15,
    fontWeight: "600" as const,
    lineHeight: 22,
  },
  caption: { fontSize: 13, fontWeight: "400" as const, lineHeight: 19 },
  small: { fontSize: 11, fontWeight: "600" as const, letterSpacing: 0.85, lineHeight: 14 },
  micro: { fontSize: 10, fontWeight: "600" as const, letterSpacing: 1.1, lineHeight: 13 },
} as const;

const cardShadow = Platform.select({
  ios: {
    shadowColor: "#4A3F38",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.035,
    shadowRadius: 18,
  },
  android: { elevation: 2 },
  default: {},
});

const whisper = Platform.select({
  ios: {
    shadowColor: "#4A3F38",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.03,
    shadowRadius: 14,
  },
  android: { elevation: 1 },
  default: {},
});

export const shadows = {
  card: cardShadow,
  soft: whisper,
  cta: Platform.select({
    ios: {
      shadowColor: "#8B7BC4",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 18,
    },
    android: { elevation: 3 },
    default: {},
  }),
  fab: Platform.select({
    ios: {
      shadowColor: "#8B7BC4",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
    },
    android: { elevation: 3 },
    default: {},
  }),
} as const;

export const theme = { colors, gradients, spacing, radii, typography, shadows };

export const commonStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.cardGlass,
    borderRadius: radii.card,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    ...shadows.card,
  },
});
