import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ImageBackground } from "react-native";
import { Colors } from "@/constants/Colors";
import { typography, spacing, borderRadius, shadows } from "@/constants/SoftUIStyles";
import { useColorScheme } from "react-native";
import { useState } from "react";
import { useLoginWithEmail } from "@privy-io/expo";
import { Ionicons } from "@expo/vector-icons";
import StyledBottomSheet from "@/components/StyledBottomSheet";
import OTPInput from "@/components/OTPInput";
import { LinearGradient } from "expo-linear-gradient";

export default function Login() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCodeSent(false);
    setEmail('');
    setCode('');
    setError('');
  };

  return (
    <ImageBackground
      source={require('@/assets/images/home.png')}
      style={{ flex: 1, width: '100%', height: '100%' }}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.9)']}
        style={{
          flex: 1,
          justifyContent: 'space-between',
          paddingVertical: spacing.xxxl * 2,
          paddingHorizontal: spacing.xl,
        }}
      >
        {/* Top Section - Logo */}
        <View style={{ alignItems: 'center', marginTop: spacing.xxxl }}>
          <Text style={[
            typography.hero,
            {
              color: colors.accent,
              fontSize: 42,
              letterSpacing: 2,
            }
          ]}>
            Cerca
          </Text>
        </View>

        {/* Bottom Section - Content */}
        <View>
          {/* Main Headline */}
          <View style={{ marginBottom: spacing.xxxl }}>
            <Text style={[
              typography.hero,
              {
                color: '#FFFFFF',
                fontSize: 36,
                textAlign: 'center',
                marginBottom: spacing.md,
                lineHeight: 44,
              }
            ]}>
              Smart Finance{'\n'}Brightest Future
            </Text>

            <Text style={[
              typography.bodyText,
              {
                color: 'rgba(255, 255, 255, 0.8)',
                textAlign: 'center',
                fontSize: 16,
                lineHeight: 24,
              }
            ]}>
              Grow Your Wealth Effortlessly.{'\n'}Your Financial Future Starts Here.
            </Text>
          </View>

          {/* Pagination Dots */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: spacing.xxl,
            gap: spacing.sm,
          }}>
            <View style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: colors.accent,
            }} />
            <View style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            }} />
            <View style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            }} />
          </View>

          {/* Get Started Button */}
          <TouchableOpacity
            style={{
              backgroundColor: colors.accent,
              paddingVertical: spacing.xl,
              borderRadius: borderRadius.extraLarge,
              alignItems: 'center',
              ...shadows.convex.dark,
            }}
            onPress={() => setIsModalOpen(true)}
          >
            <Text style={[
              typography.primaryTitle,
              {
                color: colors.transactionText,
                fontWeight: '600',
                fontSize: 18,
              }
            ]}>
              Let's Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Email Login Bottom Sheet */}
      <StyledBottomSheet
        title={!codeSent ? 'Sign In' : 'Verify Code'}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        snapPoints={['60%', '80%']}
      >
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
      </StyledBottomSheet>
    </ImageBackground>
  );
}
