import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Colors, spacing } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ServicePaymentScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();
  const serviceName = (params.service as string) || 'Service';

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.mainBackground} />
      <View style={{ flex: 1, backgroundColor: colors.mainBackground }}>
        {/* Header */}
        <View style={{
          paddingTop: insets.top + spacing.md,
          paddingHorizontal: spacing.xl,
          paddingBottom: spacing.xl,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: spacing.md,
            }}
          >
            <Feather name="chevron-left" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={{
              fontSize: 20,
              color: '#FFFFFF',
              fontWeight: '600',
              textAlign: 'center',
              marginRight: 40, // Balance the back button
            }}>
              How do you want to send your payment?
            </Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + spacing.xl }}
        >
          {/* Payment Options */}
          <View style={{ paddingHorizontal: spacing.xl }}>

            {/* Service Number Option */}
            <TouchableOpacity
              style={{
                paddingVertical: spacing.xl,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              }}
              onPress={() => router.push({
                pathname: '/(protected)/service-number-input',
                params: { service: serviceName }
              })}
            >
              <View>
                <Text style={{
                  fontSize: 20,
                  color: '#FFFFFF',
                  fontWeight: '600',
                  marginBottom: spacing.xs,
                }}>
                  Service number
                </Text>
                <Text style={{
                  fontSize: 16,
                  color: colors.mutedText,
                }}>
                  Payment by manual input
                </Text>
              </View>
              <View style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: [{ translateY: -12 }],
              }}>
                <Feather name="chevron-right" size={24} color={colors.mutedText} />
              </View>
            </TouchableOpacity>

            {/* Barcode Option */}
            <TouchableOpacity
              style={{
                paddingVertical: spacing.xl,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              }}
              onPress={() => {
                // Navigate to barcode scanner
              }}
            >
              <View>
                <Text style={{
                  fontSize: 20,
                  color: '#FFFFFF',
                  fontWeight: '600',
                  marginBottom: spacing.xs,
                }}>
                  Barcode
                </Text>
                <Text style={{
                  fontSize: 16,
                  color: colors.mutedText,
                }}>
                  Payment by barcode
                </Text>
              </View>
              <View style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: [{ translateY: -12 }],
              }}>
                <Feather name="chevron-right" size={24} color={colors.mutedText} />
              </View>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </View>
    </>
  );
}