import { Stack } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home"
        }}
      />
      <Stack.Screen
        name="wallet"
        options={{
          headerShown: false,
          title: "Wallet"
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerShown: false,
          title: "Settings"
        }}
      />
    </Stack>
  );
}
