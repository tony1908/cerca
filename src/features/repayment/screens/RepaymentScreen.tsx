import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Colors, commonStyles, typography, spacing, borderRadius, shadows } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import AmountInput from '@/src/shared/components/AmountInput';
import ActionButton from '@/src/shared/components/ActionButton';
import StatusBadge from '@/src/shared/components/StatusBadge';

export default function RepaymentScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  const [selectedLoanId, setSelectedLoanId] = useState<string | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentType, setPaymentType] = useState<'full' | 'partial'>('full');

  // Mock data
  const activeLoans = [
    {
      id: '1',
      serviceName: 'CFE - Electricity',
      amount: 100,
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      status: 'active' as const,
    },
    {
      id: '2',
      serviceName: 'Telmex - Internet',
      amount: 50,
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      status: 'active' as const,
    },
  ];

  const walletBalance = 250; // Mock USDC balance
  const selectedLoan = activeLoans.find(l => l.id === selectedLoanId);
  const parsedAmount = parseFloat(paymentAmount) || 0;

  return (
    <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.mainBackground }]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.xl }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: spacing.xl }}>
          <Text style={[typography.primaryTitle, { color: colors.primaryText, marginBottom: spacing.sm }]}>
            Repay Loan
          </Text>
          <Text style={[typography.bodyText, { color: colors.secondaryText }]}>
            Select a loan to repay
          </Text>
        </View>

        {/* Wallet Balance */}
        <View style={[
          shadows.standard,
          {
            backgroundColor: colors.uiElements,
            borderRadius: borderRadius.medium,
            padding: spacing.lg,
            marginBottom: spacing.xl,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }
        ]}>
          <View>
            <Text style={[typography.subtitle, { color: colors.secondaryText, marginBottom: spacing.xs }]}>
              USDC Wallet Balance
            </Text>
            <Text style={[typography.sectionHeader, { color: colors.accent }]}>
              ${walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: colors.mainBackground,
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.sm,
              borderRadius: borderRadius.small,
            }}
            onPress={() => {}}
          >
            <Text style={[typography.subtitle, { color: colors.accent }]}>
              Add Funds
            </Text>
          </TouchableOpacity>
        </View>

        {/* Select Loan */}
        <View style={{ marginBottom: spacing.xl }}>
          <Text style={[typography.sectionHeader, { color: colors.primaryText, marginBottom: spacing.lg }]}>
            Select Loan to Repay
          </Text>

          {activeLoans.map((loan) => (
            <LoanSelectionCard
              key={loan.id}
              loan={loan}
              selected={selectedLoanId === loan.id}
              onPress={() => setSelectedLoanId(loan.id)}
              colors={colors}
            />
          ))}
        </View>

        {/* Payment Type Selection */}
        {selectedLoan && (
          <>
            <View style={{ marginBottom: spacing.xl }}>
              <Text style={[typography.sectionHeader, { color: colors.primaryText, marginBottom: spacing.lg }]}>
                Payment Type
              </Text>

              <View style={{ flexDirection: 'row', gap: spacing.md }}>
                <PaymentTypeButton
                  title="Full Payment"
                  amount={selectedLoan.amount}
                  selected={paymentType === 'full'}
                  onPress={() => {
                    setPaymentType('full');
                    setPaymentAmount(selectedLoan.amount.toString());
                  }}
                  colors={colors}
                />
                <PaymentTypeButton
                  title="Partial Payment"
                  amount={null}
                  selected={paymentType === 'partial'}
                  onPress={() => {
                    setPaymentType('partial');
                    setPaymentAmount('');
                  }}
                  colors={colors}
                />
              </View>
            </View>

            {/* Amount Input (for partial payment) */}
            {paymentType === 'partial' && (
              <AmountInput
                value={paymentAmount}
                onChangeText={setPaymentAmount}
                label="Payment Amount"
                maxAmount={selectedLoan.amount}
                placeholder="0.00"
              />
            )}

            {/* Payment Summary */}
            <View style={[
              shadows.standard,
              {
                backgroundColor: colors.uiElements,
                borderRadius: borderRadius.medium,
                padding: spacing.lg,
                marginBottom: spacing.xl,
              }
            ]}>
              <Text style={[typography.sectionHeader, { color: colors.primaryText, marginBottom: spacing.lg }]}>
                Payment Summary
              </Text>

              <SummaryRow
                label="Loan Amount"
                value={`$${selectedLoan.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                colors={colors}
              />
              <SummaryRow
                label="Payment Amount"
                value={`$${parsedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                colors={colors}
              />

              <View style={{ height: 1, backgroundColor: colors.mainBackground, marginVertical: spacing.lg }} />

              <SummaryRow
                label="Remaining Balance"
                value={`$${(selectedLoan.amount - parsedAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                colors={colors}
                highlight
              />
            </View>

            {/* Warning if insufficient balance */}
            {parsedAmount > walletBalance && (
              <View style={[
                {
                  backgroundColor: colors.uiElements,
                  borderRadius: borderRadius.medium,
                  padding: spacing.lg,
                  marginBottom: spacing.xl,
                  borderLeftWidth: 4,
                  borderLeftColor: '#FF6B6B',
                }
              ]}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <Ionicons name="warning" size={20} color="#FF6B6B" style={{ marginRight: spacing.md, marginTop: 2 }} />
                  <Text style={[typography.subtitle, { color: colors.secondaryText, flex: 1, lineHeight: 20 }]}>
                    Insufficient balance. Please add funds to your wallet before proceeding.
                  </Text>
                </View>
              </View>
            )}

            <ActionButton
              title="Confirm Payment"
              icon="checkmark-circle"
              onPress={() => {}}
              variant="primary"
              disabled={parsedAmount === 0 || parsedAmount > walletBalance || parsedAmount > selectedLoan.amount}
            />

            <View style={{ height: spacing.xl }} />

            <ActionButton
              title="Cancel"
              onPress={() => {}}
              variant="outline"
            />
          </>
        )}

        {!selectedLoan && (
          <View style={{ alignItems: 'center', paddingVertical: spacing.xxxl }}>
            <Ionicons name="cash-outline" size={64} color={colors.secondaryText} style={{ marginBottom: spacing.lg }} />
            <Text style={[typography.bodyText, { color: colors.secondaryText, textAlign: 'center' }]}>
              Select a loan above to begin repayment
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function LoanSelectionCard({ loan, selected, onPress, colors }: any) {
  const daysRemaining = Math.ceil((loan.dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <TouchableOpacity
      style={[
        shadows.standard,
        {
          backgroundColor: selected ? colors.accent : colors.uiElements,
          borderRadius: borderRadius.medium,
          padding: spacing.lg,
          marginBottom: spacing.md,
        }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.md }}>
        <View style={{ flex: 1 }}>
          <Text style={[
            typography.bodyText,
            {
              color: selected ? colors.mainBackground : colors.primaryText,
              marginBottom: spacing.xs,
            }
          ]}>
            {loan.serviceName}
          </Text>
          <Text style={[
            typography.sectionHeader,
            { color: selected ? colors.mainBackground : colors.accent }
          ]}>
            ${loan.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>
        </View>
        {selected ? (
          <Ionicons name="checkmark-circle" size={24} color={colors.mainBackground} />
        ) : (
          <StatusBadge status={loan.status} />
        )}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons
          name="calendar-outline"
          size={16}
          color={selected ? colors.mainBackground : colors.secondaryText}
          style={{ opacity: 0.8 }}
        />
        <Text style={[
          typography.subtitle,
          {
            color: selected ? colors.mainBackground : colors.secondaryText,
            marginLeft: spacing.xs,
            opacity: 0.8,
          }
        ]}>
          Due in {daysRemaining} days
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function PaymentTypeButton({ title, amount, selected, onPress, colors }: any) {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: selected ? colors.accent : colors.uiElements,
        borderRadius: borderRadius.medium,
        padding: spacing.lg,
        alignItems: 'center',
      }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[
        typography.bodyText,
        {
          color: selected ? colors.mainBackground : colors.primaryText,
          fontWeight: '600',
          marginBottom: spacing.xs,
        }
      ]}>
        {title}
      </Text>
      {amount !== null && (
        <Text style={[
          typography.subtitle,
          { color: selected ? colors.mainBackground : colors.secondaryText }
        ]}>
          ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Text>
      )}
    </TouchableOpacity>
  );
}

function SummaryRow({ label, value, colors, highlight = false }: any) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md }}>
      <Text style={[typography.bodyText, { color: colors.secondaryText }]}>
        {label}
      </Text>
      <Text style={[
        highlight ? typography.sectionHeader : typography.bodyText,
        { color: highlight ? colors.accent : colors.primaryText }
      ]}>
        {value}
      </Text>
    </View>
  );
}
