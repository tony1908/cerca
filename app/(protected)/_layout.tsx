import { Stack } from "expo-router";
import { View } from "react-native";
import CustomTabBar from "@/components/CustomTabBar";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

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
      </Stack>
      <CustomTabBar />
    </View>
  );
}
