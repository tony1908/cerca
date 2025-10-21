import { View, Text } from 'react-native';
import { typography, spacing, borderRadius } from '@/src/shared/design/theme';
import { LoanStatus, TransactionStatus, BillPaymentStatus } from '@/src/types';

interface StatusBadgeProps {
  status: LoanStatus | TransactionStatus | BillPaymentStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'active':
      case 'completed':
      case 'paid':
        return { bg: '#4CAF50', text: '#FFFFFF' };
      case 'pending':
      case 'processing':
        return { bg: '#FFA726', text: '#FFFFFF' };
      case 'overdue':
      case 'failed':
        return { bg: '#FF6B6B', text: '#FFFFFF' };
      case 'defaulted':
        return { bg: '#D32F2F', text: '#FFFFFF' };
      default:
        return { bg: '#757575', text: '#FFFFFF' };
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'paid':
        return 'Paid';
      case 'pending':
        return 'Pending';
      case 'overdue':
        return 'Overdue';
      case 'defaulted':
        return 'Defaulted';
      case 'processing':
        return 'Processing';
      case 'completed':
        return 'Completed';
      case 'failed':
        return 'Failed';
      default:
        return status;
    }
  };

  const colors = getStatusColor();

  return (
    <View style={{
      backgroundColor: colors.bg,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.small,
    }}>
      <Text style={[typography.subtitle, { color: colors.text, fontSize: 12 }]}>
        {getStatusLabel()}
      </Text>
    </View>
  );
}
