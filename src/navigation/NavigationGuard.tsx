import { Slot, useRouter, useSegments } from "expo-router";
import { usePrivy } from "@privy-io/expo";
import { useEffect } from "react";

/**
 * NavigationGuard
 * Handles route protection based on authentication state
 */
export function NavigationGuard() {
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
