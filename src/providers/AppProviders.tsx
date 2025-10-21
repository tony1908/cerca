import { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider } from "@tanstack/react-query";
import { PrivyProvider } from "@privy-io/expo";
import { PrivyElements } from "@privy-io/expo/ui";
import { queryClient } from "@/src/config/queryClient.config";
import { privyConfig } from "@/src/config/privy.config";
import { NavigationGuard } from "@/src/navigation/NavigationGuard";

/**
 * AppProviders
 * Wraps the entire app with necessary providers in the correct order
 */
export function AppProviders({ children }: PropsWithChildren) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <PrivyProvider
            appId={privyConfig.appId}
            clientId={privyConfig.clientId}
            config={privyConfig.config}
          >
            <NavigationGuard />
            <PrivyElements />
          </PrivyProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
