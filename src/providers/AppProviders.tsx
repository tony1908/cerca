import { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider } from "@tanstack/react-query";
import { PrivyProvider } from "@privy-io/expo";
import { PrivyElements } from "@privy-io/expo/ui";
import { queryClient } from "@/src/config/queryClient.config";
import { privyConfig } from "@/src/config/privy.config";
import { NavigationGuard } from "@/src/navigation/NavigationGuard";
import { KioskProvider } from "@/src/contexts/KioskContext";

/**
 * AppProviders
 * Wraps the entire app with necessary providers in the correct order
 *
 * Provider hierarchy (outer to inner):
 * 1. GestureHandlerRootView - Gesture support
 * 2. SafeAreaProvider - Safe area handling
 * 3. QueryClientProvider - TanStack Query for data fetching
 * 4. PrivyProvider - Authentication and wallet management
 * 5. KioskProvider - Loan monitoring and device locking
 * 6. NavigationGuard - Route protection
 * 7. PrivyElements - UI components for Privy flows
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
            <KioskProvider>
              <NavigationGuard />
              <PrivyElements />
            </KioskProvider>
          </PrivyProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
