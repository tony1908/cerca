import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { Colors } from "@/constants/Colors";
import { typography, spacing, borderRadius, shadows } from "@/constants/SoftUIStyles";
import { useColorScheme } from "react-native";
import { useState } from "react";
import { useLoginWithEmail } from "@privy-io/expo";
import { Ionicons } from "@expo/vector-icons";
import OTPInput from "@/components/OTPInput";

interface EmailLoginFormProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

export default function EmailLoginForm({ onSuccess, onClose }: EmailLoginFormProps) {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { sendCode, loginWithCode } = useLoginWithEmail();

  const handleSendCode = async () => {
    if (!email) {
      setError('Please enter your email');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await sendCode({ email });
      setCodeSent(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send code');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!code) {
      setError('Please enter the verification code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await loginWithCode({ code, email });
      onSuccess?.();
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setCodeSent(false);
    setCode('');
    setError('');
  };

  return (
    <>
      <Text style={[
        typography.bodyText,
        {
          color: colors.primaryText,
          marginBottom: spacing.xl,
          textAlign: 'center'
        }
      ]}>
        {!codeSent ? 'Sign in with your email' : 'Enter verification code'}
      </Text>

      {!codeSent ? (
        <>
          {/* Email Input */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.mainBackground,
            borderRadius: borderRadius.medium,
            paddingHorizontal: spacing.lg,
            marginBottom: spacing.lg,
          }}>
            <Ionicons name="mail-outline" size={20} color={colors.secondaryText} />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor={colors.secondaryText}
              inputMode="email"
              autoCapitalize="none"
              autoCorrect={false}
              style={[
                typography.bodyText,
                {
                  flex: 1,
                  color: colors.primaryText,
                  paddingVertical: spacing.lg,
                  paddingHorizontal: spacing.md,
                }
              ]}
            />
          </View>

          {/* Send Code Button */}
          <TouchableOpacity
            style={{
              backgroundColor: colors.accent,
              paddingVertical: spacing.lg,
              paddingHorizontal: spacing.xxxl,
              borderRadius: borderRadius.button,
              alignItems: 'center',
              ...shadows.convex.dark
            }}
            onPress={handleSendCode}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.transactionText} />
            ) : (
              <Text style={[
                typography.bodyText,
                {
                  color: colors.transactionText,
                  fontWeight: '600'
                }
              ]}>
                Send Code
              </Text>
            )}
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={[
            typography.subtitle,
            {
              color: colors.secondaryText,
              textAlign: 'center',
              marginBottom: spacing.lg
            }
          ]}>
            We sent a code to {email}
          </Text>

          {/* OTP Input - 6 digit code */}
          <View style={{ marginBottom: spacing.xxl }}>
            <OTPInput
              length={6}
              value={code}
              onChange={setCode}
            />
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={{
              backgroundColor: colors.accent,
              paddingVertical: spacing.lg,
              paddingHorizontal: spacing.xxxl,
              borderRadius: borderRadius.button,
              alignItems: 'center',
              ...shadows.convex.dark
            }}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.transactionText} />
            ) : (
              <Text style={[
                typography.bodyText,
                {
                  color: colors.transactionText,
                  fontWeight: '600'
                }
              ]}>
                Verify & Login
              </Text>
            )}
          </TouchableOpacity>

          {/* Back Button */}
          <TouchableOpacity
            style={{
              marginTop: spacing.lg,
              padding: spacing.md,
              alignItems: 'center'
            }}
            onPress={handleBackToEmail}
          >
            <Text style={[
              typography.bodyText,
              {
                color: colors.accent,
              }
            ]}>
              Use different email
            </Text>
          </TouchableOpacity>
        </>
      )}

      {/* Error Message */}
      {error && (
        <View style={{
          marginTop: spacing.lg,
          padding: spacing.md,
          backgroundColor: 'rgba(255, 59, 48, 0.1)',
          borderRadius: borderRadius.small,
        }}>
          <Text style={[
            typography.subtitle,
            {
              color: '#FF3B30',
              textAlign: 'center'
            }
          ]}>
            {error}
          </Text>
        </View>
      )}
    </>
  );
}
