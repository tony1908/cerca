import { View, Text, TextInput } from 'react-native';
import { Colors, typography, spacing, borderRadius } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';

interface AmountInputProps {
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  maxAmount?: number;
  placeholder?: string;
}

export default function AmountInput({
  value,
  onChangeText,
  label = 'Amount',
  maxAmount,
  placeholder = '0.00'
}: AmountInputProps) {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  const handleChange = (text: string) => {
    // Only allow numbers and decimal point
    const cleaned = text.replace(/[^0-9.]/g, '');
    // Only allow one decimal point
    const parts = cleaned.split('.');
    if (parts.length > 2) return;
    // Limit to 2 decimal places
    if (parts[1]?.length > 2) return;

    onChangeText(cleaned);
  };

  return (
    <View style={{ marginBottom: spacing.lg }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm }}>
        <Text style={[typography.bodyText, { color: colors.primaryText }]}>
          {label}
        </Text>
        {maxAmount !== undefined && (
          <Text style={[typography.subtitle, { color: colors.secondaryText }]}>
            Max: ${maxAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>
        )}
      </View>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.mainBackground,
        borderRadius: borderRadius.medium,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        borderWidth: 2,
        borderColor: colors.uiElements,
      }}>
        <Text style={[typography.primaryTitle, { color: colors.accent, marginRight: spacing.sm }]}>
          $
        </Text>
        <TextInput
          value={value}
          onChangeText={handleChange}
          placeholder={placeholder}
          placeholderTextColor={colors.secondaryText}
          keyboardType="decimal-pad"
          style={[
            typography.primaryTitle,
            {
              color: colors.primaryText,
              flex: 1,
              padding: 0,
            }
          ]}
        />
      </View>
    </View>
  );
}
