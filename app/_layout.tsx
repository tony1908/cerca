import Constants from "expo-constants";
import { Slot, useRouter, useSegments } from "expo-router";
import { PrivyProvider, usePrivy } from "@privy-io/expo";
import { PrivyElements } from "@privy-io/expo/ui";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();

function NavigationGuard() {
  const { user, isReady } = usePrivy();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isReady) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inProtectedGroup = segments[0] === "(protected)";

    if (!user && inProtectedGroup) {
      // Redirect to login if not authenticated and trying to access protected route
      router.replace("/(auth)/login");
    } else if (user && inAuthGroup) {
      // Redirect to home if authenticated and trying to access auth routes
      router.replace("/(protected)/home");
    }
  }, [user, segments, isReady]);

  return <Slot />;
}

export default function RootLayout() {
  useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <PrivyProvider
          appId={Constants.expoConfig?.extra?.privyAppId}
          clientId={Constants.expoConfig?.extra?.privyClientId}
          config={{
            embedded: {
                ethereum: {
                    createOnLogin: 'users-without-wallets',
                },
            },
        }}
        >
          <NavigationGuard />
          <PrivyElements />
        </PrivyProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
