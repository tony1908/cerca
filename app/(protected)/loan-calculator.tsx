import { View, Text, ScrollView, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Colors, spacing } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function LoanCalculatorScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [loanAmount, setLoanAmount] = useState(7000.00);
  const [selectedTerm, setSelectedTerm] = useState(12);
  const [firstPaymentDate, setFirstPaymentDate] = useState('26 NOV');

  // Calculate monthly payment and total
  const monthlyInterestRate = 0.0895; // 8.95% monthly
  const monthlyPayment = loanAmount * monthlyInterestRate + (loanAmount / selectedTerm);
  const totalToPay = monthlyPayment * selectedTerm;

  const paymentTerms = [
    { months: 3, payment: (loanAmount / 3 + loanAmount * monthlyInterestRate).toFixed(2) },
    { months: 6, payment: (loanAmount / 6 + loanAmount * monthlyInterestRate).toFixed(2) },
    { months: 12, payment: (loanAmount / 12 + loanAmount * monthlyInterestRate).toFixed(2) },
    { months: 18, payment: (loanAmount / 18 + loanAmount * monthlyInterestRate).toFixed(2) },
  ];

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.mainBackground} />
      <View style={{ flex: 1, backgroundColor: colors.mainBackground }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: insets.top + spacing.xxl, paddingBottom: 120 }}
        >
          {/* Title and Amount Section */}
          <View style={{ paddingHorizontal: spacing.xl, marginBottom: spacing.xxl }}>
            <Text style={{
              fontSize: 24,
              color: '#FFFFFF',
              fontWeight: '600',
              marginBottom: spacing.lg,
            }}>
              Calculate loan of
            </Text>

            {/* Editable Amount */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: spacing.md,
            }}>
              <Text style={{
                fontSize: 48,
                color: colors.primaryPink,
                fontWeight: '700',
                marginRight: spacing.md,
              }}>
                ${loanAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Text>
              <TouchableOpacity style={{
                backgroundColor: colors.cardBackground,
                paddingHorizontal: spacing.lg,
                paddingVertical: spacing.sm,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: colors.border,
              }}>
                <Text style={{
                  fontSize: 14,
                  color: '#FFFFFF',
                  fontWeight: '600',
                }}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>

            {/* Edit Info */}
            <Text style={{
              fontSize: 14,
              color: colors.mutedText,
              lineHeight: 20,
            }}>
              You can edit the amount from $500.00 to $7,000.00, the term and first payment date.
            </Text>
          </View>

          {/* Payment Term Section */}
          <View style={{
            paddingHorizontal: spacing.xl,
            marginBottom: spacing.xxl,
          }}>
            <Text style={{
              fontSize: 16,
              color: '#FFFFFF',
              fontWeight: '600',
              marginBottom: spacing.sm,
            }}>
              Term
            </Text>

            <TouchableOpacity style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 12,
              padding: spacing.lg,
              borderWidth: 1,
              borderColor: colors.border,
            }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 18,
                    color: '#FFFFFF',
                    fontWeight: '600',
                    marginBottom: spacing.xs,
                  }}>
                    {selectedTerm} monthly payments of ${monthlyPayment.toFixed(2)}
                  </Text>
                  <Text style={{
                    fontSize: 14,
                    color: colors.mutedText,
                    marginBottom: spacing.xs,
                  }}>
                    Fixed monthly interest rate 8.95% without VAT
                  </Text>
                  <Text style={{
                    fontSize: 14,
                    color: colors.mutedText,
                  }}>
                    Total Annual Cost of offer 175.52% without VAT
                  </Text>
                </View>
                <Feather name="chevron-down" size={24} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          </View>

          {/* First Payment Date Section */}
          <View style={{
            paddingHorizontal: spacing.xl,
            marginBottom: spacing.xxl,
          }}>
            <Text style={{
              fontSize: 16,
              color: '#FFFFFF',
              fontWeight: '600',
              marginBottom: spacing.sm,
            }}>
              First payment date
            </Text>

            <TouchableOpacity style={{
              backgroundColor: colors.cardBackground,
              borderRadius: 12,
              padding: spacing.lg,
              borderWidth: 1,
              borderColor: colors.border,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Text style={{
                fontSize: 18,
                color: '#FFFFFF',
                fontWeight: '600',
              }}>
                {firstPaymentDate}
              </Text>
              <Feather name="chevron-down" size={24} color="#FFFFFF" />
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
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <View>
              <Text style={{
                fontSize: 14,
                color: colors.mutedText,
                marginBottom: spacing.xs,
              }}>
                Total to pay
              </Text>
              <Text style={{
                fontSize: 28,
                color: '#FFFFFF',
                fontWeight: '700',
              }}>
                ${totalToPay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                // Calculate max payment date (30 days from first payment in future)
                const today = new Date();
                const daysUntilPayment = 30; // 30 days to repay
                const maxPaymentDate = new Date(today.getTime() + daysUntilPayment * 24 * 60 * 60 * 1000);

                router.push({
                  pathname: '/(protected)/loan-confirm',
                  params: {
                    amount: loanAmount.toString(),
                    term: selectedTerm.toString(),
                    monthlyPayment: monthlyPayment.toFixed(2),
                    totalToPay: totalToPay.toFixed(2),
                    firstPaymentDate,
                    maxPaymentDate: maxPaymentDate.toISOString(),
                  },
                });
              }}
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: colors.primaryPink,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Feather name="arrow-right" size={28} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
