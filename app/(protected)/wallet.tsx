import { View, Text } from 'react-native';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import { Colors, commonStyles, typography } from '@/src/shared/design/theme';

export default function WalletScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  return (
    <View style={[commonStyles.container, { paddingBottom: 100 }]}>
      <Text style={[typography.primaryTitle, { color: colors.primaryText }]}>
        Wallet
      </Text>
      <Text style={[typography.bodyText, { color: colors.secondaryText, marginTop: 20 }]}>
        Wallet screen - Coming soon!
      </Text>
    </View>
  );
}
