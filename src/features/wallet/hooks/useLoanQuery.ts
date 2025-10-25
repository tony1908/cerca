/**
 * useLoanQuery Hooks
 * TanStack Query hooks for loan operations with caching and state management
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLoanContract } from './useLoanContract';
import { useContractProvider } from './useContractProvider';
import type { LoanData, TokenInfo } from '../types/loan.types';

/**
 * Query keys for loan operations
 */
export const loanQueryKeys = {
  all: ['loan'] as const,
  active: (address: string) => ['loan', 'active', address] as const,
  tokenInfo: (address: string, amount?: string) =>
    ['loan', 'tokenInfo', address, amount] as const,
  contractBalance: () => ['loan', 'contractBalance'] as const,
  hasActive: (address: string) => ['loan', 'hasActive', address] as const,
};

/**
 * Hook to fetch active loan data
 */
export const useActiveLoan = (address?: string, options?: { enabled?: boolean }) => {
  const { getActiveLoan } = useLoanContract();
  const { getWalletAddress } = useContractProvider();

  const walletAddress = address || getWalletAddress();

  return useQuery({
    queryKey: loanQueryKeys.active(walletAddress || ''),
    queryFn: () => getActiveLoan(walletAddress || undefined),
    enabled: !!walletAddress && (options?.enabled !== false),
    staleTime: 30000, // 30 seconds
    refetchInterval: 30000, // Refetch every 30 seconds for loan monitoring
    retry: 3,
  });
};

/**
 * Hook to fetch user's token balance and allowance
 */
export const useTokenInfo = (loanAmount?: bigint) => {
  const { getTokenInfo } = useLoanContract();
  const { getWalletAddress } = useContractProvider();

  const walletAddress = getWalletAddress();

  return useQuery({
    queryKey: loanQueryKeys.tokenInfo(
      walletAddress || '',
      loanAmount?.toString()
    ),
    queryFn: () => getTokenInfo(loanAmount),
    enabled: !!walletAddress,
    staleTime: 15000, // 15 seconds
  });
};

/**
 * Hook to fetch contract balance
 */
export const useContractBalance = () => {
  const { getContractBalance } = useLoanContract();

  return useQuery({
    queryKey: loanQueryKeys.contractBalance(),
    queryFn: getContractBalance,
    staleTime: 60000, // 1 minute
  });
};

/**
 * Hook to check if user has an active loan
 */
export const useHasActiveLoan = (address?: string) => {
  const { hasActiveLoan } = useLoanContract();
  const { getWalletAddress } = useContractProvider();

  const walletAddress = address || getWalletAddress();

  return useQuery({
    queryKey: loanQueryKeys.hasActive(walletAddress || ''),
    queryFn: () => hasActiveLoan(walletAddress || undefined),
    enabled: !!walletAddress,
    staleTime: 30000, // 30 seconds
  });
};

/**
 * Mutation hook for requesting a loan
 */
export const useRequestLoan = () => {
  const { requestLoan } = useLoanContract();
  const { getWalletAddress } = useContractProvider();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      amount,
      maxPaymentDate,
    }: {
      amount: bigint;
      maxPaymentDate: bigint;
    }) => {
      return await requestLoan(amount, maxPaymentDate);
    },
    onSuccess: () => {
      // Invalidate loan queries to refetch data
      const walletAddress = getWalletAddress();
      if (walletAddress) {
        queryClient.invalidateQueries({
          queryKey: loanQueryKeys.active(walletAddress),
        });
        queryClient.invalidateQueries({
          queryKey: loanQueryKeys.hasActive(walletAddress),
        });
      }
      queryClient.invalidateQueries({
        queryKey: loanQueryKeys.contractBalance(),
      });
    },
    retry: false, // Don't retry failed loan requests
  });
};

/**
 * Mutation hook for paying back a loan
 */
export const usePayBackLoan = () => {
  const { payBackLoan } = useLoanContract();
  const { getWalletAddress } = useContractProvider();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (amount: bigint) => {
      return await payBackLoan(amount);
    },
    onSuccess: () => {
      // Invalidate all loan-related queries
      const walletAddress = getWalletAddress();
      if (walletAddress) {
        queryClient.invalidateQueries({
          queryKey: loanQueryKeys.active(walletAddress),
        });
        queryClient.invalidateQueries({
          queryKey: loanQueryKeys.hasActive(walletAddress),
        });
        queryClient.invalidateQueries({
          queryKey: loanQueryKeys.tokenInfo(walletAddress),
        });
      }
      queryClient.invalidateQueries({
        queryKey: loanQueryKeys.contractBalance(),
      });
    },
    retry: false, // Don't retry failed payments
  });
};

/**
 * Hook to manually refetch active loan (useful for kiosk mode)
 */
export const useRefetchActiveLoan = () => {
  const { getWalletAddress } = useContractProvider();
  const queryClient = useQueryClient();

  return () => {
    const walletAddress = getWalletAddress();
    if (walletAddress) {
      return queryClient.invalidateQueries({
        queryKey: loanQueryKeys.active(walletAddress),
      });
    }
  };
};
