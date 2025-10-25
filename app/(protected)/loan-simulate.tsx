import { View, Text, ScrollView, TouchableOpacity, StatusBar, Image } from 'react-native';
import { Colors, spacing } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import { useRouter } from 'expo-router';

export default function LoanSimulateScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const router = useRouter();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={{ flex: 1, backgroundColor: colors.mainBackground }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Header Image */}
          <View style={{
            width: '100%',
            height: 300,
            backgroundColor: colors.cardBackground,
            position: 'relative',
          }}>
            {/* Hero Image */}
            <Image
              source={require('@/assets/images/home.png')}
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode="cover"
            />
          </View>

          {/* Content Section */}
          <View style={{ paddingHorizontal: spacing.xl, paddingTop: spacing.xxl }}>
            {/* Title */}
            <Text style={{
              fontSize: 28,
              color: '#FFFFFF',
              fontWeight: '700',
              marginBottom: spacing.sm,
            }}>
              Request your personal loan
            </Text>

            {/* Subtitle */}
            <Text style={{
              fontSize: 16,
              color: colors.mutedText,
              lineHeight: 24,
              marginBottom: spacing.xl,
            }}>
              Receive your money instantly and pay from your Cerca app in the timeframe you choose.
            </Text>

            {/* Feature: Instant */}
            <View style={{ marginBottom: spacing.xxl }}>
              <Text style={{
                fontSize: 20,
                color: '#FFFFFF',
                fontWeight: '600',
                marginBottom: spacing.xl,
              }}>
                Ready in minutes
              </Text>

              {/* Step 1 */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginBottom: spacing.lg,
              }}>
                <View style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: colors.cardBackground,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: spacing.lg,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}>
                  <Text style={{
                    fontSize: 18,
                    color: '#FFFFFF',
                    fontWeight: '600',
                  }}>
                    1
                  </Text>
                </View>
                <View style={{ flex: 1, paddingTop: spacing.sm }}>
                  <Text style={{
                    fontSize: 16,
                    color: '#FFFFFF',
                    lineHeight: 24,
                  }}>
                    Know and personalize your offer
                  </Text>
                </View>
              </View>

              {/* Step 2 */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginBottom: spacing.lg,
              }}>
                <View style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: colors.cardBackground,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: spacing.lg,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}>
                  <Text style={{
                    fontSize: 18,
                    color: '#FFFFFF',
                    fontWeight: '600',
                  }}>
                    2
                  </Text>
                </View>
                <View style={{ flex: 1, paddingTop: spacing.sm }}>
                  <Text style={{
                    fontSize: 16,
                    color: '#FFFFFF',
                    lineHeight: 24,
                  }}>
                    Simulate and contract from the app
                  </Text>
                </View>
              </View>

              {/* Step 3 */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginBottom: spacing.lg,
              }}>
                <View style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: colors.cardBackground,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: spacing.lg,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}>
                  <Text style={{
                    fontSize: 18,
                    color: '#FFFFFF',
                    fontWeight: '600',
                  }}>
                    3
                  </Text>
                </View>
                <View style={{ flex: 1, paddingTop: spacing.sm }}>
                  <Text style={{
                    fontSize: 16,
                    color: '#FFFFFF',
                    lineHeight: 24,
                  }}>
                    Receive the money in your Cerca Account
                  </Text>
                </View>
              </View>
            </View>

            {/* CTA Button */}
            <TouchableOpacity
              style={{
                backgroundColor: colors.primaryPink,
                borderRadius: 50,
                paddingVertical: spacing.lg,
                alignItems: 'center',
                marginBottom: spacing.xl,
              }}
              onPress={() => router.push('/(protected)/loan-calculator')}
            >
              <Text style={{
                fontSize: 18,
                color: '#FFFFFF',
                fontWeight: '600',
              }}>
                Simulate loan
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
