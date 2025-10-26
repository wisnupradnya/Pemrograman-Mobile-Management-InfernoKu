import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "Management Job InfernoKU",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="(tabs)/index" options={{ headerTitle: "Job List" }} />
    </Stack>
  );
}
