import Constants from "expo-constants";
import { baseSepolia } from "./chains.config";

/**
 * Privy SDK configuration
 * Configured to use Base Sepolia testnet (Chain ID: 84532)
 *
 * Note: Using viem chain definitions for proper network configuration
 * See: https://docs.privy.io/basics/react/advanced/configuring-evm-networks
 */
export const privyConfig = {
  appId: Constants.expoConfig?.extra?.privyAppId,
  clientId: Constants.expoConfig?.extra?.privyClientId,
  config: {
    // Set Base Sepolia as the default chain
    defaultChain: baseSepolia,
    // List of supported chains (only Base Sepolia for now)
    supportedChains: [baseSepolia],
    // Embedded wallet configuration
    embedded: {
      ethereum: {
        createOnLogin: 'users-without-wallets' as const,
      },
    },
  },
};
