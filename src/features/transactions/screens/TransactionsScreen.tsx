import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Colors, commonStyles, typography, spacing, borderRadius } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import TransactionRow from '@/src/shared/components/TransactionRow';
import { TransactionType } from '@/src/types';

export default function TransactionsScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  const [filter, setFilter] = useState<'all' | TransactionType>('all');

  // Mock data
  const transactions = [
    {
      id: '1',
      type: 'bill_payment' as TransactionType,
      amount: 100,
      description: 'CFE Bill Payment',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: '2',
      type: 'loan_disbursement' as TransactionType,
      amount: 100,
      description: 'Loan Approved',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: '3',
      type: 'loan_repayment' as TransactionType,
      amount: 50,
      description: 'Loan Repayment - Telmex',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: '4',
      type: 'wallet_deposit' as TransactionType,
      amount: 200,
      description: 'USDC Deposit',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
  ];

  const filteredTransactions = filter === 'all'
    ? transactions
    : transactions.filter(t => t.type === filter);

  return (
    <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.mainBackground }]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.xl }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: spacing.xl }}>
          <Text style={[typography.primaryTitle, { color: colors.primaryText, marginBottom: spacing.sm }]}>
            Transactions
          </Text>
          <Text style={[typography.bodyText, { color: colors.secondaryText }]}>
            View your transaction history
          </Text>
        </View>

        {/* Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: spacing.xl }}
          contentContainerStyle={{ gap: spacing.md }}
        >
          <FilterChip
            label="All"
            active={filter === 'all'}
            onPress={() => setFilter('all')}
            colors={colors}
          />
          <FilterChip
            label="Loans"
            active={filter === 'loan_disbursement'}
            onPress={() => setFilter('loan_disbursement')}
            colors={colors}
          />
          <FilterChip
            label="Payments"
            active={filter === 'bill_payment'}
            onPress={() => setFilter('bill_payment')}
            colors={colors}
          />
          <FilterChip
            label="Repayments"
            active={filter === 'loan_repayment'}
            onPress={() => setFilter('loan_repayment')}
            colors={colors}
          />
          <FilterChip
            label="Deposits"
            active={filter === 'wallet_deposit'}
            onPress={() => setFilter('wallet_deposit')}
            colors={colors}
          />
        </ScrollView>

        {/* Transactions List */}
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              type={transaction.type}
              amount={transaction.amount}
              description={transaction.description}
              timestamp={transaction.timestamp}
              onPress={() => {}}
            />
          ))
        ) : (
          <View style={{ alignItems: 'center', paddingVertical: spacing.xxxl }}>
            <Ionicons name="receipt-outline" size={64} color={colors.secondaryText} style={{ marginBottom: spacing.lg }} />
            <Text style={[typography.bodyText, { color: colors.secondaryText }]}>
              No transactions found
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function FilterChip({ label, active, onPress, colors }: any) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: active ? colors.accent : colors.uiElements,
        borderRadius: borderRadius.medium,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
      }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[
        typography.subtitle,
        {
          color: active ? colors.mainBackground : colors.primaryText,
          fontWeight: active ? '600' : '400',
        }
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
