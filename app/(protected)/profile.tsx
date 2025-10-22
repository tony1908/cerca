import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, spacing } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import { useRouter } from 'expo-router';
import { usePrivy } from '@privy-io/expo';

export default function ProfileScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { logout, user } = usePrivy();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={{ flex: 1, backgroundColor: colors.mainBackground }}>
        {/* Header */}
        <View style={{ paddingTop: insets.top, backgroundColor: '#2A2A2A', paddingBottom: spacing.xl }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: spacing.xl,
            paddingVertical: spacing.lg,
          }}>
            <TouchableOpacity onPress={() => router.back()}>
              <Feather name="x" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Profile Avatar and Name */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: spacing.xl,
            paddingTop: spacing.lg,
          }}>
            <View style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              backgroundColor: colors.primaryPink,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: spacing.lg,
            }}>
              <Feather name="camera" size={28} color="#FFFFFF" />
            </View>
            <Text style={{
              fontSize: 24,
              color: '#FFFFFF',
              fontWeight: '600',
            }}>
              {user?.email?.address?.split('@')[0] || 'User'}
            </Text>
          </View>
        </View>

        {/* Menu Items */}
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Notifications */}
          <MenuItem
            icon="bell"
            iconType="feather"
            title="Notifications"
            subtitle="Everything happening with your account"
            badge="6"
            onPress={() => {}}
            colors={colors}
          />

          {/* Help */}
          <MenuItem
            icon="help-circle"
            iconType="feather"
            title="Help"
            subtitle="Answers to the most common questions"
            onPress={() => {}}
            colors={colors}
          />

          {/* Configure Personal Data */}
          <MenuItem
            icon="user"
            iconType="feather"
            title="Configure Personal Data"
            subtitle="Edit your email, phone and more"
            onPress={() => {}}
            colors={colors}
          />

          {/* Security Center */}
          <MenuItem
            icon="shield"
            iconType="feather"
            title="Security Center"
            subtitle="Change your password, PIN and more"
            onPress={() => {}}
            colors={colors}
          />

          {/* Credit Card */}
          <MenuItem
            icon="credit-card"
            iconType="feather"
            title="Credit Card"
            subtitle="Keep control of your card"
            tag="New"
            onPress={() => {}}
            colors={colors}
          />

          {/* About */}
          <MenuItem
            icon="file-text"
            iconType="feather"
            title="About"
            subtitle=""
            onPress={() => {}}
            colors={colors}
          />

          {/* Appearance */}
          <MenuItem
            icon="moon"
            iconType="feather"
            title="Appearance"
            subtitle="Adjust the app theme"
            onPress={() => {}}
            colors={colors}
          />

          {/* Sign Out */}
          <MenuItem
            icon="log-out"
            iconType="feather"
            title="Sign Out"
            subtitle=""
            onPress={logout}
            colors={colors}
            isLast
          />
        </ScrollView>
      </View>
    </>
  );
}

function MenuItem({ icon, iconType, title, subtitle, badge, tag, onPress, colors, isLast = false }: any) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.lg,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: colors.border,
      }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Icon */}
      <View style={{
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.lg,
      }}>
        {iconType === 'feather' ? (
          <Feather name={icon} size={24} color="#FFFFFF" />
        ) : (
          <MaterialCommunityIcons name={icon} size={24} color="#FFFFFF" />
        )}
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>
        <Text style={{
          fontSize: 16,
          color: '#FFFFFF',
          fontWeight: '500',
          marginBottom: subtitle ? 4 : 0,
        }}>
          {title}
        </Text>
        {subtitle !== '' && (
          <Text style={{
            fontSize: 14,
            color: colors.mutedText,
          }}>
            {subtitle}
          </Text>
        )}
      </View>

      {/* Badge or Tag */}
      {badge && (
        <View style={{
          backgroundColor: colors.primaryPink,
          paddingHorizontal: 12,
          paddingVertical: 4,
          borderRadius: 12,
          marginRight: spacing.sm,
        }}>
          <Text style={{
            color: '#FFFFFF',
            fontSize: 14,
            fontWeight: '600',
          }}>
            {badge}
          </Text>
        </View>
      )}

      {tag && (
        <View style={{
          backgroundColor: colors.primaryPink,
          paddingHorizontal: 12,
          paddingVertical: 4,
          borderRadius: 12,
          marginRight: spacing.sm,
        }}>
          <Text style={{
            color: '#FFFFFF',
            fontSize: 12,
            fontWeight: '600',
          }}>
            {tag}
          </Text>
        </View>
      )}

      {/* Chevron */}
      <Feather name="chevron-right" size={20} color={colors.mutedText} />
    </TouchableOpacity>
  );
}