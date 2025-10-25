/**
 * useViemWalletClient Hook
 * Creates a viem wallet client for transaction signing in React Native
 * Follows Privy's recommended pattern for Web3 integrations
 * See: https://docs.privy.io/wallets/using-wallets/ethereum/web3-integrations#react-native
 */

import { useCallback, useMemo } from 'react';
import { createWalletClient, custom, WalletClient, Chain } from 'viem';
import { useEmbeddedEthereumWallet, getUserEmbeddedEthereumWallet } from '@privy-io/expo';
import { usePrivy } from '@privy-io/expo';
import { baseSepolia, DEFAULT_CHAIN_ID } from '@/src/config/chains.config';
import { useNetworkSwitcher } from './useNetworkSwitcher';

export const useViemWalletClient = () => {
  const { user } = usePrivy();
  const { wallets } = useEmbeddedEthereumWallet();
  const { ensureCorrectNetwork, switchToBaseSepolia } = useNetworkSwitcher();

  /**
   * Get wallet address from embedded wallet
   */
  const getWalletAddress = useCallback(() => {
    const embeddedWallet = getUserEmbeddedEthereumWallet(user);
    return embeddedWallet?.address as `0x${string}` | null;
  }, [user]);

  /**
   * Get current chain ID of the wallet
   */
  const getCurrentChainId = useCallback(async (): Promise<number | null> => {
    try {
      const wallet = wallets?.[0];
      if (!wallet) return null;

      const provider = await wallet.getProvider();
      if (!provider) return null;

      const chainId = await provider.request({ method: 'eth_chainId' });
      return parseInt(chainId, 16);
    } catch (error) {
      console.error('❌ Error getting current chain ID:', error);
      return null;
    }
  }, [wallets]);

  /**
   * Manually attempt to switch network
   * NOTE: This will likely fail for Privy embedded wallets (they are chain-locked)
   * Returns true if successful, false otherwise
   */
  const manualSwitchNetwork = useCallback(async (): Promise<boolean> => {
    try {
      console.log('');
      console.log('🔄 MANUAL NETWORK SWITCH REQUESTED');
      console.log('═══════════════════════════════════');

      const currentChainId = await getCurrentChainId();
      if (!currentChainId) {
        console.error('❌ Could not determine current chain ID');
        return false;
      }

      console.log(`📍 Current chain: ${currentChainId}`);
      console.log(`🎯 Target chain: ${DEFAULT_CHAIN_ID} (Base Sepolia)`);

      if (currentChainId === DEFAULT_CHAIN_ID) {
        console.log('✅ Already on Base Sepolia!');
        console.log('');
        return true;
      }

      console.log('');
      console.log('⚠️  WARNING: Privy embedded wallets are chain-locked.');
      console.log('   This switch attempt will likely fail.');
      console.log('');
      console.log('🔄 Attempting to switch anyway...');

      const switched = await switchToBaseSepolia();

      if (switched) {
        const newChainId = await getCurrentChainId();
        console.log('');
        console.log('✅ Switch appeared to succeed!');
        console.log(`📍 New chain ID: ${newChainId}`);
        console.log('');
        return newChainId === DEFAULT_CHAIN_ID;
      } else {
        console.log('');
        console.error('❌ Switch failed.');
        console.error('');
        console.error('💡 SOLUTION: Clear app data and log in again');
        console.error('   1. Log out');
        console.error('   2. Settings → Apps → Cerca → Storage → Clear Data');
        console.error('   3. Log back in');
        console.error('   4. New wallet will be created on Base Sepolia');
        console.error('');
        return false;
      }
    } catch (error) {
      console.error('❌ Error during manual switch:', error);
      return false;
    }
  }, [getCurrentChainId, switchToBaseSepolia]);

  /**
   * Create a viem wallet client for transaction signing
   * Following Privy's React Native pattern
   */
  const getWalletClient = useCallback(async (): Promise<WalletClient> => {
    try {
      const wallet = wallets?.[0];
      if (!wallet) {
        throw new Error('No embedded wallet found');
      }

      const address = getWalletAddress();
      if (!address) {
        throw new Error('No wallet address available');
      }

      // Get Privy's EIP-1193 provider
      const provider = await wallet.getProvider();
      if (!provider) {
        throw new Error('Failed to get wallet provider');
      }

      // Check current network
      const currentChainId = await provider.request({ method: 'eth_chainId' });
      const chainIdDecimal = parseInt(currentChainId, 16);

      console.log(`🔍 Current wallet chain ID: ${chainIdDecimal}`);
      console.log(`🎯 Target chain ID: ${DEFAULT_CHAIN_ID}`);

      // CRITICAL: Privy embedded wallets are chain-locked at creation
      if (chainIdDecimal !== DEFAULT_CHAIN_ID) {
        console.error('');
        console.error('❌❌❌ CRITICAL ERROR: WRONG NETWORK ❌❌❌');
        console.error(`   Your wallet is on chain ${chainIdDecimal} (Ethereum Mainnet)`);
        console.error(`   But this app requires chain ${DEFAULT_CHAIN_ID} (Base Sepolia)`);
        console.error('');
        console.error('🔒 Privy embedded wallets are LOCKED to their creation chain.');
        console.error('   Network switching will NOT work for embedded wallets.');
        console.error('');
        console.error('💡 REQUIRED ACTION:');
        console.error('   1. Log out of the app');
        console.error('   2. Go to: Settings → Apps → Cerca → Storage → Clear Data');
        console.error('   3. Log back in');
        console.error('   4. A NEW wallet will be created on Base Sepolia');
        console.error('');
        console.error('⚠️  You MUST do this before you can use loan features!');
        console.error('');

        throw new Error(
          `WRONG NETWORK: Wallet is on chain ${chainIdDecimal}, needs chain ${DEFAULT_CHAIN_ID}. ` +
          `Clear app data and log in again to create wallet on Base Sepolia.`
        );
      }

      // Create viem wallet client with custom transport
      // This is Privy's recommended pattern for React Native
      const walletClient = createWalletClient({
        account: address,
        chain: baseSepolia as Chain,
        transport: custom(provider),
      });

      console.log('✅ Viem wallet client created for Base Sepolia');
      console.log(`✅ Wallet ready on chain ${chainIdDecimal}`);
      return walletClient;
    } catch (error) {
      console.error('❌ Error creating wallet client:', error);
      throw error;
    }
  }, [wallets, getWalletAddress, ensureCorrectNetwork]);

  /**
   * Get wallet client only if wallet exists
   */
  const walletClient = useMemo(() => {
    return wallets && wallets.length > 0 ? getWalletClient : null;
  }, [wallets, getWalletClient]);

  return {
    getWalletClient,
    getWalletAddress,
    getCurrentChainId,
    manualSwitchNetwork,
    hasWallet: wallets && wallets.length > 0,
  };
};
