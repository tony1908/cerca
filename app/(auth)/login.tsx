import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { Colors } from "@/constants/Colors";
import { commonStyles, typography, spacing, borderRadius, shadows } from "@/constants/SoftUIStyles";
import { useColorScheme } from "react-native";
import { useState } from "react";
import { useLoginWithEmail } from "@privy-io/expo";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
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
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {/* Welcome Header */}
        <View style={{ marginBottom: spacing.xxxl }}>
          <Text style={[
            typography.hero,
            {
              color: colors.accent,
              textAlign: 'center',
              marginBottom: spacing.md
            }
          ]}>
            Cerca
          </Text>
          <Text style={[
            typography.subtitle,
            {
              color: colors.secondaryText,
              textAlign: 'center'
            }
          ]}>
            Your gateway to decentralized finance
          </Text>
        </View>

        {/* Login Card */}
        <View style={[
          commonStyles.card,
          {
            backgroundColor: colors.uiElements,
            marginHorizontal: spacing.xl,
          }
        ]}>
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
              {/* Code Input */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.mainBackground,
                borderRadius: borderRadius.medium,
                paddingHorizontal: spacing.lg,
                marginBottom: spacing.lg,
              }}>
                <Ionicons name="key-outline" size={20} color={colors.secondaryText} />
                <TextInput
                  value={code}
                  onChangeText={setCode}
                  placeholder="Enter verification code"
                  placeholderTextColor={colors.secondaryText}
                  keyboardType="number-pad"
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
                onPress={() => {
                  setCodeSent(false);
                  setCode('');
                  setError('');
                }}
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
        </View>
      </View>
    </SafeAreaView>
  );
}
