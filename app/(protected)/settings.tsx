import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { usePrivy } from '@privy-io/expo';
import { Colors, commonStyles, typography, spacing, borderRadius, shadows } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';

export default function SettingsScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const { logout } = usePrivy();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);

  return (
    <View style={[commonStyles.container, { paddingTop: insets.top, paddingBottom: insets.bottom + 90 }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={{ marginBottom: spacing.xl }}>
          <Text style={[typography.primaryTitle, { color: colors.primaryText }]}>
            Settings
          </Text>
          <Text style={[typography.subtitle, { color: colors.secondaryText, marginTop: spacing.xs }]}>
            Manage your preferences
          </Text>
        </View>

        {/* Profile Section */}
        <View style={{ marginBottom: spacing.xl }}>
          <Text style={[typography.bodyText, { color: colors.secondaryText, marginBottom: spacing.md }]}>
            ACCOUNT
          </Text>

          <SettingsCard>
            <SettingsItem
              icon="person"
              title="Profile"
              onPress={() => {}}
              colors={colors}
            />
            <SettingsItem
              icon="card"
              title="Credit Line Details"
              onPress={() => {}}
              colors={colors}
            />
            <SettingsItem
              icon="phone-portrait"
              title="Device Information"
              onPress={() => {}}
              colors={colors}
              isLast
            />
          </SettingsCard>
        </View>

        {/* Security */}
        <View style={{ marginBottom: spacing.xl }}>
          <Text style={[typography.bodyText, { color: colors.secondaryText, marginBottom: spacing.md }]}>
            SECURITY
          </Text>

          <SettingsCard>
            <SettingsToggleItem
              icon="finger-print"
              title="Biometric Authentication"
              description="Use fingerprint or face ID"
              value={biometricsEnabled}
              onValueChange={setBiometricsEnabled}
              colors={colors}
            />
            <SettingsItem
              icon="lock-closed"
              title="Change Password"
              onPress={() => {}}
              colors={colors}
              isLast
            />
          </SettingsCard>
        </View>

        {/* Notifications */}
        <View style={{ marginBottom: spacing.xl }}>
          <Text style={[typography.bodyText, { color: colors.secondaryText, marginBottom: spacing.md }]}>
            NOTIFICATIONS
          </Text>

          <SettingsCard>
            <SettingsToggleItem
              icon="notifications"
              title="Push Notifications"
              description="Receive payment reminders"
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              colors={colors}
              isLast
            />
          </SettingsCard>
        </View>

        {/* Preferences */}
        <View style={{ marginBottom: spacing.xl }}>
          <Text style={[typography.bodyText, { color: colors.secondaryText, marginBottom: spacing.md }]}>
            PREFERENCES
          </Text>

          <SettingsCard>
            <SettingsItem
              icon="language"
              title="Language"
              subtitle="English"
              onPress={() => {}}
              colors={colors}
            />
            <SettingsItem
              icon="help-circle"
              title="Help & Support"
              onPress={() => {}}
              colors={colors}
            />
            <SettingsItem
              icon="document-text"
              title="Terms & Conditions"
              onPress={() => {}}
              colors={colors}
            />
            <SettingsItem
              icon="shield-checkmark"
              title="Privacy Policy"
              onPress={() => {}}
              colors={colors}
              isLast
            />
          </SettingsCard>
        </View>

        {/* Danger Zone */}
        <View style={{ marginBottom: spacing.xl }}>
          <TouchableOpacity
            style={[
              shadows.standard,
              {
                backgroundColor: colors.uiElements,
                borderRadius: borderRadius.medium,
                padding: spacing.lg,
                alignItems: 'center',
                borderLeftWidth: 4,
                borderLeftColor: '#FF6B6B',
              }
            ]}
            onPress={logout}
            activeOpacity={0.7}
          >
            <Text style={[typography.bodyText, { color: '#FF6B6B', fontWeight: '600' }]}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={[typography.subtitle, { color: colors.secondaryText, textAlign: 'center' }]}>
          Version 1.0.0
        </Text>
      </ScrollView>
    </View>
  );
}

function SettingsCard({ children }: any) {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  return (
    <View style={[
      shadows.standard,
      {
        backgroundColor: colors.uiElements,
        borderRadius: borderRadius.medium,
        overflow: 'hidden',
      }
    ]}>
      {children}
    </View>
  );
}

function SettingsItem({ icon, title, subtitle, onPress, colors, isLast = false }: any) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.lg,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: colors.mainBackground,
      }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name={icon} size={22} color={colors.accent} style={{ marginRight: spacing.md }} />
      <View style={{ flex: 1 }}>
        <Text style={[typography.bodyText, { color: colors.primaryText }]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[typography.subtitle, { color: colors.secondaryText, marginTop: spacing.xs }]}>
            {subtitle}
          </Text>
        )}
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.secondaryText} />
    </TouchableOpacity>
  );
}

function SettingsToggleItem({ icon, title, description, value, onValueChange, colors, isLast = false }: any) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.lg,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: colors.mainBackground,
      }}
    >
      <Ionicons name={icon} size={22} color={colors.accent} style={{ marginRight: spacing.md }} />
      <View style={{ flex: 1 }}>
        <Text style={[typography.bodyText, { color: colors.primaryText }]}>
          {title}
        </Text>
        {description && (
          <Text style={[typography.subtitle, { color: colors.secondaryText, marginTop: spacing.xs }]}>
            {description}
          </Text>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.mainBackground, true: colors.accent }}
        thumbColor={colors.contentBackground}
      />
    </View>
  );
}
