import { SafeAreaView, Text, View } from "react-native";
import Constants from "expo-constants";
import { usePrivy } from "@privy-io/expo";
import { Redirect } from "expo-router";

export default function Index() {
  const { user, isReady } = usePrivy();

  // Validate configuration
  if ((Constants.expoConfig?.extra?.privyAppId as string).length !== 25) {
    return (
      <SafeAreaView>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>You have not set a valid `privyAppId` in app.json</Text>
        </View>
      </SafeAreaView>
    );
  }
  if (
    !(Constants.expoConfig?.extra?.privyClientId as string).startsWith(
      "client-"
    )
  ) {
    return (
      <SafeAreaView>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>You have not set a valid `privyClientId` in app.json</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Wait for auth to be ready
  if (!isReady) {
    return null; // Or a loading spinner
  }

  // Redirect based on authentication state
  if (user) {
    return <Redirect href="/(protected)/home" />;
  }

  return <Redirect href="/(auth)/login" />;
}
