import { View, Text, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Colors, spacing } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useRequestLoan } from '@/src/features/wallet/hooks/useLoanQuery';
import { ethers } from 'ethers';
import { useState } from 'react';

export default function LoanConfirmScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();

  // Get loan parameters from router or use defaults
  const loanAmount = params.amount ? parseFloat(params.amount as string) : 7000.00;
  const totalToPay = params.totalToPay ? parseFloat(params.totalToPay as string) : 12768.21;
  const monthlyPayment = params.monthlyPayment ? parseFloat(params.monthlyPayment as string) : 1064.02;
  const term = params.term ? parseInt(params.term as string) : 12;
  const firstPaymentDate = (params.firstPaymentDate as string) || '26 NOV';
  const maxPaymentDateISO = (params.maxPaymentDate as string) || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  const monthlyInterestRate = 8.95;
  const annualCost = 175.52;

  const [transactionStatus, setTransactionStatus] = useState<string>('');

  // TanStack Query mutation for requesting loan
  const { mutate: requestLoan, isPending, isError, error } = useRequestLoan();

  /**
   * Handle loan request transaction
   */
  const handleRequestLoan = async () => {
    try {
      setTransactionStatus('Preparing transaction...');

      // Convert amount to wei (18 decimals for MXN token)
      const amountWei = ethers.parseUnits(loanAmount.toString(), 18);

      // Convert max payment date to Unix timestamp
      const maxPaymentDate = Math.floor(new Date(maxPaymentDateISO).getTime() / 1000);

      console.log('📝 Requesting loan with params:', {
        amount: amountWei.toString(),
        maxPaymentDate,
      });

      // Execute smart contract transaction
      requestLoan(
        {
          amount: amountWei,
          maxPaymentDate: BigInt(maxPaymentDate),
        },
        {
          onSuccess: (txHash) => {
            console.log('✅ Loan requested successfully:', txHash);
            setTransactionStatus(`Success! Transaction: ${txHash.substring(0, 10)}...`);

            // Navigate to success screen after 1 second
            setTimeout(() => {
              router.push({
                pathname: '/(protected)/loan-success',
                params: {
                  amount: loanAmount.toString(),
                  totalToPay: totalToPay.toString(),
                  monthlyPayment: monthlyPayment.toString(),
                  term: term.toString(),
                  firstPaymentDate,
                  txHash,
                },
              });
            }, 1000);
          },
          onError: (err: any) => {
            console.error('❌ Loan request failed:', err);
            const errorMessage = err.message || 'Transaction failed';
            setTransactionStatus(`Error: ${errorMessage}`);

            // Show alert for user feedback
            Alert.alert(
              'Transaction Failed',
              errorMessage,
              [{ text: 'OK', onPress: () => setTransactionStatus('') }]
            );
          },
        }
      );
    } catch (err: any) {
      console.error('❌ Error preparing loan request:', err);
      const errorMessage = err.message || 'Failed to prepare transaction';
      setTransactionStatus(`Error: ${errorMessage}`);
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={{ flex: 1, backgroundColor: colors.mainBackground }}>

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

          {/* Transaction Status */}
          {(isPending || transactionStatus) && (
            <View style={{
              paddingHorizontal: spacing.xl,
              marginBottom: spacing.xl,
            }}>
              <View style={{
                backgroundColor: isError ? 'rgba(255, 59, 48, 0.1)' : 'rgba(0, 255, 136, 0.1)',
                borderRadius: 12,
                padding: spacing.lg,
                borderWidth: 1,
                borderColor: isError ? colors.error : colors.success,
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {isPending && <ActivityIndicator color={colors.primaryPink} style={{ marginRight: spacing.sm }} />}
                  <Text style={{
                    fontSize: 14,
                    color: isError ? colors.error : '#FFFFFF',
                    flex: 1,
                  }}>
                    {isPending ? 'Processing transaction...' : transactionStatus}
                  </Text>
                </View>
              </View>
            </View>
          )}
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
            onPress={handleRequestLoan}
            disabled={isPending}
            style={{
              backgroundColor: isPending ? colors.mutedText : colors.primaryPink,
              borderRadius: 50,
              paddingVertical: spacing.lg,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            {isPending && (
              <ActivityIndicator color="#FFFFFF" style={{ marginRight: spacing.sm }} />
            )}
            <Text style={{
              fontSize: 18,
              color: '#FFFFFF',
              fontWeight: '600',
            }}>
              {isPending ? 'Processing...' : 'Start contracting'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
