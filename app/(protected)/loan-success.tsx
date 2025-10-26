import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Colors, spacing } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useLoanStore } from '@/src/store/loanStore';
import { useEffect } from 'react';

export default function LoanSuccessScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();
  const lockDevice = useLoanStore(state => state.lockDevice);

  // Get loan parameters from router or use defaults
  const loanAmount = params.amount ? parseFloat(params.amount as string) : 7000.00;
  const totalToPay = params.totalToPay ? parseFloat(params.totalToPay as string) : 12768.21;
  const monthlyPayment = params.monthlyPayment ? parseFloat(params.monthlyPayment as string) : 1064.02;
  const weeklyPayment = params.weeklyPayment ? parseFloat(params.weeklyPayment as string) : monthlyPayment / 4;
  const term = params.term ? parseInt(params.term as string) : 12;
  const firstPaymentDate = (params.firstPaymentDate as string) || '26 NOV';
  const interestRate = params.interestRate ? parseFloat(params.interestRate as string) : 8.95;
  const monthlyInterestRate = 8.95;

  // Check if this is from bill payment flow
  const fromBillPayment = params.fromBillPayment === 'true';
  const serviceName = (params.service as string) || '';
  const serviceNumber = (params.serviceNumber as string) || '';

  /**
   * Auto-activate kiosk mode after 3 seconds and navigate
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('🔒 Auto-activating kiosk mode after loan approval...');
      lockDevice('loan_accepted');

      if (fromBillPayment) {
        // If from bill payment, navigate to service payment success screen with loan info
        router.push({
          pathname: '/(protected)/service-payment-success',
          params: {
            service: serviceName,
            serviceNumber: serviceNumber,
            amount: loanAmount.toString(),
            paymentMethod: 'loan',
            weeklyPayment: weeklyPayment.toString(),
            term: term.toString(),
            interestRate: interestRate.toString(),
          }
        });
      } else {
        // Regular loan flow - navigate to kiosk lock screen
        router.push('/(protected)/kiosk-lock');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [lockDevice, router, fromBillPayment, serviceName, serviceNumber, loanAmount, weeklyPayment, term, interestRate]);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View
        style={{ flex: 1, backgroundColor: '#000000' }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + spacing.xl }}
        >
          {/* Success Icon Section */}
          <View style={{
            paddingTop: insets.top + spacing.xxxl,
            paddingHorizontal: spacing.xl,
            alignItems: 'center',
            marginBottom: spacing.xxl,
          }}>
            {/* Success Circle */}
            <View style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: 'rgba(255,255,255,0.2)',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: spacing.xl,
            }}>
              <View style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: '#FFFFFF',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Feather name="check" size={60} color="#FF1493" />
              </View>
            </View>

            {/* Success Title */}
            <Text style={{
              fontSize: 32,
              color: '#FFFFFF',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: spacing.md,
            }}>
              Loan approved!
            </Text>

            {/* Success Message */}
            <Text style={{
              fontSize: 16,
              color: 'rgba(255,255,255,0.9)',
              textAlign: 'center',
              lineHeight: 24,
            }}>
              Your loan has been processed successfully
            </Text>
          </View>

          {/* White Content Card */}
          <View style={{
            backgroundColor: colors.mainBackground,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: spacing.xxl,
            paddingHorizontal: spacing.xl,
            minHeight: 400,
          }}>
            {/* Loan Amount Section */}
            <View style={{
              alignItems: 'center',
              marginBottom: spacing.xxl,
              paddingBottom: spacing.xl,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}>
              <Text style={{
                fontSize: 16,
                color: colors.mutedText,
                marginBottom: spacing.sm,
              }}>
                Amount received
              </Text>
              <Text style={{
                fontSize: 48,
                color: colors.primaryPink,
                fontWeight: '700',
                marginBottom: spacing.lg,
              }}>
                ${loanAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Text>
              <Text style={{
                fontSize: 14,
                color: colors.mutedText,
                textAlign: 'center',
              }}>
                The money is now available in your Cerca Account
              </Text>
            </View>

            {/* Loan Summary */}
            <View style={{ marginBottom: spacing.xxl }}>
              <Text style={{
                fontSize: 20,
                color: '#FFFFFF',
                fontWeight: '600',
                marginBottom: spacing.lg,
              }}>
                Loan details
              </Text>

              {/* Total to Pay */}
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: spacing.md,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              }}>
                <Text style={{
                  fontSize: 16,
                  color: colors.mutedText,
                }}>
                  Total to pay
                </Text>
                <Text style={{
                  fontSize: 16,
                  color: '#FFFFFF',
                  fontWeight: '600',
                }}>
                  ${totalToPay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Text>
              </View>

              {/* Monthly Payment */}
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: spacing.md,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              }}>
                <Text style={{
                  fontSize: 16,
                  color: colors.mutedText,
                }}>
                  Monthly payment
                </Text>
                <Text style={{
                  fontSize: 16,
                  color: '#FFFFFF',
                  fontWeight: '600',
                }}>
                  ${monthlyPayment.toFixed(2)}
                </Text>
              </View>

              {/* Term */}
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: spacing.md,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              }}>
                <Text style={{
                  fontSize: 16,
                  color: colors.mutedText,
                }}>
                  Term
                </Text>
                <Text style={{
                  fontSize: 16,
                  color: '#FFFFFF',
                  fontWeight: '600',
                }}>
                  {term} months
                </Text>
              </View>

              {/* First Payment */}
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: spacing.md,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              }}>
                <Text style={{
                  fontSize: 16,
                  color: colors.mutedText,
                }}>
                  First payment
                </Text>
                <Text style={{
                  fontSize: 16,
                  color: '#FFFFFF',
                  fontWeight: '600',
                }}>
                  {firstPaymentDate}
                </Text>
              </View>

              {/* Interest Rate */}
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: spacing.md,
              }}>
                <Text style={{
                  fontSize: 16,
                  color: colors.mutedText,
                }}>
                  Monthly interest rate
                </Text>
                <Text style={{
                  fontSize: 16,
                  color: '#FFFFFF',
                  fontWeight: '600',
                }}>
                  {monthlyInterestRate}%
                </Text>
              </View>
            </View>

            {/* Info Card */}
            <View style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 12,
              padding: spacing.lg,
              marginBottom: spacing.xxl,
              borderWidth: 1,
              borderColor: colors.border,
            }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
              }}>
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: 'rgba(255, 20, 147, 0.15)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: spacing.md,
                }}>
                  <Feather name="info" size={20} color={colors.primaryPink} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 14,
                    color: colors.mutedText,
                    lineHeight: 20,
                  }}>
                    Payments will be automatically charged to your Cerca Account on the due date each month.
                  </Text>
                </View>
              </View>
            </View>

            {/* Back to Home Button */}
            <TouchableOpacity
              onPress={() => router.push('/(protected)/home')}
              style={{
                backgroundColor: colors.primaryPink,
                borderRadius: 50,
                paddingVertical: spacing.lg,
                alignItems: 'center',
                marginBottom: spacing.xl,
              }}
            >
              <Text style={{
                fontSize: 18,
                color: '#FFFFFF',
                fontWeight: '600',
              }}>
                Go to Home
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
