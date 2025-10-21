// Core data types for Cerca app

export type KYCStatus = 'pending' | 'verified' | 'rejected';
export type CreditLineStatus = 'active' | 'suspended' | 'locked';
export type LoanStatus = 'pending' | 'active' | 'paid' | 'overdue' | 'defaulted';
export type BillPaymentStatus = 'pending' | 'processing' | 'completed' | 'failed';
export type TransactionType = 'loan_disbursement' | 'bill_payment' | 'loan_repayment' | 'wallet_deposit' | 'wallet_withdrawal';
export type TransactionStatus = 'pending' | 'completed' | 'failed';
export type ServiceType = 'CFE' | 'AGUA' | 'TELMEX' | 'SKY' | 'IZZI' | 'TOTALPLAY' | 'GAS' | 'OTHER';
export type Language = 'en' | 'es';

export interface DeviceInfo {
  model: string;
  imei: string;
  evaluatedValue: number;
  verificationDate: Date;
  isLocked: boolean;
}

export interface CreditLine {
  totalAmount: number;
  availableAmount: number;
  usedAmount: number;
  status: CreditLineStatus;
}

export interface UserProfile {
  id: string;
  walletAddress: string;
  phoneNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  kycStatus: KYCStatus;
  deviceInfo: DeviceInfo;
  creditLine: CreditLine;
  preferredLanguage: Language;
  createdAt: Date;
}

export interface BillPayment {
  serviceType: ServiceType;
  serviceName: string;
  referenceNumber: string;
  accountHolder?: string;
  amount: number;
  status: BillPaymentStatus;
  receipt?: string;
  paidAt?: Date;
}

export interface Repayment {
  id: string;
  loanId: string;
  amount: number;
  date: Date;
  transactionHash: string;
}

export interface Loan {
  id: string;
  userId: string;
  amount: number;
  purpose: 'bill_payment';
  billDetails: BillPayment;
  status: LoanStatus;
  createdAt: Date;
  dueDate: Date;
  paidAt?: Date;
  repayments: Repayment[];
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  timestamp: Date;
  description: string;
  metadata?: any;
  transactionHash?: string;
}

export interface BillService {
  id: string;
  type: ServiceType;
  name: string;
  logo?: string;
  referenceFormat: string;
  referenceExample: string;
  isPopular: boolean;
}

export interface Notification {
  id: string;
  type: 'payment_reminder' | 'device_lock_warning' | 'transaction_completed' | 'loan_approved';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  metadata?: any;
}
