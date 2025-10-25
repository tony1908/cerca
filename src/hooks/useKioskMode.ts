/**
 * useKioskMode Hook
 * Android device control for kiosk mode (device locking)
 * Uses expo-kiosk-control to pin app and prevent user from exiting
 */

import { useState, useEffect, useCallback } from 'react';
import { Platform, AppState, AppStateStatus } from 'react-native';
import * as ExpoKioskControl from 'expo-kiosk-control';

export const useKioskMode = () => {
  const [isKioskEnabled, setIsKioskEnabled] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);

  /**
   * Enable kiosk mode (lock device)
   * Only works on Android
   */
  const enableKioskMode = useCallback(async (): Promise<boolean> => {
    if (Platform.OS !== 'android') {
      console.warn('⚠️  Kiosk mode is only available on Android');
      return false;
    }

    try {
      console.log('🔒 Enabling kiosk mode...');

      // Start kiosk mode (app pinning)
      await ExpoKioskControl.startKioskMode();

      // Disable exit by unpinning
      await ExpoKioskControl.disableExitByUnpinning();

      setIsKioskEnabled(true);
      console.log('✅ Kiosk mode enabled successfully');
      return true;
    } catch (error) {
      console.error('❌ Error enabling kiosk mode:', error);
      return false;
    }
  }, []);

  /**
   * Disable kiosk mode (unlock device)
   */
  const disableKioskMode = useCallback(async (): Promise<boolean> => {
    if (Platform.OS !== 'android') {
      return false;
    }

    try {
      console.log('🔓 Disabling kiosk mode...');

      // Re-enable exit by unpinning first
      await ExpoKioskControl.enableExitByUnpinning();

      // Exit kiosk mode
      await ExpoKioskControl.exitKioskMode();

      setIsKioskEnabled(false);
      console.log('✅ Kiosk mode disabled successfully');
      return true;
    } catch (error) {
      console.error('❌ Error disabling kiosk mode:', error);
      return false;
    }
  }, []);

  /**
   * Handle app state changes to maintain kiosk mode
   * If user tries to exit while kiosk mode is enabled, re-enable it
   */
  const handleAppStateChange = useCallback(
    async (nextAppState: AppStateStatus) => {
      if (
        appState.match(/inactive|background/) &&
        nextAppState === 'active' &&
        isKioskEnabled
      ) {
        console.log('🔄 App returned to foreground, re-enabling kiosk mode...');

        // Re-enable kiosk mode if it was previously enabled
        try {
          await ExpoKioskControl.startKioskMode();
          await ExpoKioskControl.disableExitByUnpinning();
        } catch (error) {
          console.error('❌ Error re-enabling kiosk mode:', error);
        }
      }

      setAppState(nextAppState);
    },
    [appState, isKioskEnabled]
  );

  /**
   * Listen to app state changes
   */
  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [handleAppStateChange]);

  /**
   * Handle recent button press (Android)
   * Block access to recent apps while in kiosk mode
   */
  const handleRecentButtonPress = useCallback(() => {
    if (Platform.OS === 'android' && isKioskEnabled) {
      console.log('⚠️  Recent button blocked in kiosk mode');
      ExpoKioskControl.onRecentButtonPressed();
    }
  }, [isKioskEnabled]);

  return {
    isKioskEnabled,
    enableKioskMode,
    disableKioskMode,
    handleRecentButtonPress,
  };
};
