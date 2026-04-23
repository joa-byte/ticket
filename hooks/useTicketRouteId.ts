import { useLocalSearchParams } from "expo-router";
import { MOCK_TICKET_FLOW_ID } from "@/constants/routes";

export function useTicketRouteId(): string {
  const { id } = useLocalSearchParams<{ id: string }>();
  const raw = Array.isArray(id) ? id[0] : id;
  return raw || MOCK_TICKET_FLOW_ID;
}
