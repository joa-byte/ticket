import { gradients } from "@/constants/theme";
import type { Group } from "@/types";

export const groupsMock: Group[] = [
  {
    id: "casa",
    name: "Casa",
    memberCount: 3,
    icon: "home",
    gradient: gradients.groupCasa,
  },
  {
    id: "amigos",
    name: "Amigos",
    memberCount: 5,
    icon: "people",
    gradient: gradients.groupAmigos,
  },
  {
    id: "trabajo",
    name: "Trabajo",
    memberCount: 8,
    icon: "briefcase",
    gradient: gradients.groupTrabajo,
  },
];
