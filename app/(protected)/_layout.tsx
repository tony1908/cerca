import { Stack } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000000',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
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
        name="profile"
        options={{
          headerShown: false,
          title: "Profile"
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerShown: false,
          title: "Settings"
        }}
      />
      <Stack.Screen
        name="loan-simulate"
        options={{
          title: "",
          headerBackTitle: "Back"
        }}
      />
      <Stack.Screen
        name="loan-calculator"
        options={{
          title: "",
          headerBackTitle: "Back"
        }}
      />
      <Stack.Screen
        name="loan-confirm"
        options={{
          title: "",
          headerBackTitle: "Back"
        }}
      />
      <Stack.Screen
        name="loan-success"
        options={{
          headerShown: false,
          title: ""
        }}
      />
      <Stack.Screen
        name="pay-services"
        options={{
          title: "",
          headerBackTitle: "Back"
        }}
      />
      <Stack.Screen
        name="service-number-input"
        options={{
          title: "Service Number",
          headerBackTitle: "Back"
        }}
      />
      <Stack.Screen
        name="payment-amount"
        options={{
          title: "Payment Amount",
          headerBackTitle: "Back"
        }}
      />
      <Stack.Screen
        name="service-payment"
        options={{
          title: "Service Payment",
          headerBackTitle: "Back"
        }}
      />
      <Stack.Screen
        name="service-payment-success"
        options={{
          headerShown: false,
          title: "Payment Success"
        }}
      />
      <Stack.Screen
        name="kiosk-lock"
        options={{
          headerShown: false,
          title: "Device Locked"
        }}
      />
    </Stack>
  );
}
