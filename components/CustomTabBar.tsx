import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { commonStyles, spacing, shadows } from '@/constants/SoftUIStyles';
import { useColorScheme } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

const tabs = [
  { name: 'Home', icon: 'home', route: '/(protected)/home' },
  { name: 'Wallet', icon: 'wallet', route: '/(protected)/home' },
  { name: 'Swap', icon: 'swap-horizontal', route: '/(protected)/home' },
  { name: 'Settings', icon: 'settings', route: '/(protected)/home' },
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