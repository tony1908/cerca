import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Colors, commonStyles, typography, spacing, borderRadius, shadows } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import LoanCard from '@/src/shared/components/LoanCard';
import { LoanStatus } from '@/src/types';

export default function ActiveLoansScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  const [filter, setFilter] = useState<'all' | 'active' | 'overdue'>('all');

  // Mock data
  const loans = [
    {
      id: '1',
      amount: 100,
      serviceName: 'CFE - Electricity',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      status: 'active' as LoanStatus,
    },
    {
      id: '2',
      amount: 50,
      serviceName: 'Telmex - Internet',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      status: 'active' as LoanStatus,
    },
    {
      id: '3',
      amount: 75,
      serviceName: 'Sky - TV Service',
      dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: 'overdue' as LoanStatus,
    },
    {
      id: '4',
      amount: 120,
      serviceName: 'Water Services',
      dueDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      status: 'paid' as LoanStatus,
    },
  ];

  const filteredLoans = loans.filter(loan => {
    if (filter === 'all') return true;
    if (filter === 'active') return loan.status === 'active';
    if (filter === 'overdue') return loan.status === 'overdue';
    return true;
  });

  const activeLoanCount = loans.filter(l => l.status === 'active').length;
  const overdueLoanCount = loans.filter(l => l.status === 'overdue').length;
  const totalOwed = loans
    .filter(l => l.status === 'active' || l.status === 'overdue')
    .reduce((sum, l) => sum + l.amount, 0);

  return (
    <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.mainBackground }]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.xl }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: spacing.xl }}>
          <Text style={[typography.primaryTitle, { color: colors.primaryText, marginBottom: spacing.sm }]}>
            My Loans
          </Text>
          <Text style={[typography.bodyText, { color: colors.secondaryText }]}>
            {activeLoanCount} active loan{activeLoanCount !== 1 ? 's' : ''}
            {overdueLoanCount > 0 && `, ${overdueLoanCount} overdue`}
          </Text>
        </View>

        {/* Summary Card */}
        <View style={[
          shadows.standard,
          {
            backgroundColor: colors.uiElements,
            borderRadius: borderRadius.medium,
            padding: spacing.lg,
            marginBottom: spacing.xl,
          }
        ]}>
          <Text style={[typography.subtitle, { color: colors.secondaryText, marginBottom: spacing.sm }]}>
            Total Outstanding
          </Text>
          <Text style={[typography.hero, { color: colors.accent }]}>
            ${totalOwed.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>
        </View>

        {/* Filter Tabs */}
        <View style={{ flexDirection: 'row', gap: spacing.md, marginBottom: spacing.xl }}>
          <FilterTab
            label="All"
            count={loans.length}
            active={filter === 'all'}
            onPress={() => setFilter('all')}
            colors={colors}
          />
          <FilterTab
            label="Active"
            count={activeLoanCount}
            active={filter === 'active'}
            onPress={() => setFilter('active')}
            colors={colors}
          />
          <FilterTab
            label="Overdue"
            count={overdueLoanCount}
            active={filter === 'overdue'}
            onPress={() => setFilter('overdue')}
            colors={colors}
          />
        </View>

        {/* Loans List */}
        {filteredLoans.length > 0 ? (
          filteredLoans.map((loan) => (
            <LoanCard
              key={loan.id}
              amount={loan.amount}
              serviceName={loan.serviceName}
              dueDate={loan.dueDate}
              status={loan.status}
              onPress={() => {}}
            />
          ))
        ) : (
          <View style={{ alignItems: 'center', paddingVertical: spacing.xxxl }}>
            <Ionicons name="document-text-outline" size={64} color={colors.secondaryText} style={{ marginBottom: spacing.lg }} />
            <Text style={[typography.sectionHeader, { color: colors.primaryText, marginBottom: spacing.sm }]}>
              No loans found
            </Text>
            <Text style={[typography.bodyText, { color: colors.secondaryText, textAlign: 'center' }]}>
              {filter === 'all'
                ? 'You don\'t have any loans yet'
                : `No ${filter} loans at the moment`}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function FilterTab({ label, count, active, onPress, colors }: any) {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: active ? colors.accent : colors.uiElements,
        borderRadius: borderRadius.medium,
        paddingVertical: spacing.md,
        alignItems: 'center',
      }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[
        typography.bodyText,
        {
          color: active ? colors.mainBackground : colors.primaryText,
          fontWeight: '600',
        }
      ]}>
        {label}
      </Text>
      <Text style={[
        typography.subtitle,
        {
          color: active ? colors.mainBackground : colors.secondaryText,
          marginTop: spacing.xs,
        }
      ]}>
        {count}
      </Text>
    </TouchableOpacity>
  );
}
