/**
 * Wallet Reset Utility
 * Helper to reset wallet when on wrong network
 *
 * IMPORTANT: This is a development utility only.
 * In production, users should not need to reset wallets.
 */

import { Alert } from 'react-native';

/**
 * Instructions for resetting wallet to create on correct chain
 */
export const showWalletResetInstructions = () => {
  Alert.alert(
    'Wallet Network Mismatch',
    'Your wallet was created on Ethereum Mainnet. To use Base Sepolia, you need to reset your wallet.\n\n' +
    'Steps:\n' +
    '1. Log out of the app\n' +
    '2. Clear app data (Settings → Apps → Cerca → Clear Data)\n' +
    '3. Log back in\n' +
    '4. A new wallet will be created on Base Sepolia\n\n' +
    'Note: This is only needed because the wallet was created before network configuration was set.',
    [
      { text: 'OK', style: 'default' }
    ]
  );
};

/**
 * Check if wallet needs to be reset (created on wrong chain)
 */
export const needsWalletReset = (currentChainId: number, expectedChainId: number): boolean => {
  return currentChainId !== expectedChainId;
};
