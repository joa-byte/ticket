import { Tabs } from "expo-router";
import { MainTabBar } from "@/components/MainTabBar";

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <MainTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: "Inicio" }} />
      <Tabs.Screen name="profile" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
