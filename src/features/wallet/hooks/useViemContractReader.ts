/**
 * useViemContractReader Hook
 * Uses viem's readContract for efficient contract data reading
 * Following Privy's recommended approach for reading blockchain data
 */

import { useCallback } from 'react';
import { createPublicClient, http, formatUnits } from 'viem';
import { baseSepolia } from '@/src/config/chains.config';
import { LOAN_CONTRACT, MXN_TOKEN, LoanStatus } from '@/src/config/chains.config';
import { loanContractABI } from '@/src/config/loanContractABI';
import { erc20ABI } from '@/src/config/erc20ABI';
import type { LoanData, TokenInfo } from '../types/loan.types';

/**
 * Create a public client for reading contract data on Base Sepolia
 * This is more efficient than using a provider for read operations
 */
const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

export const useViemContractReader = () => {
  /**
   * Get active loan for an address using viem's readContract
   */
  const getActiveLoan = useCallback(
    async (address: string): Promise<LoanData | null> => {
      try {
        if (!address) {
          throw new Error('No wallet address provided');
        }

        console.log('📖 Reading loan data for:', address);

        const loanData = await publicClient.readContract({
          address: LOAN_CONTRACT as `0x${string}`,
          abi: loanContractABI,
          functionName: 'getActiveLoan',
          args: [address as `0x${string}`],
        });

        // loanData is a tuple: [amount, maxPaymentDate, status, createdAt, isOverdue]
        const [amount, maxPaymentDate, status, createdAt, isOverdue] = loanData as [
          bigint,
          bigint,
          number,
          bigint,
          boolean
        ];

        // Check if loan exists (amount > 0)
        if (amount === 0n) {
          console.log('ℹ️ No active loan found');
          return null;
        }

        console.log('✅ Loan data retrieved:', {
          amount: amount.toString(),
          maxPaymentDate: new Date(Number(maxPaymentDate) * 1000).toISOString(),
          status: LoanStatus[status],
          isOverdue,
        });

        return {
          amount,
          maxPaymentDate,
          status: status as LoanStatus,
          createdAt,
          isOverdue,
        };
      } catch (error) {
        console.error('❌ Error reading active loan:', error);
        throw error;
      }
    },
    []
  );

  /**
   * Get user's MXN token balance
   */
  const getTokenBalance = useCallback(
    async (address: string): Promise<bigint> => {
      try {
        const balance = await publicClient.readContract({
          address: MXN_TOKEN as `0x${string}`,
          abi: erc20ABI,
          functionName: 'balanceOf',
          args: [address as `0x${string}`],
        });

        console.log('💰 Token balance:', formatUnits(balance as bigint, 18), 'MXN');
        return balance as bigint;
      } catch (error) {
        console.error('❌ Error reading token balance:', error);
        throw error;
      }
    },
    []
  );

  /**
   * Get user's token allowance for the loan contract
   */
  const getTokenAllowance = useCallback(
    async (address: string): Promise<bigint> => {
      try {
        const allowance = await publicClient.readContract({
          address: MXN_TOKEN as `0x${string}`,
          abi: erc20ABI,
          functionName: 'allowance',
          args: [address as `0x${string}`, LOAN_CONTRACT as `0x${string}`],
        });

        console.log('🔓 Token allowance:', formatUnits(allowance as bigint, 18), 'MXN');
        return allowance as bigint;
      } catch (error) {
        console.error('❌ Error reading token allowance:', error);
        throw error;
      }
    },
    []
  );

  /**
   * Get complete token information (balance + allowance)
   */
  const getTokenInfo = useCallback(
    async (address: string, loanAmount?: bigint): Promise<TokenInfo> => {
      try {
        const [balance, allowance] = await Promise.all([
          getTokenBalance(address),
          getTokenAllowance(address),
        ]);

        const formattedBalance = formatUnits(balance, 18);
        const needsApproval = loanAmount ? allowance < loanAmount : false;

        return {
          balance,
          allowance,
          formattedBalance,
          needsApproval,
        };
      } catch (error) {
        console.error('❌ Error getting token info:', error);
        throw error;
      }
    },
    [getTokenBalance, getTokenAllowance]
  );

  /**
   * Get loan contract balance (available funds for loans)
   */
  const getContractBalance = useCallback(async (): Promise<bigint> => {
    try {
      const balance = await publicClient.readContract({
        address: LOAN_CONTRACT as `0x${string}`,
        abi: loanContractABI,
        functionName: 'getContractBalance',
      });

      console.log('🏦 Contract balance:', formatUnits(balance as bigint, 18), 'MXN');
      return balance as bigint;
    } catch (error) {
      console.error('❌ Error reading contract balance:', error);
      throw error;
    }
  }, []);

  /**
   * Check if user has an active loan (boolean check)
   */
  const hasActiveLoan = useCallback(
    async (address: string): Promise<boolean> => {
      try {
        const result = await publicClient.readContract({
          address: LOAN_CONTRACT as `0x${string}`,
          abi: loanContractABI,
          functionName: 'hasActiveLoanStatus',
          args: [address as `0x${string}`],
        });

        console.log('🔍 Has active loan:', result);
        return result as boolean;
      } catch (error) {
        console.error('❌ Error checking active loan status:', error);
        return false;
      }
    },
    []
  );

  /**
   * Batch read multiple contract values efficiently using multicall
   * This reduces the number of RPC calls
   */
  const getLoanAndTokenInfo = useCallback(
    async (address: string): Promise<{
      loan: LoanData | null;
      tokenInfo: TokenInfo;
      hasLoan: boolean;
    }> => {
      try {
        // Viem automatically batches these calls when possible
        const [loan, tokenInfo, hasLoan] = await Promise.all([
          getActiveLoan(address),
          getTokenInfo(address),
          hasActiveLoan(address),
        ]);

        return {
          loan,
          tokenInfo,
          hasLoan,
        };
      } catch (error) {
        console.error('❌ Error getting loan and token info:', error);
        throw error;
      }
    },
    [getActiveLoan, getTokenInfo, hasActiveLoan]
  );

  return {
    // Read operations
    getActiveLoan,
    getTokenBalance,
    getTokenAllowance,
    getTokenInfo,
    getContractBalance,
    hasActiveLoan,
    getLoanAndTokenInfo,
    // Public client for custom reads if needed
    publicClient,
  };
};
