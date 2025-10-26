/**
 * Kiosk Lock Screen
 * Full-screen locked device UI shown when loan is overdue or defaulted
 */

import { View, Text, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Colors, spacing } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import { useKioskContext } from '@/src/contexts/KioskContext';
import { usePayBackLoan, useRefetchActiveLoan } from '@/src/features/wallet/hooks/useLoanQuery';
import { useState, useEffect } from 'react';

export default function KioskLockScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const { lockedLoan, forceCheckLoanStatus } = useKioskContext();
  const { mutate: payLoan, isPending, isSuccess, isError, error } = usePayBackLoan();
  const refetchLoan = useRefetchActiveLoan();

  const [paymentStatus, setPaymentStatus] = useState<string>('');
  const [unlockAttempts, setUnlockAttempts] = useState(0);

  /**
   * Handle payment
   */
  const handlePayment = async () => {
    if (!lockedLoan) return;

    try {
      setPaymentStatus('Preparing payment...');

      const amountWei = BigInt(lockedLoan.amountWei);

      payLoan(amountWei);
    } catch (err: any) {
      console.error('❌ Payment error:', err);
      setPaymentStatus(`Error: ${err.message}`);
    }
  };

  /**
   * Auto-unlock system after successful payment
   * Checks every 1 second for 15 seconds
   */
  useEffect(() => {
    if (isSuccess) {
      setPaymentStatus('Payment successful! Unlocking device...');

      let attempts = 0;
      const maxAttempts = 15;

      const checkInterval = setInterval(() => {
        attempts++;
        setUnlockAttempts(attempts);

        console.log(`🔍 Auto-unlock attempt ${attempts}/${maxAttempts}`);

        // Force check loan status
        forceCheckLoanStatus();
        refetchLoan();

        if (attempts >= maxAttempts) {
          clearInterval(checkInterval);
          console.log('⏰ Max unlock attempts reached');
        }
      }, 1000); // Check every 1 second

      return () => clearInterval(checkInterval);
    }
  }, [isSuccess, forceCheckLoanStatus, refetchLoan]);

  /**
   * Update payment status
   */
  useEffect(() => {
    if (isPending) {
      setPaymentStatus('Processing payment...');
    } else if (isError) {
      setPaymentStatus(`Payment failed: ${error?.message || 'Unknown error'}`);
    }
  }, [isPending, isError, error]);

  if (!lockedLoan) {
    return null;
  }

  // Dynamic font size based on amount length
  const amountLength = lockedLoan.amount.length;
  let amountFontSize = 48;
  if (amountLength > 8) {
    amountFontSize = 24;
  } else if (amountLength > 6) {
    amountFontSize = 32;
  } else if (amountLength > 4) {
    amountFontSize = 40;
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={{ flex: 1, backgroundColor: '#000000' }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: insets.bottom + spacing.xl,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Lock Icon Section */}
          <View
            style={{
              paddingTop: insets.top + spacing.xxxl,
              alignItems: 'center',
              marginBottom: spacing.xxl,
            }}
          >
            <View
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: 'rgba(255,255,255,0.2)',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: spacing.xl,
              }}
            >
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  backgroundColor: '#FFFFFF',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Feather name="lock" size={50} color="#FF1493" />
              </View>
            </View>

            <Text
              style={{
                fontSize: 32,
                color: '#FFFFFF',
                fontWeight: '700',
                textAlign: 'center',
                marginBottom: spacing.md,
              }}
            >
              Device Locked
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: 'rgba(255,255,255,0.9)',
                textAlign: 'center',
                paddingHorizontal: spacing.xl,
                lineHeight: 24,
              }}
            >
              Your loan payment is {lockedLoan.statusText.toLowerCase()}. Please make a payment
              to unlock your device.
            </Text>
          </View>

          {/* White Content Card */}
          <View
            style={{
              backgroundColor: colors.mainBackground,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingTop: spacing.xxl,
              paddingHorizontal: spacing.xl,
              flex: 1,
            }}
          >
            {/* Amount Section */}
            <View
              style={{
                alignItems: 'center',
                marginBottom: spacing.xxl,
                paddingBottom: spacing.xl,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: colors.mutedText,
                  marginBottom: spacing.sm,
                }}
              >
                Amount Due
              </Text>
              <Text
                style={{
                  fontSize: amountFontSize,
                  color: colors.primaryPink,
                  fontWeight: '700',
                  marginBottom: spacing.md,
                }}
              >
                ${lockedLoan.amount}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.error,
                  fontWeight: '600',
                }}
              >
                Payment {lockedLoan.isOverdue ? 'Overdue' : 'Required'}
              </Text>
            </View>

            {/* Payment Status */}
            {paymentStatus && (
              <View
                style={{
                  backgroundColor: isError ? colors.cardBackground : 'rgba(0, 255, 136, 0.1)',
                  borderRadius: 12,
                  padding: spacing.lg,
                  marginBottom: spacing.xl,
                  borderWidth: 1,
                  borderColor: isError ? colors.error : colors.success,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: isError ? colors.error : colors.success,
                    textAlign: 'center',
                    lineHeight: 20,
                  }}
                >
                  {paymentStatus}
                </Text>
                {isSuccess && unlockAttempts > 0 && (
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.mutedText,
                      textAlign: 'center',
                      marginTop: spacing.sm,
                    }}
                  >
                    Unlock attempt: {unlockAttempts}/15
                  </Text>
                )}
              </View>
            )}

            {/* Pay Button */}
            <TouchableOpacity
              onPress={handlePayment}
              disabled={isPending || isSuccess}
              style={{
                backgroundColor:
                  isPending || isSuccess ? colors.mutedText : colors.primaryPink,
                borderRadius: 50,
                paddingVertical: spacing.lg,
                alignItems: 'center',
                marginBottom: spacing.xl,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              {isPending ? (
                <>
                  <ActivityIndicator color="#FFFFFF" style={{ marginRight: spacing.sm }} />
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#FFFFFF',
                      fontWeight: '600',
                    }}
                  >
                    Processing...
                  </Text>
                </>
              ) : isSuccess ? (
                <Text
                  style={{
                    fontSize: 18,
                    color: '#FFFFFF',
                    fontWeight: '600',
                  }}
                >
                  Unlocking Device...
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 18,
                    color: '#FFFFFF',
                    fontWeight: '600',
                  }}
                >
                  Pay & Unlock Device
                </Text>
              )}
            </TouchableOpacity>

            {/* Instructions Card */}
            <View
              style={{
                backgroundColor: colors.cardBackground,
                borderRadius: 12,
                padding: spacing.lg,
                marginBottom: spacing.xl,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: '#FFFFFF',
                  fontWeight: '600',
                  marginBottom: spacing.md,
                }}
              >
                How to unlock your device
              </Text>
              <View style={{ gap: spacing.sm }}>
                <StepItem number="1" text="Tap 'Pay & Unlock Device' button" colors={colors} />
                <StepItem
                  number="2"
                  text="Approve the PYUSD token payment"
                  colors={colors}
                />
                <StepItem
                  number="3"
                  text="Wait for transaction confirmation"
                  colors={colors}
                />
                <StepItem
                  number="4"
                  text="Device will unlock automatically"
                  colors={colors}
                />
              </View>
            </View>

            {/* Emergency Contact */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: spacing.lg,
              }}
            >
              <Feather name="help-circle" size={20} color={colors.primaryPink} />
              <Text
                style={{
                  fontSize: 16,
                  color: colors.primaryPink,
                  fontWeight: '600',
                  marginLeft: spacing.sm,
                }}
              >
                Need help? Contact support
              </Text>
            </TouchableOpacity>

            {/* Device Status */}
            <View
              style={{
                alignItems: 'center',
                paddingTop: spacing.lg,
                paddingBottom: spacing.xl,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 20, 147, 0.1)',
                  paddingHorizontal: spacing.lg,
                  paddingVertical: spacing.md,
                  borderRadius: 20,
                }}
              >
                <Feather name="shield" size={16} color={colors.primaryPink} />
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.primaryPink,
                    fontWeight: '600',
                    marginLeft: spacing.sm,
                  }}
                >
                  Device Locked - Kiosk Mode Active
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

// Step Item Component
function StepItem({ number, text, colors }: any) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: colors.primaryPink,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: spacing.md,
        }}
      >
        <Text style={{ fontSize: 12, color: '#FFFFFF', fontWeight: '600' }}>{number}</Text>
      </View>
      <Text
        style={{
          flex: 1,
          fontSize: 14,
          color: colors.mutedText,
          lineHeight: 20,
        }}
      >
        {text}
      </Text>
    </View>
  );
}
