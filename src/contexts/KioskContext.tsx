/**
 * KioskContext
 * Monitors loan status and activates kiosk mode for overdue/defaulted loans
 * Polls blockchain every 30 seconds to check loan status
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { usePrivy } from '@privy-io/expo';
import { useActiveLoan } from '@/src/features/wallet/hooks/useLoanQuery';
import { useContractProvider } from '@/src/features/wallet/hooks/useContractProvider';
import { LoanStatus } from '@/src/config/chains.config';
import type { LoanData, FormattedLoanData } from '@/src/features/wallet/types/loan.types';
import { ethers } from 'ethers';

interface KioskContextType {
  isKioskModeActive: boolean;
  lockedLoan: FormattedLoanData | null;
  checkLoanStatus: () => Promise<void>;
  forceCheckLoanStatus: () => void;
}

const KioskContext = createContext<KioskContextType | undefined>(undefined);

export const KioskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isKioskModeActive, setIsKioskModeActive] = useState(false);
  const [lockedLoan, setLockedLoan] = useState<FormattedLoanData | null>(null);

  const { isReady, user } = usePrivy();
  const { getWalletAddress, hasWallet } = useContractProvider();
  const walletAddress = getWalletAddress();

  // Use TanStack Query with 30-second refetch interval
  // Only enabled when Privy is ready and wallet is available
  const {
    data: loanData,
    refetch,
    isError,
    error,
  } = useActiveLoan(walletAddress || undefined, {
    enabled: isReady && !!walletAddress && hasWallet,
  });

  /**
   * Format loan data for UI display
   */
  const formatLoanData = useCallback((loan: LoanData): FormattedLoanData => {
    const amountInMXN = ethers.formatUnits(loan.amount, 18);
    const maxPaymentDate = new Date(Number(loan.maxPaymentDate) * 1000);
    const createdAt = new Date(Number(loan.createdAt) * 1000);
    const now = new Date();

    const daysUntilDue = Math.ceil(
      (maxPaymentDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    const statusTextMap: Record<LoanStatus, string> = {
      [LoanStatus.ACTIVE]: 'Active',
      [LoanStatus.OVERDUE]: 'Overdue',
      [LoanStatus.PAID]: 'Paid',
      [LoanStatus.DEFAULTED]: 'Defaulted',
    };

    const isDeviceLocked =
      loan.status === LoanStatus.OVERDUE || loan.status === LoanStatus.DEFAULTED;

    return {
      amount: parseFloat(amountInMXN).toFixed(2),
      amountWei: loan.amount.toString(),
      maxPaymentDate,
      maxPaymentDateTimestamp: Number(loan.maxPaymentDate),
      status: loan.status,
      statusText: statusTextMap[loan.status],
      createdAt,
      createdAtTimestamp: Number(loan.createdAt),
      isOverdue: loan.isOverdue,
      daysUntilDue,
      isDeviceLocked,
    };
  }, []);

  /**
   * Check loan status and update kiosk mode
   */
  const checkLoanStatus = useCallback(async () => {
    try {
      if (!isReady || !walletAddress || !hasWallet) {
        console.log('⏸️  No wallet available for loan monitoring or Privy not ready');
        return;
      }

      console.log('🔍 Checking loan status for:', walletAddress);

      // Data is automatically fetched by TanStack Query
      if (!loanData) {
        console.log('📭 No active loan found');
        setIsKioskModeActive(false);
        setLockedLoan(null);
        return;
      }

      const formattedLoan = formatLoanData(loanData);

      console.log('📊 Loan status:', {
        amount: formattedLoan.amount,
        status: formattedLoan.statusText,
        isOverdue: formattedLoan.isOverdue,
        daysUntilDue: formattedLoan.daysUntilDue,
      });

      // Activate kiosk mode for OVERDUE or DEFAULTED loans
      if (
        loanData.status === LoanStatus.OVERDUE ||
        loanData.status === LoanStatus.DEFAULTED
      ) {
        console.log('🔒 LOAN OVERDUE/DEFAULTED - ACTIVATING KIOSK MODE');
        setIsKioskModeActive(true);
        setLockedLoan(formattedLoan);
      }
      // Deactivate kiosk mode for ACTIVE or PAID loans
      else if (
        loanData.status === LoanStatus.ACTIVE ||
        loanData.status === LoanStatus.PAID
      ) {
        console.log('🔓 Loan status OK - Kiosk mode not needed');
        setIsKioskModeActive(false);
        setLockedLoan(null);
      }
    } catch (error) {
      console.error('❌ Error checking loan status:', error);
      // Don't disable kiosk mode on error to prevent bypass
    }
  }, [isReady, walletAddress, hasWallet, loanData, formatLoanData]);

  /**
   * Force immediate loan status check (useful after payment)
   */
  const forceCheckLoanStatus = useCallback(() => {
    console.log('🔄 Force checking loan status...');
    refetch();
  }, [refetch]);

  /**
   * Monitor loan status whenever data changes
   */
  useEffect(() => {
    if (loanData) {
      checkLoanStatus();
    }
  }, [loanData, checkLoanStatus]);

  /**
   * Log errors
   */
  useEffect(() => {
    if (isError) {
      console.error('❌ Error fetching loan data:', error);
    }
  }, [isError, error]);

  /**
   * Initial check on mount
   */
  useEffect(() => {
    if (isReady && walletAddress && hasWallet) {
      console.log('🚀 KioskContext initialized for wallet:', walletAddress);
      checkLoanStatus();
    }
  }, [isReady, walletAddress, hasWallet]); // Only run when Privy is ready and wallet changes

  return (
    <KioskContext.Provider
      value={{
        isKioskModeActive,
        lockedLoan,
        checkLoanStatus,
        forceCheckLoanStatus,
      }}
    >
      {children}
    </KioskContext.Provider>
  );
};

export const useKioskContext = () => {
  const context = useContext(KioskContext);
  if (context === undefined) {
    throw new Error('useKioskContext must be used within KioskProvider');
  }
  return context;
};
