/**
 * NetworkSwitchButton Component
 * Button to manually switch to Base Sepolia network
 */

import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors, spacing } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import { useNetworkSwitcher } from '@/src/features/wallet/hooks/useNetworkSwitcher';
import { useState, useEffect } from 'react';

export default function NetworkSwitchButton() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const { switchToBaseSepolia, isOnCorrectNetwork, isSwitching } = useNetworkSwitcher();
  const [isCorrect, setIsCorrect] = useState(true);

  // Check network on mount
  useEffect(() => {
    const checkNetwork = async () => {
      const correct = await isOnCorrectNetwork();
      setIsCorrect(correct);
    };
    checkNetwork();

    // Check periodically
    const interval = setInterval(checkNetwork, 5000);
    return () => clearInterval(interval);
  }, [isOnCorrectNetwork]);

  const handleSwitch = async () => {
    const success = await switchToBaseSepolia();
    if (success) {
      setIsCorrect(true);
    }
  };

  // Don't show button if already on correct network
  if (isCorrect) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={handleSwitch}
      disabled={isSwitching}
      style={{
        backgroundColor: colors.warning,
        borderRadius: 12,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: spacing.md,
      }}
    >
      {isSwitching ? (
        <>
          <ActivityIndicator color="#FFFFFF" size="small" style={{ marginRight: spacing.sm }} />
          <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: '600' }}>
            Switching Network...
          </Text>
        </>
      ) : (
        <>
          <Feather name="alert-circle" size={20} color="#FFFFFF" style={{ marginRight: spacing.sm }} />
          <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: '600' }}>
            Switch to Base Sepolia
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
