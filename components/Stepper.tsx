import { StyleSheet, Text, View } from "react-native";
import { colors, radii, shadows, spacing, typography } from "@/constants/theme";
import type { StepperStep } from "@/types";

type StepperProps = {
  steps: StepperStep[];
  activeIndex: number;
};

export function Stepper({ steps, activeIndex }: StepperProps) {
  return (
    <View style={styles.shell}>
      <View style={styles.trackRow}>
        {steps.map((step, index) => {
          const done = index < activeIndex;
          const active = index === activeIndex;
          const last = index === steps.length - 1;
          return (
            <View key={step.key} style={styles.trackSegment}>
              <View
                style={[
                  styles.nodeOuter,
                  active && styles.nodeOuterActive,
                  done && styles.nodeOuterDone,
                ]}
              >
                <View
                  style={[
                    styles.node,
                    done && styles.nodeDone,
                    active && styles.nodeActive,
                  ]}
                />
              </View>
              {!last ? (
                <View
                  style={[
                    styles.connector,
                    index < activeIndex && styles.connectorDone,
                  ]}
                />
              ) : null}
            </View>
          );
        })}
      </View>
      <View style={styles.labelsRow}>
        {steps.map((step, index) => {
          const done = index < activeIndex;
          const active = index === activeIndex;
          return (
            <Text
              key={`${step.key}-label`}
              style={[
                styles.label,
                active && styles.labelActive,
                done && styles.labelDone,
              ]}
              numberOfLines={1}
            >
              {step.label}
            </Text>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    width: "100%",
    backgroundColor: colors.cardGlass,
    borderRadius: radii.card,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    ...shadows.soft,
  },
  trackRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.xs,
  },
  trackSegment: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  nodeOuter: {
    width: 22,
    height: 22,
    borderRadius: radii.full,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.backgroundDeep,
  },
  nodeOuterActive: {
    backgroundColor: colors.primarySoft,
  },
  nodeOuterDone: {
    backgroundColor: colors.successSoft,
  },
  node: {
    width: 8,
    height: 8,
    borderRadius: radii.full,
    backgroundColor: colors.stepperInactive,
  },
  nodeActive: {
    width: 10,
    height: 10,
    backgroundColor: colors.primaryDark,
  },
  nodeDone: {
    width: 9,
    height: 9,
    backgroundColor: colors.successMid,
  },
  connector: {
    flex: 1,
    height: 2,
    marginHorizontal: 6,
    borderRadius: 2,
    backgroundColor: colors.stepperConnector,
  },
  connectorDone: {
    backgroundColor: "rgba(110, 231, 160, 0.35)",
  },
  labelsRow: {
    flexDirection: "row",
    marginTop: spacing.md,
    paddingHorizontal: 2,
  },
  label: {
    flex: 1,
    textAlign: "center",
    ...typography.micro,
    color: colors.stepperLabel,
    textTransform: "uppercase",
  },
  labelActive: {
    color: colors.primaryDark,
    fontWeight: "700",
  },
  labelDone: {
    color: colors.success,
    fontWeight: "600",
  },
});
