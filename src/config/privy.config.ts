import Constants from "expo-constants";
import { arbitrumSepolia } from "./chains.config";

/**
 * Privy SDK configuration
 * Configured to use Arbitrum Sepolia testnet (Chain ID: 421614)
 *
 * Note: Using viem chain definitions for proper network configuration
 * See: https://docs.privy.io/basics/react/advanced/configuring-evm-networks
 */
export const privyConfig = {
  appId: Constants.expoConfig?.extra?.privyAppId,
  clientId: Constants.expoConfig?.extra?.privyClientId,
  config: {
    // Set Arbitrum Sepolia as the default chain
    defaultChain: arbitrumSepolia,
    // List of supported chains (only Arbitrum Sepolia for now)
    supportedChains: [arbitrumSepolia],
    // Embedded wallet configuration
    embedded: {
      ethereum: {
        createOnLogin: 'users-without-wallets' as const,
      },
    },
  },
};
