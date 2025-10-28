import { Stack } from "expo-router";
import { ThemeProvider, useAppTheme } from "../context/ThemeContext";

function RootLayoutNav() {
  const { colors } = useAppTheme();

  return (
    <Stack
      screenOptions={{
        headerTitle: "Management Job InfernoKU",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen name="(tabs)/index" options={{ headerTitle: "Job List" }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}
