import { View, Text } from 'react-native';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import { Colors, commonStyles, typography } from '@/src/shared/design/theme';

export default function SettingsScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  return (
    <View style={[commonStyles.container, { paddingBottom: 100 }]}>
      <Text style={[typography.primaryTitle, { color: colors.primaryText }]}>
        Settings
      </Text>
      <Text style={[typography.bodyText, { color: colors.secondaryText, marginTop: 20 }]}>
        Settings screen - Coming soon!
      </Text>
    </View>
  );
}
