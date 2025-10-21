import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, commonStyles, typography, spacing, borderRadius, shadows } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import ActionButton from '@/src/shared/components/ActionButton';

export default function LoanConfirmScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  const [termsAccepted, setTermsAccepted] = useState(false);

  // Mock data
  const loanDetails = {
    amount: 100,
    serviceName: 'CFE - Electricity',
    referenceNumber: '1234567890123456',
    accountHolder: 'Juan Pérez',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    repaymentPeriod: '7 days',
  };

  return (
    <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.mainBackground }]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.xl }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: spacing.xl }}>
          <Text style={[typography.primaryTitle, { color: colors.primaryText, marginBottom: spacing.sm }]}>
            Review & Confirm
          </Text>
          <Text style={[typography.bodyText, { color: colors.secondaryText }]}>
            Please review your loan details carefully
          </Text>
        </View>

        {/* Loan Amount Card */}
        <View style={[
          shadows.convex,
          { borderRadius: borderRadius.large, overflow: 'hidden', marginBottom: spacing.xl }
        ]}>
          <LinearGradient
            colors={[colors.accent, '#FF9AA2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ padding: spacing.xl, alignItems: 'center' }}
          >
            <Text style={[typography.subtitle, { color: colors.mainBackground, marginBottom: spacing.sm }]}>
              Loan Amount
            </Text>
            <Text style={[typography.hero, { color: colors.mainBackground, fontSize: 48 }]}>
              ${loanDetails.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Text>
          </LinearGradient>
        </View>

        {/* Bill Details */}
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
            Bill Payment Details
          </Text>

          <DetailRow
            icon="business"
            label="Service Provider"
            value={loanDetails.serviceName}
            colors={colors}
          />
          <DetailRow
            icon="keypad"
            label="Reference Number"
            value={loanDetails.referenceNumber}
            colors={colors}
          />
          <DetailRow
            icon="person"
            label="Account Holder"
            value={loanDetails.accountHolder}
            colors={colors}
            isLast
          />
        </View>

        {/* Repayment Details */}
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
            Repayment Information
          </Text>

          <DetailRow
            icon="time"
            label="Repayment Period"
            value={loanDetails.repaymentPeriod}
            colors={colors}
          />
          <DetailRow
            icon="calendar"
            label="Due Date"
            value={loanDetails.dueDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            colors={colors}
          />

          <View style={{ height: 1, backgroundColor: colors.mainBackground, marginVertical: spacing.lg }} />

          <DetailRow
            icon="cash"
            label="Total to Repay"
            value={`$${loanDetails.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            colors={colors}
            highlight
            isLast
          />
        </View>

        {/* Terms & Conditions */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginBottom: spacing.xl,
          }}
          onPress={() => setTermsAccepted(!termsAccepted)}
          activeOpacity={0.7}
        >
          <View style={{
            width: 24,
            height: 24,
            borderRadius: 6,
            borderWidth: 2,
            borderColor: termsAccepted ? colors.accent : colors.secondaryText,
            backgroundColor: termsAccepted ? colors.accent : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: spacing.md,
            marginTop: 2,
          }}>
            {termsAccepted && (
              <Ionicons name="checkmark" size={16} color={colors.mainBackground} />
            )}
          </View>
          <Text style={[typography.bodyText, { color: colors.primaryText, flex: 1, lineHeight: 22 }]}>
            I understand that failure to repay this loan within {loanDetails.repaymentPeriod} may result in device restrictions
          </Text>
        </TouchableOpacity>

        {/* Warning */}
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
              Your device is being used as collateral for this loan. Please ensure you can meet the repayment deadline.
            </Text>
          </View>
        </View>

        <ActionButton
          title="Confirm Loan"
          icon="checkmark-circle"
          onPress={() => {}}
          variant="primary"
          disabled={!termsAccepted}
        />

        <View style={{ height: spacing.xl }} />

        <ActionButton
          title="Back to Edit"
          onPress={() => {}}
          variant="outline"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function DetailRow({ icon, label, value, colors, highlight = false, isLast = false }: any) {
  return (
    <View style={{ marginBottom: isLast ? 0 : spacing.lg }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <Ionicons name={icon} size={20} color={highlight ? colors.accent : colors.secondaryText} style={{ marginRight: spacing.md, marginTop: 2 }} />
        <View style={{ flex: 1 }}>
          <Text style={[typography.subtitle, { color: colors.secondaryText, marginBottom: spacing.xs }]}>
            {label}
          </Text>
          <Text style={[
            highlight ? typography.sectionHeader : typography.bodyText,
            { color: highlight ? colors.accent : colors.primaryText }
          ]}>
            {value}
          </Text>
        </View>
      </View>
    </View>
  );
}
