import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Colors, commonStyles, typography, spacing, borderRadius, shadows } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import AmountInput from '@/src/shared/components/AmountInput';
import ActionButton from '@/src/shared/components/ActionButton';

export default function LoanRequestScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  const [amount, setAmount] = useState('');

  const availableCredit = 350;
  const parsedAmount = parseFloat(amount) || 0;
  const repaymentDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return (
    <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.mainBackground }]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.xl }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignItems: 'center', marginBottom: spacing.xxxl }}>
          <View style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: colors.uiElements,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: spacing.lg,
          }}>
            <Ionicons name="cash-outline" size={40} color={colors.accent} />
          </View>

          <Text style={[typography.primaryTitle, { color: colors.primaryText, marginBottom: spacing.sm }]}>
            Request a Loan
          </Text>
          <Text style={[typography.bodyText, { color: colors.secondaryText, textAlign: 'center' }]}>
            How much do you need for your bill?
          </Text>
        </View>

        {/* Available Credit Banner */}
        <View style={[
          shadows.standard,
          {
            backgroundColor: colors.uiElements,
            borderRadius: borderRadius.medium,
            padding: spacing.lg,
            marginBottom: spacing.xxxl,
            alignItems: 'center',
          }
        ]}>
          <Text style={[typography.subtitle, { color: colors.secondaryText, marginBottom: spacing.xs }]}>
            Available Credit
          </Text>
          <Text style={[typography.hero, { color: colors.accent }]}>
            ${availableCredit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>
        </View>

        {/* Amount Input */}
        <AmountInput
          value={amount}
          onChangeText={setAmount}
          label="Loan Amount"
          maxAmount={availableCredit}
          placeholder="0.00"
        />

        {/* Quick Amount Selection */}
        <View style={{ marginBottom: spacing.xxxl }}>
          <Text style={[typography.bodyText, { color: colors.primaryText, marginBottom: spacing.md }]}>
            Quick Select
          </Text>
          <View style={{ flexDirection: 'row', gap: spacing.md }}>
            {[50, 100, 200].map((value) => (
              <QuickAmountButton
                key={value}
                amount={value}
                onPress={() => setAmount(value.toString())}
                colors={colors}
              />
            ))}
          </View>
        </View>

        {/* Loan Details */}
        {parsedAmount > 0 && (
          <View style={[
            shadows.standard,
            {
              backgroundColor: colors.uiElements,
              borderRadius: borderRadius.medium,
              padding: spacing.lg,
              marginBottom: spacing.xxxl,
            }
          ]}>
            <Text style={[typography.sectionHeader, { color: colors.primaryText, marginBottom: spacing.lg }]}>
              Loan Details
            </Text>

            <DetailRow
              label="Loan Amount"
              value={`$${parsedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              colors={colors}
            />
            <DetailRow
              label="Repayment Period"
              value="7 days"
              colors={colors}
            />
            <DetailRow
              label="Due Date"
              value={repaymentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              colors={colors}
            />

            <View style={{ height: 1, backgroundColor: colors.mainBackground, marginVertical: spacing.lg }} />

            <DetailRow
              label="Amount to Repay"
              value={`$${parsedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              colors={colors}
              highlight
            />
          </View>
        )}

        {/* Warning */}
        <View style={[
          {
            backgroundColor: colors.uiElements,
            borderRadius: borderRadius.medium,
            padding: spacing.lg,
            marginBottom: spacing.xl,
            borderLeftWidth: 4,
            borderLeftColor: '#FFA726',
          }
        ]}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <Ionicons name="warning" size={20} color="#FFA726" style={{ marginRight: spacing.md, marginTop: 2 }} />
            <Text style={[typography.subtitle, { color: colors.secondaryText, flex: 1, lineHeight: 20 }]}>
              Please ensure you can repay this loan within 7 days. Failure to repay may result in device restrictions.
            </Text>
          </View>
        </View>

        <ActionButton
          title="Continue to Service Selection"
          icon="arrow-forward"
          onPress={() => {}}
          variant="primary"
          disabled={parsedAmount === 0 || parsedAmount > availableCredit}
        />

        <View style={{ height: spacing.xl }} />

        <ActionButton
          title="Cancel"
          onPress={() => {}}
          variant="outline"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function QuickAmountButton({ amount, onPress, colors }: any) {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: colors.mainBackground,
        borderRadius: borderRadius.medium,
        paddingVertical: spacing.md,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.uiElements,
      }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[typography.bodyText, { color: colors.primaryText, fontWeight: '600' }]}>
        ${amount}
      </Text>
    </TouchableOpacity>
  );
}

function DetailRow({ label, value, colors, highlight = false }: any) {
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
