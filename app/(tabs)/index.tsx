import { type Href, useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  GroupCard,
  HomeHeader,
  PrimaryButton,
  SectionTitle,
  TicketCard,
} from "@/components";
import { commonStyles, spacing } from "@/constants/theme";
import { MOCK_TICKET_FLOW_ID } from "@/constants/routes";
import { groupsMock, ticketsMock } from "@/data";
import { useTicketSplitStore } from "@/store/ticketSplitStore";
import type { Ticket } from "@/types";

function ticketDestination(t: Ticket): string {
  const base = `/ticket/${t.id}`;
  switch (t.status) {
    case "a_dividir":
      return `${base}/split`;
    case "dividido":
      return `${base}/payer`;
    case "cerrado":
      return `${base}/expenses`;
  }
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const resetSplit = useTicketSplitStore((s) => s.reset);

  return (
    <View style={commonStyles.screen}>
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + spacing.md, paddingBottom: 120 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader greeting="Hola Joa! 👋" />
        <PrimaryButton
          label="+ Nuevo ticket"
          onPress={() => {
            resetSplit();
            router.push(`/ticket/${MOCK_TICKET_FLOW_ID}/upload` as Href);
          }}
          style={styles.cta}
        />

        <SectionTitle title="Mis grupos" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.groupsRow}
        >
          {groupsMock.map((g) => (
            <GroupCard key={g.id} group={g} />
          ))}
        </ScrollView>

        <SectionTitle title="Mis tickets" />
        {ticketsMock.map((t) => (
          <TicketCard
            key={t.id}
            ticket={t}
            onPress={() => router.push(ticketDestination(t) as Href)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: spacing.lg },
  cta: { marginBottom: spacing.sm },
  groupsRow: {
    paddingVertical: spacing.xs,
    paddingRight: spacing.lg,
  },
});
