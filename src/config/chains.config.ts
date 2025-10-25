/**
 * Chain Configuration for Cerca App
 * Base Sepolia testnet configuration
 */

// Base Sepolia Chain Configuration
export const baseSepolia = {
  id: 84532,
  name: 'Base Sepolia',
  network: 'base-sepolia',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: {
    default: { http: ['https://sepolia.base.org'] },
    public: { http: ['https://sepolia.base.org'] },
  },
  blockExplorers: {
    default: {
      name: 'BaseScan',
      url: 'https://sepolia.basescan.org'
    },
  },
  testnet: true,
};

// Default chain for the app
export const DEFAULT_CHAIN = baseSepolia;
export const DEFAULT_CHAIN_ID = 84532;

// Contract Addresses on Base Sepolia
export const CONTRACTS = {
  MXN_TOKEN: '0xEDa089E2692d85afdD6bF72673DEF1b96024c569',
  LOAN_CONTRACT: '0x7edb981b706f2e7C5d37D0B4dBA13c2170E6f5c9',
} as const;

// Loan Status Enum (matches smart contract)
export enum LoanStatus {
  ACTIVE = 0,     // Loan approved and funded, can be repaid
  OVERDUE = 1,    // Loan past due date, can still be repaid
  PAID = 2,       // Loan successfully repaid
  DEFAULTED = 3,  // Loan defaulted (device locked)
}

// Export contract addresses for easy access
export const { MXN_TOKEN, LOAN_CONTRACT } = CONTRACTS;
