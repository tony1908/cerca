import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, commonStyles, typography, spacing, borderRadius, shadows } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import ActionButton from '@/src/shared/components/ActionButton';
import StatusBadge from '@/src/shared/components/StatusBadge';

export default function TransactionDetailScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  const transaction = {
    id: 'TXN001',
    type: 'bill_payment',
    amount: 100,
    status: 'completed',
    description: 'CFE Bill Payment',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    transactionHash: '0x1234...5678',
    serviceName: 'CFE - Electricity',
    referenceNumber: '1234567890123456',
  };

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
            <Ionicons name="receipt" size={40} color={colors.accent} />
          </View>

          <StatusBadge status={transaction.status as any} />

          <Text style={[typography.hero, { color: colors.primaryText, marginTop: spacing.md }]}>
            ${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>
          <Text style={[typography.bodyText, { color: colors.secondaryText, marginTop: spacing.sm }]}>
            {transaction.description}
          </Text>
        </View>

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
            Transaction Details
          </Text>

          <DetailRow label="Transaction ID" value={transaction.id} colors={colors} />
          <DetailRow label="Type" value="Bill Payment" colors={colors} />
          <DetailRow label="Date" value={transaction.timestamp.toLocaleString('en-US')} colors={colors} />
          <DetailRow label="Service" value={transaction.serviceName} colors={colors} />
          <DetailRow label="Reference" value={transaction.referenceNumber} colors={colors} />
          <DetailRow label="Hash" value={transaction.transactionHash} colors={colors} isLast />
        </View>

        <ActionButton
          title="Download Receipt"
          icon="download"
          onPress={() => {}}
          variant="primary"
        />

        <View style={{ height: spacing.md }} />

        <ActionButton
          title="Share"
          icon="share"
          onPress={() => {}}
          variant="secondary"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function DetailRow({ label, value, colors, isLast = false }: any) {
  return (
    <View style={{ marginBottom: isLast ? 0 : spacing.lg }}>
      <Text style={[typography.subtitle, { color: colors.secondaryText, marginBottom: spacing.xs }]}>
        {label}
      </Text>
      <Text style={[typography.bodyText, { color: colors.primaryText }]}>
        {value}
      </Text>
    </View>
  );
}
