import { View, Text } from 'react-native';
import { Colors, typography, spacing, borderRadius, shadows } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';

interface CreditLineCardProps {
  totalAmount: number;
  availableAmount: number;
  usedAmount: number;
  nextPaymentDue?: Date;
}

export default function CreditLineCard({
  totalAmount,
  availableAmount,
  usedAmount,
  nextPaymentDue
}: CreditLineCardProps) {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  const usagePercentage = (usedAmount / totalAmount) * 100;

  return (
    <View style={[
      shadows.convex,
      {
        backgroundColor: colors.accent,
        borderRadius: borderRadius.large,
        padding: spacing.xl,
        marginBottom: spacing.xl,
      }
    ]}>
      <Text style={[typography.subtitle, { color: '#000000', marginBottom: spacing.sm }]}>
        Credit Line
      </Text>

      <Text style={[typography.hero, { color: '#000000', marginBottom: spacing.md }]}>
        ${availableAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </Text>

      <Text style={[typography.subtitle, { color: '#000000', marginBottom: spacing.lg }]}>
        Available of ${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </Text>

      {/* Progress Bar */}
      <View style={{
        height: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: borderRadius.small,
        overflow: 'hidden',
        marginBottom: spacing.md,
      }}>
        <View style={{
          height: '100%',
          width: `${usagePercentage}%`,
          backgroundColor: '#000000',
          borderRadius: borderRadius.small,
        }} />
      </View>

      {nextPaymentDue && (
        <Text style={[typography.subtitle, { color: '#000000' }]}>
          Next payment: {nextPaymentDue.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </Text>
      )}
    </View>
  );
}
