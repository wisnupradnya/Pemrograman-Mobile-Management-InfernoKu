import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { useAppTheme } from "../../context/ThemeContext";

export default function TabsLayout() {
  const { colors } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Serch"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Finance"
        options={{
          title: "Finance",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cash" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
