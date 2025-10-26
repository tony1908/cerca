/**
 * WrongNetworkBanner Component
 * Shows when wallet is on wrong network with instructions to fix
 */

import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors, spacing } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import { showWalletResetInstructions } from '@/src/features/wallet/utils/resetWallet';
import { useState, useEffect } from 'react';
import { useEmbeddedEthereumWallet } from '@privy-io/expo';
import { DEFAULT_CHAIN_ID } from '@/src/config/chains.config';

export default function WrongNetworkBanner() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const { wallets } = useEmbeddedEthereumWallet();
  const [currentChainId, setCurrentChainId] = useState<number | null>(null);
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);

  useEffect(() => {
    const checkNetwork = async () => {
      try {
        const wallet = wallets?.[0];
        if (!wallet) return;

        const provider = await wallet.getProvider();
        if (!provider) return;

        const chainIdHex = await provider.request({ method: 'eth_chainId' });
        const chainId = parseInt(chainIdHex, 16);

        setCurrentChainId(chainId);
        setIsWrongNetwork(chainId !== DEFAULT_CHAIN_ID);
      } catch (error) {
        console.error('Error checking network:', error);
      }
    };

    checkNetwork();
    const interval = setInterval(checkNetwork, 5000);
    return () => clearInterval(interval);
  }, [wallets]);

  if (!isWrongNetwork) {
    return null;
  }

  return (
    <View
      style={{
        backgroundColor: colors.error,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Feather name="alert-circle" size={20} color="#FFFFFF" style={{ marginRight: spacing.md }} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 14, color: '#FFFFFF', fontWeight: '600', marginBottom: spacing.xs }}>
          Wrong Network Detected
        </Text>
        <Text style={{ fontSize: 12, color: '#FFFFFF', opacity: 0.9 }}>
          Wallet on Chain {currentChainId}, need Arbitrum Sepolia (421614)
        </Text>
      </View>
      <TouchableOpacity
        onPress={showWalletResetInstructions}
        style={{
          backgroundColor: 'rgba(255,255,255,0.2)',
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
          borderRadius: 8,
        }}
      >
        <Text style={{ fontSize: 12, color: '#FFFFFF', fontWeight: '600' }}>
          Fix
        </Text>
      </TouchableOpacity>
    </View>
  );
}
