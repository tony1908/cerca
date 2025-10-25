import { Slot, useRouter, useSegments } from "expo-router";
import { usePrivy } from "@privy-io/expo";
import { useEffect } from "react";
import { useKioskContext } from "@/src/contexts/KioskContext";
import { useKioskMode } from "@/src/hooks/useKioskMode";
import KioskLockScreen from "../../app/(protected)/kiosk-lock";

/**
 * NavigationGuard
 * Handles route protection based on authentication state
 * Also conditionally renders kiosk lock screen for overdue/defaulted loans
 */
export function NavigationGuard() {
  const { user, isReady } = usePrivy();
  const segments = useSegments();
  const router = useRouter();
  const { isKioskModeActive, lockedLoan } = useKioskContext();
  const { enableKioskMode, disableKioskMode } = useKioskMode();

  /**
   * Handle authentication-based navigation
   */
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

  /**
   * Handle kiosk mode activation/deactivation
   */
  useEffect(() => {
    if (isKioskModeActive && lockedLoan) {
      console.log('🔒 Activating kiosk mode...');
      enableKioskMode();
    } else {
      console.log('🔓 Deactivating kiosk mode...');
      disableKioskMode();
    }
  }, [isKioskModeActive, lockedLoan]);

  /**
   * If kiosk mode is active, show lock screen instead of normal app
   */
  if (isKioskModeActive && lockedLoan && user) {
    return <KioskLockScreen />;
  }

  return <Slot />;
}
