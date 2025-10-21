import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, commonStyles, typography, spacing, borderRadius, shadows } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import ActionButton from '@/src/shared/components/ActionButton';

export default function DeviceVerifyScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  const deviceInfo = {
    model: 'iPhone 14 Pro',
    storage: '256GB',
    condition: 'Excellent',
    estimatedValue: 850,
  };

  return (
    <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.mainBackground }]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.xl }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignItems: 'center', marginBottom: spacing.xxxl }}>
          <View style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: colors.uiElements,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: spacing.lg,
          }}>
            <Ionicons name="phone-portrait" size={50} color={colors.accent} />
          </View>

          <Text style={[typography.primaryTitle, { color: colors.primaryText, marginBottom: spacing.sm }]}>
            Device Verification
          </Text>
          <Text style={[typography.bodyText, { color: colors.secondaryText, textAlign: 'center' }]}>
            We'll verify your device to determine your credit line
          </Text>
        </View>

        <View style={[
          shadows.standard,
          {
            backgroundColor: colors.uiElements,
            borderRadius: borderRadius.medium,
            padding: spacing.xl,
            marginBottom: spacing.xl,
          }
        ]}>
          <Text style={[typography.sectionHeader, { color: colors.primaryText, marginBottom: spacing.lg }]}>
            Device Details
          </Text>

          <InfoRow label="Model" value={deviceInfo.model} colors={colors} />
          <InfoRow label="Storage" value={deviceInfo.storage} colors={colors} />
          <InfoRow label="Condition" value={deviceInfo.condition} colors={colors} />

          <View style={{ height: 1, backgroundColor: colors.mainBackground, marginVertical: spacing.lg }} />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={[typography.bodyText, { color: colors.primaryText }]}>
              Estimated Value
            </Text>
            <Text style={[typography.sectionHeader, { color: colors.accent }]}>
              ${deviceInfo.estimatedValue}
            </Text>
          </View>
        </View>

        <View style={[
          {
            backgroundColor: colors.uiElements,
            borderRadius: borderRadius.medium,
            padding: spacing.lg,
            marginBottom: spacing.xxxl,
            borderLeftWidth: 4,
            borderLeftColor: colors.accent,
          }
        ]}>
          <Text style={[typography.subtitle, { color: colors.secondaryText, lineHeight: 20 }]}>
            Your device will be used as collateral. If you fail to repay your loans, access to your device may be restricted.
          </Text>
        </View>

        <ActionButton
          title="Verify Device"
          icon="checkmark-circle"
          onPress={() => {}}
          variant="primary"
        />

        <View style={{ height: spacing.xl }} />

        <ActionButton
          title="Cancel"
          onPress={() => {}}
          variant="outline"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({ label, value, colors }: any) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md }}>
      <Text style={[typography.bodyText, { color: colors.secondaryText }]}>
        {label}
      </Text>
      <Text style={[typography.bodyText, { color: colors.primaryText }]}>
        {value}
      </Text>
    </View>
  );
}
