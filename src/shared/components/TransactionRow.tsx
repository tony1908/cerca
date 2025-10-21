import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, typography, spacing, borderRadius } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import { TransactionType } from '@/src/types';

interface TransactionRowProps {
  type: TransactionType;
  amount: number;
  description: string;
  timestamp: Date;
  onPress?: () => void;
}

export default function TransactionRow({
  type,
  amount,
  description,
  timestamp,
  onPress
}: TransactionRowProps) {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  const getIcon = () => {
    switch (type) {
      case 'loan_disbursement':
        return { name: 'arrow-down-circle', color: '#4CAF50' };
      case 'bill_payment':
        return { name: 'receipt', color: '#FFA726' };
      case 'loan_repayment':
        return { name: 'arrow-up-circle', color: '#2196F3' };
      case 'wallet_deposit':
        return { name: 'wallet', color: '#4CAF50' };
      case 'wallet_withdrawal':
        return { name: 'cash', color: '#FF6B6B' };
      default:
        return { name: 'swap-horizontal', color: colors.secondaryText };
    }
  };

  const icon = getIcon();
  const isCredit = type === 'loan_disbursement' || type === 'wallet_deposit';

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.uiElements,
        borderRadius: borderRadius.medium,
        padding: spacing.lg,
        marginBottom: spacing.md,
      }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.mainBackground,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
      }}>
        <Ionicons name={icon.name as any} size={20} color={icon.color} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={[typography.bodyText, { color: colors.primaryText, marginBottom: spacing.xs }]}>
          {description}
        </Text>
        <Text style={[typography.subtitle, { color: colors.secondaryText }]}>
          {timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </Text>
      </View>

      <Text style={[
        typography.bodyText,
        {
          color: isCredit ? '#4CAF50' : colors.primaryText,
          fontWeight: '600',
        }
      ]}>
        {isCredit ? '+' : '-'}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </Text>
    </TouchableOpacity>
  );
}
