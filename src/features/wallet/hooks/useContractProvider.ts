/**
 * useContractProvider Hook
 * Bridges Privy's embedded wallet provider with Ethers.js for transaction signing
 *
 * NOTE: This hook is used ONLY for write operations (transactions).
 * For reading contract data, use useViemContractReader instead (more efficient).
 */

import { useState, useCallback } from 'react';
import { useEmbeddedEthereumWallet, getUserEmbeddedEthereumWallet } from '@privy-io/expo';
import { usePrivy } from '@privy-io/expo';
import { ethers, BrowserProvider } from 'ethers';
import { DEFAULT_CHAIN_ID } from '@/src/config/chains.config';
import { useNetworkSwitcher } from './useNetworkSwitcher';

export const useContractProvider = () => {
  const { user } = usePrivy();
  const { wallets } = useEmbeddedEthereumWallet();
  const [isInitializing, setIsInitializing] = useState(false);
  const { ensureCorrectNetwork } = useNetworkSwitcher();

  /**
   * Get wallet address from embedded wallet
   */
  const getWalletAddress = useCallback(() => {
    const embeddedWallet = getUserEmbeddedEthereumWallet(user);
    return embeddedWallet?.address || null;
  }, [user]);

  /**
   * Get ethers provider and signer for transaction signing
   * This bridges Privy's provider with ethers.js
   * Checks network and attempts to switch if on wrong chain
   */
  const getEthersProvider = useCallback(async () => {
    try {
      setIsInitializing(true);

      const wallet = wallets?.[0];
      if (!wallet) {
        throw new Error('No embedded wallet found');
      }

      // Get Privy's EIP-1193 provider
      const provider = await wallet.getProvider();
      if (!provider) {
        throw new Error('Failed to get wallet provider');
      }

      // Create ethers BrowserProvider from Privy provider
      const ethersProvider = new BrowserProvider(provider);

      // Check current network
      const network = await ethersProvider.getNetwork();
      const currentChainId = Number(network.chainId);

      if (currentChainId !== DEFAULT_CHAIN_ID) {
        console.warn(`⚠️ Wrong network detected. Expected: ${DEFAULT_CHAIN_ID}, Got: ${currentChainId}`);

        // Attempt to switch networks using React Native pattern
        const switched = await ensureCorrectNetwork();

        if (!switched) {
          throw new Error(
            'Wallet is on wrong network and switch failed. ' +
            'Please clear app data and log in again to create wallet on Arbitrum Sepolia.'
          );
        }

        // If switch succeeded, re-create provider
        const newProvider = await wallet.getProvider();
        const newEthersProvider = new BrowserProvider(newProvider);
        const signer = await newEthersProvider.getSigner();
        const newNetwork = await newEthersProvider.getNetwork();

        console.log(`✅ Switched to chain ${Number(newNetwork.chainId)}`);

        return {
          provider: newEthersProvider,
          signer,
          chainId: Number(newNetwork.chainId),
        };
      }

      // Already on correct network
      const signer = await ethersProvider.getSigner();
      console.log(`✅ On correct network (Chain ID: ${currentChainId})`);

      return {
        provider: ethersProvider,
        signer,
        chainId: currentChainId,
      };
    } catch (error) {
      console.error('❌ Error getting ethers provider:', error);
      throw error;
    } finally {
      setIsInitializing(false);
    }
  }, [wallets, ensureCorrectNetwork]);

  /**
   * Create a contract instance with the signer attached
   */
  const getContract = useCallback(
    async (contractAddress: string, abi: any) => {
      const { signer } = await getEthersProvider();
      return new ethers.Contract(contractAddress, abi, signer);
    },
    [getEthersProvider]
  );

  /**
   * Verify network is correct
   */
  const verifyNetwork = useCallback(async (): Promise<boolean> => {
    try {
      const { chainId } = await getEthersProvider();
      return chainId === DEFAULT_CHAIN_ID;
    } catch (error) {
      console.error('❌ Error verifying network:', error);
      return false;
    }
  }, [getEthersProvider]);

  return {
    getWalletAddress,
    getEthersProvider,
    getContract,
    verifyNetwork,
    isInitializing,
    hasWallet: wallets && wallets.length > 0,
  };
};
