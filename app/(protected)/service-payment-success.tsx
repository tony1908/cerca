import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Colors, spacing } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ServicePaymentSuccessScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();

  const serviceName = (params.service as string) || 'Service';
  const serviceNumber = (params.serviceNumber as string) || '';
  const amount = (params.amount as string) || '0.00';

  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    const time = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    return { date, time };
  };

  const { date, time } = getCurrentDateTime();

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
              Payment successful!
            </Text>

            {/* Success Message */}
            <Text style={{
              fontSize: 16,
              color: 'rgba(255,255,255,0.9)',
              textAlign: 'center',
              lineHeight: 24,
            }}>
              Your service payment has been processed
            </Text>
          </View>

          {/* White Content Card */}
          <View style={{
            backgroundColor: colors.mainBackground,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: spacing.xxl,
            paddingHorizontal: spacing.xl,
            minHeight: 500,
          }}>
            {/* Amount Section */}
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
                Amount paid
              </Text>
              <Text style={{
                fontSize: 48,
                color: colors.primaryPink,
                fontWeight: '700',
                marginBottom: spacing.lg,
              }}>
                ${amount}
              </Text>
            </View>

            {/* Payment Details */}
            <View style={{ marginBottom: spacing.xxl }}>
              <Text style={{
                fontSize: 20,
                color: '#FFFFFF',
                fontWeight: '600',
                marginBottom: spacing.lg,
              }}>
                Payment details
              </Text>

              {/* Service Name */}
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
                  Service
                </Text>
                <Text style={{
                  fontSize: 16,
                  color: '#FFFFFF',
                  fontWeight: '600',
                }}>
                  {serviceName}
                </Text>
              </View>

              {/* Service Number */}
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
                  Service number
                </Text>
                <Text style={{
                  fontSize: 16,
                  color: '#FFFFFF',
                  fontWeight: '600',
                }}>
                  {serviceNumber}
                </Text>
              </View>

              {/* Payment Date */}
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
                  Date
                </Text>
                <Text style={{
                  fontSize: 16,
                  color: '#FFFFFF',
                  fontWeight: '600',
                }}>
                  {date}
                </Text>
              </View>

              {/* Payment Time */}
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
                  Time
                </Text>
                <Text style={{
                  fontSize: 16,
                  color: '#FFFFFF',
                  fontWeight: '600',
                }}>
                  {time}
                </Text>
              </View>

              {/* Transaction ID */}
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: spacing.md,
              }}>
                <Text style={{
                  fontSize: 16,
                  color: colors.mutedText,
                }}>
                  Transaction ID
                </Text>
                <Text style={{
                  fontSize: 16,
                  color: '#FFFFFF',
                  fontWeight: '600',
                }}>
                  #TXN{Math.floor(Math.random() * 1000000)}
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
                    This payment has been charged to your Cerca Account. You can view all your transactions in the history section.
                  </Text>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={{ gap: spacing.md, marginBottom: spacing.xl }}>
              {/* Save Receipt Button */}
              <TouchableOpacity style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.cardBackground,
                borderRadius: 50,
                paddingVertical: spacing.lg,
                borderWidth: 1,
                borderColor: colors.border,
              }}>
                <Feather name="download" size={20} color={colors.primaryPink} />
                <Text style={{
                  fontSize: 18,
                  color: colors.primaryPink,
                  fontWeight: '600',
                  marginLeft: spacing.sm,
                }}>
                  Save Receipt
                </Text>
              </TouchableOpacity>

              {/* Back to Home Button */}
              <TouchableOpacity
                onPress={() => router.push('/(protected)/home')}
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
                  Back to Home
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}