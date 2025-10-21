import { View, Text, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, commonStyles, typography, spacing, borderRadius, shadows } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import ActionButton from '@/src/shared/components/ActionButton';

export default function CreditApprovedScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  const approvedAmount = 500;

  return (
    <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.mainBackground }]}>
      <View style={{ flex: 1, padding: spacing.xl, justifyContent: 'space-between' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: colors.accent,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: spacing.xxxl,
          }}>
            <Ionicons name="checkmark" size={70} color={colors.mainBackground} />
          </View>

          <Text style={[typography.primaryTitle, { color: colors.primaryText, marginBottom: spacing.md, textAlign: 'center' }]}>
            Congratulations!
          </Text>

          <Text style={[typography.bodyText, { color: colors.secondaryText, marginBottom: spacing.xxxl, textAlign: 'center' }]}>
            Your credit line has been approved
          </Text>

          <View style={[
            shadows.convex,
            { borderRadius: borderRadius.large, overflow: 'hidden', width: '100%', marginBottom: spacing.xl }
          ]}>
            <LinearGradient
              colors={[colors.accent, '#FF9AA2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ padding: spacing.xxxl, alignItems: 'center' }}
            >
              <Text style={[typography.subtitle, { color: colors.mainBackground, marginBottom: spacing.sm }]}>
                Your Credit Line
              </Text>
              <Text style={[typography.hero, { color: colors.mainBackground, fontSize: 48 }]}>
                ${approvedAmount}
              </Text>
            </LinearGradient>
          </View>

          <View style={[
            shadows.standard,
            {
              backgroundColor: colors.uiElements,
              borderRadius: borderRadius.medium,
              padding: spacing.lg,
              width: '100%',
            }
          ]}>
            <InfoItem
              icon="time-outline"
              title="Repayment Period"
              value="7 days"
              colors={colors}
            />
            <InfoItem
              icon="card-outline"
              title="Payment Method"
              value="USDC Wallet"
              colors={colors}
            />
            <InfoItem
              icon="lock-closed-outline"
              title="Collateral"
              value="Your Device"
              colors={colors}
              isLast
            />
          </View>
        </View>

        <View>
          <ActionButton
            title="Get Started"
            icon="rocket"
            onPress={() => {}}
            variant="primary"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

function InfoItem({ icon, title, value, colors, isLast = false }: any) {
  return (
    <View style={{ marginBottom: isLast ? 0 : spacing.lg }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name={icon} size={20} color={colors.accent} style={{ marginRight: spacing.md }} />
        <View style={{ flex: 1 }}>
          <Text style={[typography.subtitle, { color: colors.secondaryText, marginBottom: spacing.xs }]}>
            {title}
          </Text>
          <Text style={[typography.bodyText, { color: colors.primaryText }]}>
            {value}
          </Text>
        </View>
      </View>
    </View>
  );
}
