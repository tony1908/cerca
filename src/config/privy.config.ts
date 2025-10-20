import Constants from "expo-constants";

/**
 * Privy SDK configuration
 */
export const privyConfig = {
  appId: Constants.expoConfig?.extra?.privyAppId,
  clientId: Constants.expoConfig?.extra?.privyClientId,
  config: {
    embedded: {
      ethereum: {
        createOnLogin: 'users-without-wallets' as const,
      },
    },
  },
};
