/**
 * useLoanContract Hook
 * Provides functions for interacting with the loan smart contract
 * Uses viem for both read and write operations (Privy's recommended pattern)
 * See: https://docs.privy.io/wallets/using-wallets/ethereum/web3-integrations#react-native
 */

import { useCallback } from 'react';
import { formatUnits } from 'viem';
import { useViemContractReader } from './useViemContractReader';
import { useViemWalletClient } from './useViemWalletClient';
import { loanContractABI } from '@/src/config/loanContractABI';
import { erc20ABI } from '@/src/config/erc20ABI';
import { LOAN_CONTRACT, PYUSD_TOKEN } from '@/src/config/chains.config';
import type { LoanData, TokenInfo } from '../types/loan.types';

export const useLoanContract = () => {
  const viemReader = useViemContractReader();
  const { getWalletClient, getWalletAddress } = useViemWalletClient();

  /**
   * Get active loan for an address (using viem for efficient reads)
   */
  const getActiveLoan = useCallback(
    async (address?: string): Promise<LoanData | null> => {
      try {
        const walletAddress = address || getWalletAddress();
        if (!walletAddress) {
          throw new Error('No wallet address available');
        }

        // Use viem for reading contract data - more efficient than ethers
        return await viemReader.getActiveLoan(walletAddress);
      } catch (error) {
        console.log('❌ Error getting active loan:', error);
        throw error;
      }
    },
    [getWalletAddress, viemReader]
  );

  /**
   * Request a new loan using viem wallet client
   * NOTE: Amount and maxPaymentDate are hardcoded internally for testing
   */
  const requestLoan = useCallback(
    async (amount: bigint, maxPaymentDate: bigint): Promise<string> => {
      try {
        const walletAddress = getWalletAddress();
        if (!walletAddress) {
          throw new Error('No wallet address available');
        }

        console.log('Wallet address:', walletAddress);
        // Hardcode amount to 10 tokens (10 * 10^18 wei)
        const hardcodedAmount = BigInt('10000000000000000000'); // 10 PYUSD

        // Hardcode maxPaymentDate to 1761361167 (Unix timestamp)
        const hardcodedMaxPaymentDate = BigInt('1761361167');

        console.log('📝 Requesting loan:', {
          requestedAmount: amount.toString(),
          actualAmount: hardcodedAmount.toString(),
          requestedMaxPaymentDate: maxPaymentDate.toString(),
          actualMaxPaymentDate: hardcodedMaxPaymentDate.toString(),
          actualDate: new Date(Number(hardcodedMaxPaymentDate) * 1000).toISOString(),
        });

        // Get viem wallet client
        const walletClient = await getWalletClient();

        let a = await walletClient.getAddresses();

        let b = await walletClient.getChainId();

        console.log('Wallet chain:', b);

        console.log('Wallet client:', a);

        // Write to contract using viem with hardcoded values
        const hash = await walletClient.writeContract({
          address: LOAN_CONTRACT as `0x${string}`,
          abi: loanContractABI,
          functionName: 'requestLoan',
          args: [hardcodedAmount, hardcodedMaxPaymentDate],
          account: a[0],
          chain: null,
        });

        console.log('⏳ Transaction sent:', hash);

        // Wait for transaction confirmation using public client
        const receipt = await viemReader.publicClient.waitForTransactionReceipt({ hash });
        console.log('✅ Loan requested successfully:', receipt.transactionHash);

        return receipt.transactionHash;
      } catch (error: any) {
        console.error('❌ Error requesting loan:', error);

        // Handle specific viem errors
        if (error.message?.includes('User rejected')) {
          throw new Error('Transaction was rejected');
        }
        if (error.message?.includes('execution reverted')) {
          throw new Error('Contract call failed. You may already have an active loan.');
        }

        throw error;
      }
    },
    [getWalletClient, getWalletAddress, viemReader]
  );

  /**
   * Pay back loan (full or partial payment) using viem
   */
  const payBackLoan = useCallback(
    async (amount: bigint): Promise<string> => {
      try {
        const walletAddress = getWalletAddress();
        if (!walletAddress) {
          throw new Error('No wallet address available');
        }

        console.log('💰 Paying back loan:', amount.toString());

        // Get viem wallet client
        const walletClient = await getWalletClient();

        // Check current allowance using viem reader
        const currentAllowance = await viemReader.getTokenAllowance(walletAddress);
        console.log('📊 Current allowance:', currentAllowance.toString());

        // Approve tokens if needed
        if (currentAllowance < amount) {
          console.log('🔓 Approving tokens...');

          const approveHash = await walletClient.writeContract({
            address: PYUSD_TOKEN as `0x${string}`,
            abi: erc20ABI,
            functionName: 'approve',
            args: [LOAN_CONTRACT as `0x${string}`, amount],
            account: walletAddress,
            chain: null,
          });

          // Wait for approval confirmation
          await viemReader.publicClient.waitForTransactionReceipt({ hash: approveHash });
          console.log('✅ Token approval confirmed');
        }

        // Execute payment
        console.log('💸 Executing payment...');
        const payHash = await walletClient.writeContract({
          address: LOAN_CONTRACT as `0x${string}`,
          abi: loanContractABI,
          functionName: 'payBackLoan',
          args: [amount],
          account: walletAddress,
          chain: null,
        });

        console.log('⏳ Payment transaction sent:', payHash);

        // Wait for payment confirmation
        const receipt = await viemReader.publicClient.waitForTransactionReceipt({ hash: payHash });
        console.log('✅ Payment successful:', receipt.transactionHash);

        return receipt.transactionHash;
      } catch (error: any) {
        console.error('❌ Error paying back loan:', error);

        // Handle specific viem errors
        if (error.message?.includes('User rejected')) {
          throw new Error('Transaction was rejected');
        }
        if (error.message?.includes('ERC20InsufficientBalance')) {
          throw new Error('Insufficient PYUSD token balance');
        }
        if (error.message?.includes('ERC20InsufficientAllowance')) {
          throw new Error('Token approval failed. Please try again.');
        }

        throw error;
      }
    },
    [getWalletClient, getWalletAddress, viemReader]
  );

  /**
   * Get user's PYUSD token balance and allowance (using viem for efficient reads)
   */
  const getTokenInfo = useCallback(
    async (loanAmount?: bigint): Promise<TokenInfo> => {
      try {
        const walletAddress = getWalletAddress();
        if (!walletAddress) {
          throw new Error('No wallet address available');
        }

        // Use viem for reading token data
        return await viemReader.getTokenInfo(walletAddress, loanAmount);
      } catch (error) {
        console.error('❌ Error getting token info:', error);
        throw error;
      }
    },
    [getWalletAddress, viemReader]
  );

  /**
   * Get contract balance (available funds for loans) - using viem
   */
  const getContractBalance = useCallback(async (): Promise<bigint> => {
    try {
      return await viemReader.getContractBalance();
    } catch (error) {
      console.error('❌ Error getting contract balance:', error);
      throw error;
    }
  }, [viemReader]);

  /**
   * Check if user has an active loan - using viem
   */
  const hasActiveLoan = useCallback(
    async (address?: string): Promise<boolean> => {
      try {
        const walletAddress = address || getWalletAddress();
        if (!walletAddress) {
          return false;
        }

        return await viemReader.hasActiveLoan(walletAddress);
      } catch (error) {
        console.error('❌ Error checking active loan:', error);
        return false;
      }
    },
    [getWalletAddress, viemReader]
  );

  return {
    getActiveLoan,
    requestLoan,
    payBackLoan,
    getTokenInfo,
    getContractBalance,
    hasActiveLoan,
  };
};
