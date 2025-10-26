/**
 * NetworkSwitcher Component
 * Provides manual network switching functionality
 * Displays current network and allows switching to Arbitrum Sepolia
 */

import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useViemWalletClient } from '../hooks/useViemWalletClient';
import { DEFAULT_CHAIN_ID } from '@/src/config/chains.config';
import { Colors, spacing } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';

export default function NetworkSwitcher() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  const { getCurrentChainId, manualSwitchNetwork } = useViemWalletClient();

  const [currentChain, setCurrentChain] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);

  useEffect(() => {
    loadCurrentChain();
  }, []);

  const loadCurrentChain = async () => {
    setIsLoading(true);
    const chainId = await getCurrentChainId();
    setCurrentChain(chainId);
    setIsLoading(false);
  };

  const handleSwitchNetwork = async () => {
    setIsSwitching(true);
    const success = await manualSwitchNetwork();

    if (success) {
      Alert.alert(
        '✅ Network Switched',
        'Successfully switched to Arbitrum Sepolia!',
        [{ text: 'OK', onPress: loadCurrentChain }]
      );
    } else {
      Alert.alert(
        '❌ Switch Failed',
        'Your wallet is chain-locked to Ethereum Mainnet.\n\nTo use Arbitrum Sepolia:\n1. Log out\n2. Clear app data\n3. Log back in\n\nA new wallet will be created on Arbitrum Sepolia.',
        [
          { text: 'OK', style: 'cancel' },
          { text: 'Check Console Logs', onPress: () => console.log('See detailed logs above') }
        ]
      );
    }

    setIsSwitching(false);
    loadCurrentChain();
  };

  const getChainName = (chainId: number | null): string => {
    if (chainId === null) return 'Unknown';
    if (chainId === 1) return 'Ethereum Mainnet';
    if (chainId === 421614) return 'Arbitrum Sepolia';
    return `Chain ${chainId}`;
  };

  const isCorrectNetwork = currentChain === DEFAULT_CHAIN_ID;

  if (isLoading) {
    return (
      <View style={{
        backgroundColor: colors.cardBackground,
        padding: spacing.lg,
        borderRadius: 12,
        marginBottom: spacing.lg,
      }}>
        <ActivityIndicator size="small" color={colors.primaryPink} />
      </View>
    );
  }

  return (
    <View style={{
      backgroundColor: isCorrectNetwork ? colors.cardBackground : '#3D1F1F',
      padding: spacing.lg,
      borderRadius: 12,
      marginBottom: spacing.lg,
      borderWidth: isCorrectNetwork ? 0 : 2,
      borderColor: isCorrectNetwork ? 'transparent' : '#FF4444',
    }}>
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
      }}>
        <Text style={{
          fontSize: 16,
          fontWeight: '600',
          color: colors.primaryText,
        }}>
          Network
        </Text>
        <TouchableOpacity onPress={loadCurrentChain}>
          <Feather name="refresh-cw" size={18} color={colors.mutedText} />
        </TouchableOpacity>
      </View>

      {/* Current Network Display */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
      }}>
        <View style={{
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: isCorrectNetwork ? '#4CAF50' : '#FF4444',
          marginRight: spacing.sm,
        }} />
        <Text style={{
          fontSize: 14,
          color: colors.primaryText,
          flex: 1,
        }}>
          {getChainName(currentChain)}
        </Text>
        <Text style={{
          fontSize: 12,
          color: colors.mutedText,
          fontFamily: 'monospace',
        }}>
          {currentChain || 'N/A'}
        </Text>
      </View>

      {/* Warning or Success Message */}
      {!isCorrectNetwork && (
        <View style={{
          backgroundColor: 'rgba(255, 68, 68, 0.1)',
          padding: spacing.md,
          borderRadius: 8,
          marginBottom: spacing.md,
        }}>
          <Text style={{
            fontSize: 13,
            color: '#FF6666',
            lineHeight: 18,
          }}>
            ⚠️ Wrong network! This app requires Arbitrum Sepolia (Chain ID: {DEFAULT_CHAIN_ID}).
          </Text>
        </View>
      )}

      {isCorrectNetwork && (
        <View style={{
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          padding: spacing.md,
          borderRadius: 8,
          marginBottom: spacing.md,
        }}>
          <Text style={{
            fontSize: 13,
            color: '#66BB6A',
          }}>
            ✅ Connected to Arbitrum Sepolia
          </Text>
        </View>
      )}

      {/* Switch Network Button */}
      {!isCorrectNetwork && (
        <TouchableOpacity
          style={{
            backgroundColor: colors.primaryPink,
            padding: spacing.md,
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={handleSwitchNetwork}
          disabled={isSwitching}
        >
          {isSwitching ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <Feather name="refresh-cw" size={16} color="#FFFFFF" style={{ marginRight: spacing.sm }} />
              <Text style={{
                color: '#FFFFFF',
                fontSize: 14,
                fontWeight: '600',
              }}>
                Switch to Arbitrum Sepolia
              </Text>
            </>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}
