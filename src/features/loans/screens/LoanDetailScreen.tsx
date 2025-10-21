import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, commonStyles, typography, spacing, borderRadius, shadows } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import ActionButton from '@/src/shared/components/ActionButton';
import StatusBadge from '@/src/shared/components/StatusBadge';
import { LoanStatus } from '@/src/types';

export default function LoanDetailScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  // Mock data
  const loan = {
    id: '1',
    amount: 100,
    serviceName: 'CFE - Electricity',
    referenceNumber: '1234567890123456',
    accountHolder: 'Juan Pérez',
    status: 'active' as LoanStatus,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    paidAmount: 0,
    remainingAmount: 100,
  };

  const daysRemaining = Math.ceil((loan.dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.mainBackground }]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.xl }}
        showsVerticalScrollIndicator={false}
      >
        {/* Amount Card */}
        <View style={[
          shadows.convex,
          { borderRadius: borderRadius.large, overflow: 'hidden', marginBottom: spacing.xl }
        ]}>
          <LinearGradient
            colors={[colors.accent, '#FF9AA2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ padding: spacing.xl }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.md }}>
              <View>
                <Text style={[typography.subtitle, { color: colors.mainBackground, opacity: 0.9, marginBottom: spacing.sm }]}>
                  Amount Owed
                </Text>
                <Text style={[typography.hero, { color: colors.mainBackground, fontSize: 42 }]}>
                  ${loan.remainingAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Text>
              </View>
              <StatusBadge status={loan.status} />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="time" size={16} color={colors.mainBackground} style={{ marginRight: spacing.xs }} />
              <Text style={[typography.subtitle, { color: colors.mainBackground, opacity: 0.9 }]}>
                {daysRemaining} days remaining
              </Text>
            </View>
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
            Bill Details
          </Text>

          <DetailRow
            icon="business"
            label="Service Provider"
            value={loan.serviceName}
            colors={colors}
          />
          <DetailRow
            icon="keypad"
            label="Reference Number"
            value={loan.referenceNumber}
            colors={colors}
          />
          <DetailRow
            icon="person"
            label="Account Holder"
            value={loan.accountHolder}
            colors={colors}
            isLast
          />
        </View>

        {/* Timeline */}
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
            Timeline
          </Text>

          <TimelineItem
            icon="checkmark-circle"
            title="Loan Created"
            date={loan.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            completed
            colors={colors}
          />
          <TimelineItem
            icon="card"
            title="Bill Payment Processed"
            date={loan.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            completed
            colors={colors}
          />
          <TimelineItem
            icon="calendar"
            title="Payment Due"
            date={loan.dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            completed={false}
            colors={colors}
            isLast
          />
        </View>

        {/* Payment Breakdown */}
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
            Payment Breakdown
          </Text>

          <BreakdownRow
            label="Original Amount"
            value={`$${loan.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            colors={colors}
          />
          <BreakdownRow
            label="Paid"
            value={`$${loan.paidAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            colors={colors}
          />

          <View style={{ height: 1, backgroundColor: colors.mainBackground, marginVertical: spacing.lg }} />

          <BreakdownRow
            label="Remaining"
            value={`$${loan.remainingAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            colors={colors}
            highlight
          />
        </View>

        {/* Actions */}
        <ActionButton
          title="Make Payment"
          icon="cash"
          onPress={() => {}}
          variant="primary"
        />

        <View style={{ height: spacing.md }} />

        <ActionButton
          title="View Receipt"
          icon="document-text"
          onPress={() => {}}
          variant="secondary"
        />

        <View style={{ height: spacing.md }} />

        <ActionButton
          title="Need Help?"
          icon="help-circle"
          onPress={() => {}}
          variant="outline"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function DetailRow({ icon, label, value, colors, isLast = false }: any) {
  return (
    <View style={{ marginBottom: isLast ? 0 : spacing.lg }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <Ionicons name={icon} size={20} color={colors.secondaryText} style={{ marginRight: spacing.md, marginTop: 2 }} />
        <View style={{ flex: 1 }}>
          <Text style={[typography.subtitle, { color: colors.secondaryText, marginBottom: spacing.xs }]}>
            {label}
          </Text>
          <Text style={[typography.bodyText, { color: colors.primaryText }]}>
            {value}
          </Text>
        </View>
      </View>
    </View>
  );
}

function TimelineItem({ icon, title, date, completed, colors, isLast = false }: any) {
  return (
    <View style={{ flexDirection: 'row', marginBottom: isLast ? 0 : spacing.lg }}>
      <View style={{ alignItems: 'center', marginRight: spacing.md }}>
        <View style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: completed ? colors.accent : colors.mainBackground,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Ionicons name={icon} size={18} color={completed ? colors.mainBackground : colors.secondaryText} />
        </View>
        {!isLast && (
          <View style={{
            width: 2,
            flex: 1,
            backgroundColor: colors.mainBackground,
            marginVertical: spacing.xs,
          }} />
        )}
      </View>
      <View style={{ flex: 1, paddingBottom: isLast ? 0 : spacing.md }}>
        <Text style={[typography.bodyText, { color: colors.primaryText, marginBottom: spacing.xs }]}>
          {title}
        </Text>
        <Text style={[typography.subtitle, { color: colors.secondaryText }]}>
          {date}
        </Text>
      </View>
    </View>
  );
}

function BreakdownRow({ label, value, colors, highlight = false }: any) {
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
