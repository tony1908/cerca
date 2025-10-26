/**
 * Chain Configuration for Cerca App
 * Arbitrum Sepolia testnet configuration
 */

// Arbitrum Sepolia Chain Configuration
export const arbitrumSepolia = {
  id: 421614,
  name: 'Arbitrum Sepolia',
  network: 'arbitrum-sepolia',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: {
    default: { http: ['https://sepolia-rollup.arbitrum.io/rpc'] },
    public: { http: ['https://sepolia-rollup.arbitrum.io/rpc'] },
  },
  blockExplorers: {
    default: {
      name: 'Arbiscan',
      url: 'https://sepolia.arbiscan.io'
    },
  },
  testnet: true,
};

// Default chain for the app
export const DEFAULT_CHAIN = arbitrumSepolia;
export const DEFAULT_CHAIN_ID = 421614;

// Contract Addresses on Arbitrum Sepolia
export const CONTRACTS = {
  PYUSD_TOKEN: '0x637A1259C6afd7E3AdF63993cA7E58BB438aB1B1',
  LOAN_CONTRACT: '0xd880112AeC1307eBE2886e4fB0daec82564f3a65',
} as const;

// Loan Status Enum (matches smart contract)
export enum LoanStatus {
  ACTIVE = 0,     // Loan approved and funded, can be repaid
  OVERDUE = 1,    // Loan past due date, can still be repaid
  PAID = 2,       // Loan successfully repaid
  DEFAULTED = 3,  // Loan defaulted (device locked)
}

// Export contract addresses for easy access
export const { PYUSD_TOKEN, LOAN_CONTRACT } = CONTRACTS;
