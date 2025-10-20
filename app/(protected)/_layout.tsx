import { Stack } from "expo-router";
import { View } from "react-native";
import CustomTabBar from "@/src/navigation/CustomTabBar";
import { useColorScheme } from "@/src/shared/hooks/useColorScheme";
import { Colors } from "@/src/shared/design/colors";

export default function ProtectedLayout() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  return (
    <View style={{ flex: 1, backgroundColor: colors.mainBackground }}>
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
      <CustomTabBar />
    </View>
  );
}
