import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import { Colors, commonStyles, typography } from '@/src/shared/design/theme';

export default function WalletScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();

  return (
    <View style={[commonStyles.container, { paddingTop: insets.top, paddingBottom: insets.bottom + 90 }]}>
      <Text style={[typography.primaryTitle, { color: colors.primaryText }]}>
        Wallet
      </Text>
      <Text style={[typography.bodyText, { color: colors.secondaryText, marginTop: 20 }]}>
        Wallet screen - Coming soon!
      </Text>
    </View>
  );
}
