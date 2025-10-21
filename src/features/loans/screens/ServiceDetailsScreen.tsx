import { View, Text, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Colors, commonStyles, typography, spacing, borderRadius, shadows } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import ActionButton from '@/src/shared/components/ActionButton';

export default function ServiceDetailsScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  const [referenceNumber, setReferenceNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');

  const serviceName = 'CFE - Electricity';
  const referenceFormat = '12-16 digits';
  const referenceExample = '1234567890123456';

  return (
    <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.mainBackground }]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.xl }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignItems: 'center', marginBottom: spacing.xxxl }}>
          <View style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: colors.uiElements,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: spacing.lg,
          }}>
            <Ionicons name="flash" size={40} color={colors.accent} />
          </View>

          <Text style={[typography.primaryTitle, { color: colors.primaryText, marginBottom: spacing.sm }]}>
            {serviceName}
          </Text>
          <Text style={[typography.bodyText, { color: colors.secondaryText, textAlign: 'center' }]}>
            Enter your account details
          </Text>
        </View>

        {/* Info Banner */}
        <View style={[
          shadows.standard,
          {
            backgroundColor: colors.uiElements,
            borderRadius: borderRadius.medium,
            padding: spacing.lg,
            marginBottom: spacing.xxxl,
            borderLeftWidth: 4,
            borderLeftColor: colors.accent,
          }
        ]}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <Ionicons name="information-circle" size={20} color={colors.accent} style={{ marginRight: spacing.md, marginTop: 2 }} />
            <View style={{ flex: 1 }}>
              <Text style={[typography.bodyText, { color: colors.primaryText, marginBottom: spacing.xs }]}>
                Where to find your reference number?
              </Text>
              <Text style={[typography.subtitle, { color: colors.secondaryText, lineHeight: 20 }]}>
                You can find this number on your {serviceName.split(' - ')[1].toLowerCase()} bill, usually at the top or in the account section.
              </Text>
            </View>
          </View>
        </View>

        {/* Reference Number Input */}
        <View style={{ marginBottom: spacing.lg }}>
          <Text style={[typography.bodyText, { color: colors.primaryText, marginBottom: spacing.sm }]}>
            Reference Number *
          </Text>
          <TextInput
            value={referenceNumber}
            onChangeText={setReferenceNumber}
            placeholder={referenceExample}
            placeholderTextColor={colors.secondaryText}
            keyboardType="numeric"
            style={[
              typography.bodyText,
              {
                backgroundColor: colors.uiElements,
                borderRadius: borderRadius.medium,
                padding: spacing.lg,
                color: colors.primaryText,
                borderWidth: 2,
                borderColor: 'transparent',
              }
            ]}
          />
          <Text style={[typography.subtitle, { color: colors.secondaryText, marginTop: spacing.xs }]}>
            Format: {referenceFormat}
          </Text>
        </View>

        {/* Account Holder Input */}
        <View style={{ marginBottom: spacing.xxxl }}>
          <Text style={[typography.bodyText, { color: colors.primaryText, marginBottom: spacing.sm }]}>
            Account Holder Name (Optional)
          </Text>
          <TextInput
            value={accountHolder}
            onChangeText={setAccountHolder}
            placeholder="Juan Pérez"
            placeholderTextColor={colors.secondaryText}
            style={[
              typography.bodyText,
              {
                backgroundColor: colors.uiElements,
                borderRadius: borderRadius.medium,
                padding: spacing.lg,
                color: colors.primaryText,
                borderWidth: 2,
                borderColor: 'transparent',
              }
            ]}
          />
        </View>

        {/* Validation Examples */}
        <View style={[
          {
            backgroundColor: colors.uiElements,
            borderRadius: borderRadius.medium,
            padding: spacing.lg,
            marginBottom: spacing.xl,
          }
        ]}>
          <Text style={[typography.bodyText, { color: colors.primaryText, marginBottom: spacing.md }]}>
            Make sure your reference number:
          </Text>

          <ValidationItem
            icon="checkmark-circle"
            text="Matches the format shown above"
            colors={colors}
          />
          <ValidationItem
            icon="checkmark-circle"
            text="Is from a recent bill"
            colors={colors}
          />
          <ValidationItem
            icon="checkmark-circle"
            text="Has no spaces or special characters"
            colors={colors}
            isLast
          />
        </View>

        <ActionButton
          title="Continue to Review"
          icon="arrow-forward"
          onPress={() => {}}
          variant="primary"
          disabled={referenceNumber.length < 10}
        />

        <View style={{ height: spacing.xl }} />

        <ActionButton
          title="Back"
          onPress={() => {}}
          variant="outline"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function ValidationItem({ icon, text, colors, isLast = false }: any) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: isLast ? 0 : spacing.md }}>
      <Ionicons name={icon} size={18} color={colors.accent} style={{ marginRight: spacing.md }} />
      <Text style={[typography.subtitle, { color: colors.secondaryText, flex: 1 }]}>
        {text}
      </Text>
    </View>
  );
}
