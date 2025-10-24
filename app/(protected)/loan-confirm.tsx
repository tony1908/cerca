import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Colors, spacing } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import { useRouter } from 'expo-router';

export default function LoanConfirmScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const loanAmount = 7000.00;
  const totalToPay = 12768.21;
  const monthlyPayment = 1064.02;
  const term = 12;
  const firstPaymentDate = '26 NOV';
  const monthlyInterestRate = 8.95;
  const annualCost = 175.52;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.mainBackground} />
      <View style={{ flex: 1, backgroundColor: colors.mainBackground }}>
        {/* Header with back button */}
        <View style={{
          paddingTop: insets.top + spacing.md,
          paddingHorizontal: spacing.xl,
          paddingBottom: spacing.lg,
        }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Feather name="chevron-left" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {/* Title and Amount Section */}
          <View style={{ paddingHorizontal: spacing.xl, marginBottom: spacing.xl }}>
            <Text style={{
              fontSize: 28,
              color: '#FFFFFF',
              fontWeight: '700',
              marginBottom: spacing.md,
              lineHeight: 34,
            }}>
              You will receive a loan of
            </Text>
            <Text style={{
              fontSize: 48,
              color: colors.primaryPink,
              fontWeight: '700',
              marginBottom: spacing.lg,
            }}>
              ${loanAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Text>

            {/* Total to Pay */}
            <View style={{ marginBottom: spacing.xxl }}>
              <Text style={{
                fontSize: 16,
                color: colors.mutedText,
                marginBottom: spacing.xs,
              }}>
                Total to pay
              </Text>
              <Text style={{
                fontSize: 32,
                color: '#FFFFFF',
                fontWeight: '700',
              }}>
                ${totalToPay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Text>
            </View>
          </View>

          {/* Divider */}
          <View style={{
            height: 1,
            backgroundColor: colors.border,
            marginBottom: spacing.xl,
          }} />

          {/* Payment Method Section */}
          <View style={{ paddingHorizontal: spacing.xl, marginBottom: spacing.xl }}>
            <Text style={{
              fontSize: 16,
              color: colors.mutedText,
              marginBottom: spacing.md,
            }}>
              Payment method
            </Text>
            <TouchableOpacity style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: spacing.md,
            }}>
              <Text style={{
                fontSize: 18,
                color: '#FFFFFF',
                fontWeight: '600',
                flex: 1,
              }}>
                Automatic charge to your Cerca Account
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{
                  fontSize: 14,
                  color: colors.primaryPink,
                  marginRight: spacing.sm,
                  fontWeight: '500',
                }}>
                  See details
                </Text>
                <Feather name="chevron-right" size={20} color={colors.primaryPink} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={{
            height: 1,
            backgroundColor: colors.border,
            marginBottom: spacing.xl,
          }} />

          {/* Term Section */}
          <View style={{ paddingHorizontal: spacing.xl, marginBottom: spacing.xl }}>
            <Text style={{
              fontSize: 16,
              color: colors.mutedText,
              marginBottom: spacing.md,
            }}>
              Term
            </Text>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: spacing.sm,
            }}>
              <Text style={{
                fontSize: 18,
                color: '#FFFFFF',
                fontWeight: '600',
              }}>
                {term} monthly payments of ${monthlyPayment.toFixed(2)}
              </Text>
              <Feather name="chevron-down" size={20} color="#FFFFFF" />
            </View>
          </View>

          {/* Divider */}
          <View style={{
            height: 1,
            backgroundColor: colors.border,
            marginBottom: spacing.xl,
          }} />

          {/* First Payment Date Section */}
          <View style={{ paddingHorizontal: spacing.xl, marginBottom: spacing.xl }}>
            <Text style={{
              fontSize: 16,
              color: colors.mutedText,
              marginBottom: spacing.md,
            }}>
              First payment date
            </Text>
            <Text style={{
              fontSize: 18,
              color: '#FFFFFF',
              fontWeight: '600',
            }}>
              {firstPaymentDate}
            </Text>
          </View>

          {/* Divider */}
          <View style={{
            height: 1,
            backgroundColor: colors.border,
            marginBottom: spacing.xl,
          }} />

          {/* Cost Information Section */}
          <View style={{ paddingHorizontal: spacing.xl, marginBottom: spacing.xl }}>
            <Text style={{
              fontSize: 16,
              color: '#FFFFFF',
              fontWeight: '600',
              marginBottom: spacing.md,
            }}>
              Cost information
            </Text>
            <Text style={{
              fontSize: 14,
              color: colors.mutedText,
              lineHeight: 20,
              marginBottom: spacing.xs,
            }}>
              Fixed monthly interest rate {monthlyInterestRate}% without VAT
            </Text>
            <Text style={{
              fontSize: 14,
              color: colors.mutedText,
              lineHeight: 20,
              marginBottom: spacing.lg,
            }}>
              Total Annual Cost (CAT) of offer {annualCost}% without VAT
            </Text>
            <TouchableOpacity style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Text style={{
                fontSize: 16,
                color: colors.primaryPink,
                fontWeight: '600',
                marginRight: spacing.sm,
              }}>
                See details
              </Text>
              <Feather name="arrow-right" size={20} color={colors.primaryPink} />
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Bottom CTA */}
        <View style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: colors.mainBackground,
          paddingTop: spacing.lg,
          paddingBottom: insets.bottom + spacing.lg,
          paddingHorizontal: spacing.xl,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        }}>
          <TouchableOpacity
            onPress={() => router.push('/(protected)/loan-success')}
            style={{
              backgroundColor: colors.primaryPink,
              borderRadius: 50,
              paddingVertical: spacing.lg,
              alignItems: 'center',
            }}
          >
            <Text style={{
              fontSize: 18,
              color: '#FFFFFF',
              fontWeight: '600',
            }}>
              Start contracting
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
