import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, typography, spacing, borderRadius, shadows } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import { LoanStatus } from '@/src/types';
import StatusBadge from './StatusBadge';

interface LoanCardProps {
  amount: number;
  serviceName: string;
  dueDate: Date;
  status: LoanStatus;
  onPress?: () => void;
}

export default function LoanCard({
  amount,
  serviceName,
  dueDate,
  status,
  onPress
}: LoanCardProps) {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  const daysUntilDue = Math.ceil((dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const isOverdue = daysUntilDue < 0;

  return (
    <TouchableOpacity
      style={[
        shadows.standard,
        {
          backgroundColor: colors.uiElements,
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
          <Text style={[typography.sectionHeader, { color: colors.primaryText, marginBottom: spacing.xs }]}>
            ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>
          <Text style={[typography.bodyText, { color: colors.secondaryText }]}>
            {serviceName}
          </Text>
        </View>
        <StatusBadge status={status} />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="calendar-outline" size={16} color={isOverdue ? '#FF6B6B' : colors.secondaryText} />
          <Text style={[
            typography.subtitle,
            {
              color: isOverdue ? '#FF6B6B' : colors.secondaryText,
              marginLeft: spacing.xs
            }
          ]}>
            Due {dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </Text>
        </View>

        <Ionicons name="chevron-forward" size={20} color={colors.secondaryText} />
      </View>
    </TouchableOpacity>
  );
}
