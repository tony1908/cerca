import React from 'react';
import { View, TouchableOpacity } from 'react-native';
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

  return (
    <View style={[
      commonStyles.tabBar,
      {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        height: 70,
        justifyContent: 'space-around',
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
