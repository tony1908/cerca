import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import { Colors, commonStyles } from '@/src/shared/design/theme';

const tabs = [
  { name: 'Home', icon: 'home', route: '/(protected)/home' },
  { name: 'Wallet', icon: 'wallet', route: '/(protected)/wallet' },
  { name: 'Settings', icon: 'settings', route: '/(protected)/settings' },
];

export default function CustomTabBar() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  return (
    <View style={[
      styles.tabBarContainer,
      {
        bottom: insets.bottom + 20,
      }
    ]}>
      {tabs.map((tab, index) => {
        const isActive = pathname === tab.route || (index === 0 && pathname.includes('/home'));

        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => router.push(tab.route as any)}
            style={[
              isActive ? commonStyles.activeTab : commonStyles.inactiveTab,
              { width: 60, height: 60 }
            ]}
          >
            <Ionicons
              name={tab.icon as any}
              size={24}
              color={isActive ? colors.transactionText : colors.secondaryText}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 40,
    // No background, no border, no shadows - just transparent container
  },
});
