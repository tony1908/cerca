/**
 * useNetworkSwitcher Hook
 * Handles network checking for Privy embedded wallets in React Native
 *
 * NOTE: Privy embedded wallets are chain-locked at creation time.
 * If a wallet was created on the wrong chain, it must be deleted and recreated.
 * See: https://docs.privy.io/wallets/using-wallets/ethereum/switch-chain#react-native
 */

import { useState, useCallback } from 'react';
import { useEmbeddedEthereumWallet } from '@privy-io/expo';
import { DEFAULT_CHAIN_ID } from '@/src/config/chains.config';

export const useNetworkSwitcher = () => {
  const { wallets } = useEmbeddedEthereumWallet();
  const [isSwitching, setIsSwitching] = useState(false);

  /**
   * Attempt to switch embedded wallet to Base Sepolia
   * React Native pattern from: https://docs.privy.io/wallets/using-wallets/ethereum/switch-chain#react-native
   *
   * IMPORTANT: Privy embedded wallets are chain-locked at creation.
   * If the wallet was created on a different chain, this will fail.
   * Solution: Delete wallet and recreate by clearing app data and logging in again.
   */
  const switchToBaseSepolia = useCallback(async (): Promise<boolean> => {
    try {
      const wallet = wallets?.[0];
      if (!wallet) {
        console.warn('⚠️  No wallet found');
        return false;
      }

      setIsSwitching(true);
      console.log('🔄 Attempting to switch to Base Sepolia (Chain ID: 84532)...');

      const provider = await wallet.getProvider();
      if (!provider) {
        console.error('❌ Failed to get provider');
        return false;
      }

      // Convert chain ID to hex string (0x14a34 = 84532)
      const chainIdHex = `0x${DEFAULT_CHAIN_ID.toString(16)}`;

      // Attempt network switch using React Native pattern
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdHex }],
      });

      // Verify the switch worked
      const currentChainId = await provider.request({ method: 'eth_chainId' });
      const currentChainIdDecimal = parseInt(currentChainId, 16);

      if (currentChainIdDecimal === DEFAULT_CHAIN_ID) {
        console.log('✅ Successfully switched to Base Sepolia');
        return true;
      } else {
        console.error('❌ Network switch call succeeded but wallet is still on wrong chain');
        console.error(`   Expected chain: ${DEFAULT_CHAIN_ID}, Got: ${currentChainIdDecimal}`);
        console.error('');
        console.error('🔍 DIAGNOSIS: Your wallet was created on Ethereum Mainnet (Chain ID 1).');
        console.error('   Privy embedded wallets are chain-locked at creation time.');
        console.error('');
        console.error('💡 SOLUTION:');
        console.error('   1. Log out of the app');
        console.error('   2. Clear app data: Settings → Apps → Cerca → Storage → Clear Data');
        console.error('   3. Log back in');
        console.error('   4. A new wallet will be created on Base Sepolia');
        console.error('');
        return false;
      }
    } catch (error: any) {
      console.error('❌ Network switch request failed:', error.message);

      if (error.code === 4902) {
        console.error('   Chain not configured in wallet');
      } else if (error.code === 4001) {
        console.error('   User rejected the network switch');
      }

      return false;
    } finally {
      setIsSwitching(false);
    }
  }, [wallets]);

  /**
   * Check if wallet is on the correct network
   */
  const isOnCorrectNetwork = useCallback(async (): Promise<boolean> => {
    try {
      const wallet = wallets?.[0];
      if (!wallet) return false;

      const provider = await wallet.getProvider();
      if (!provider) return false;

      const chainId = await provider.request({ method: 'eth_chainId' });
      const currentChainId = parseInt(chainId, 16);

      return currentChainId === DEFAULT_CHAIN_ID;
    } catch (error) {
      console.error('❌ Error checking network:', error);
      return false;
    }
  }, [wallets]);

  /**
   * Auto-switch to Base Sepolia if on wrong network
   */
  const ensureCorrectNetwork = useCallback(async (): Promise<boolean> => {
    const isCorrect = await isOnCorrectNetwork();
    if (isCorrect) {
      return true;
    }

    console.log('⚠️  Wrong network detected, switching...');
    return await switchToBaseSepolia();
  }, [isOnCorrectNetwork, switchToBaseSepolia]);

  return {
    switchToBaseSepolia,
    isOnCorrectNetwork,
    ensureCorrectNetwork,
    isSwitching,
  };
};
