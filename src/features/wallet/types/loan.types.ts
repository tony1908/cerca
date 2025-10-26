/**
 * Loan TypeScript Types
 * Types for loan contract interactions and data structures
 */

import { LoanStatus } from '@/src/config/chains.config';

/**
 * Loan data structure returned from smart contract
 */
export interface LoanData {
  amount: bigint;              // Loan amount in wei (PYUSD tokens)
  maxPaymentDate: bigint;      // Unix timestamp for max payment date
  status: LoanStatus;          // Loan status enum (0-3)
  createdAt: bigint;           // Unix timestamp when loan was created
  isOverdue: boolean;          // Whether loan is past due date
}

/**
 * Formatted loan data for UI display
 */
export interface FormattedLoanData {
  amount: string;              // Formatted amount (e.g., "7000.00")
  amountWei: string;           // Amount in wei as string
  maxPaymentDate: Date;        // JavaScript Date object
  maxPaymentDateTimestamp: number; // Unix timestamp
  status: LoanStatus;
  statusText: string;          // Human-readable status
  createdAt: Date;
  createdAtTimestamp: number;
  isOverdue: boolean;
  daysUntilDue: number;        // Days remaining (negative if overdue)
  isDeviceLocked: boolean;     // Whether device should be locked
}

/**
 * Loan request parameters
 */
export interface LoanRequestParams {
  amount: bigint;              // Amount to borrow in wei
  maxPaymentDate: bigint;      // Max payment date as Unix timestamp
}

/**
 * Loan calculator input (from UI)
 */
export interface LoanCalculatorInput {
  amount: number;              // Amount in PYUSD (e.g., 7000)
  termMonths: number;          // Loan term in months
  paymentDate: Date;           // Selected payment date
}

/**
 * Transaction status for UI feedback
 */
export interface TransactionStatus {
  status: 'idle' | 'pending' | 'approving' | 'confirming' | 'success' | 'error';
  message?: string;
  txHash?: string;
  error?: Error;
}

/**
 * ERC20 token balance and allowance
 */
export interface TokenInfo {
  balance: bigint;             // Token balance in wei
  allowance: bigint;           // Current allowance for loan contract
  formattedBalance: string;    // Formatted balance (e.g., "1000.00")
  needsApproval: boolean;      // Whether approval is needed for loan amount
}
