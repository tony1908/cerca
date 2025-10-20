import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="onboarding"
        options={{
          headerShown: false,
          title: "Welcome"
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
          title: "Login"
        }}
      />
    </Stack>
  );
}
