import { View, Text, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Colors, commonStyles, typography, spacing, borderRadius, shadows } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import ActionButton from '@/src/shared/components/ActionButton';

export default function KYCScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

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
            <Ionicons name="person" size={50} color={colors.accent} />
          </View>

          <Text style={[typography.primaryTitle, { color: colors.primaryText, marginBottom: spacing.sm }]}>
            Verify Your Identity
          </Text>
          <Text style={[typography.bodyText, { color: colors.secondaryText, textAlign: 'center' }]}>
            We need some basic information to set up your account
          </Text>
        </View>

        <View style={{ marginBottom: spacing.xl }}>
          <InputField
            label="First Name"
            value={firstName}
            onChangeText={setFirstName}
            placeholder="John"
            colors={colors}
          />

          <InputField
            label="Last Name"
            value={lastName}
            onChangeText={setLastName}
            placeholder="Doe"
            colors={colors}
          />

          <InputField
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            placeholder="john.doe@example.com"
            keyboardType="email-address"
            colors={colors}
          />

          <InputField
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            placeholder="+1 (555) 000-0000"
            keyboardType="phone-pad"
            colors={colors}
          />

          <InputField
            label="Address"
            value={address}
            onChangeText={setAddress}
            placeholder="123 Main St, City, State"
            colors={colors}
            multiline
          />
        </View>

        <View style={[
          {
            backgroundColor: colors.uiElements,
            borderRadius: borderRadius.medium,
            padding: spacing.lg,
            marginBottom: spacing.xl,
            flexDirection: 'row',
          }
        ]}>
          <Ionicons name="shield-checkmark" size={24} color={colors.accent} style={{ marginRight: spacing.md }} />
          <Text style={[typography.subtitle, { color: colors.secondaryText, flex: 1, lineHeight: 20 }]}>
            Your information is encrypted and securely stored
          </Text>
        </View>

        <ActionButton
          title="Continue"
          icon="arrow-forward"
          onPress={() => {}}
          variant="primary"
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

function InputField({ label, value, onChangeText, placeholder, keyboardType = 'default', multiline = false, colors }: any) {
  return (
    <View style={{ marginBottom: spacing.lg }}>
      <Text style={[typography.bodyText, { color: colors.primaryText, marginBottom: spacing.sm }]}>
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.secondaryText}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
        style={[
          typography.bodyText,
          {
            backgroundColor: colors.uiElements,
            borderRadius: borderRadius.medium,
            padding: spacing.lg,
            color: colors.primaryText,
            borderWidth: 2,
            borderColor: 'transparent',
            minHeight: multiline ? 80 : 50,
            textAlignVertical: multiline ? 'top' : 'center',
          }
        ]}
      />
    </View>
  );
}
