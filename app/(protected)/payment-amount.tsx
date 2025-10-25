import { View, Text, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Colors, spacing } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

export default function PaymentAmountScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();
  const serviceName = (params.service as string) || 'Service';
  const serviceNumber = (params.serviceNumber as string) || '';

  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const formatAmount = (value: string) => {
    // Remove all non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');
    if (!numericValue) return '';

    // Convert to number and format
    const number = parseInt(numericValue) / 100;
    return number.toFixed(2);
  };

  const handleKeyPress = (value: string) => {
    const newAmount = amount.replace(/[^0-9]/g, '') + value;
    setAmount(formatAmount(newAmount));
  };

  const handleDelete = () => {
    const numericValue = amount.replace(/[^0-9]/g, '');
    const newAmount = numericValue.slice(0, -1);
    setAmount(formatAmount(newAmount));
  };

  const handleContinue = () => {
    const numericAmount = parseFloat(amount);
    if (numericAmount >= 1.00) {
      setIsLoading(true);
      // Simulate processing delay
      setTimeout(() => {
        router.push({
          pathname: '/(protected)/service-payment-success',
          params: {
            service: serviceName,
            serviceNumber: serviceNumber,
            amount: amount
          }
        });
      }, 5000);
    }
  };

  const getAmountValue = () => {
    const numericAmount = parseFloat(amount || '0');
    return numericAmount;
  };

  const keypadButtons = [
    { value: '1', label: '1', subLabel: '' },
    { value: '2', label: '2', subLabel: 'ABC' },
    { value: '3', label: '3', subLabel: 'DEF' },
    { value: '4', label: '4', subLabel: 'GHI' },
    { value: '5', label: '5', subLabel: 'JKL' },
    { value: '6', label: '6', subLabel: 'MNO' },
    { value: '7', label: '7', subLabel: 'PQRS' },
    { value: '8', label: '8', subLabel: 'TUV' },
    { value: '9', label: '9', subLabel: 'WXYZ' },
    { value: '', label: '', subLabel: '' }, // Empty space
    { value: '0', label: '0', subLabel: '' },
    { value: 'delete', label: '⌫', subLabel: '' },
  ];

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={{ flex: 1, backgroundColor: colors.mainBackground }}>
        {/* Loading Overlay */}
        {isLoading && (
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999,
          }}>
            <ActivityIndicator size="large" color={colors.primaryPink} />
            <Text style={{
              fontSize: 18,
              color: '#FFFFFF',
              marginTop: spacing.lg,
              fontWeight: '600',
            }}>
              Processing payment...
            </Text>
          </View>
        )}
        {/* Header */}
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

          {/* Progress Indicator */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: spacing.lg,
            marginBottom: spacing.xl,
            gap: spacing.sm,
          }}>
            <View style={{
              height: 3,
              width: 60,
              backgroundColor: colors.primaryPink,
              borderRadius: 2,
            }} />
            <View style={{
              height: 3,
              width: 60,
              backgroundColor: colors.primaryPink,
              borderRadius: 2,
            }} />
            <View style={{
              height: 3,
              width: 60,
              backgroundColor: colors.border,
              borderRadius: 2,
            }} />
          </View>

          {/* Title */}
          <Text style={{
            fontSize: 32,
            color: '#FFFFFF',
            fontWeight: '700',
            marginBottom: spacing.md,
            lineHeight: 38,
          }}>
            How much do you want to pay?
          </Text>
          <Text style={{
            fontSize: 16,
            color: colors.mutedText,
            lineHeight: 22,
          }}>
            Enter the amount you will pay for this service.
          </Text>
        </View>

        {/* Amount Display Section */}
        <View style={{
          flex: 1,
          paddingHorizontal: spacing.xl,
          justifyContent: 'center',
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            marginBottom: spacing.lg,
          }}>
            <Text style={{
              fontSize: 48,
              color: '#FFFFFF',
              fontWeight: '700',
              marginRight: spacing.xs,
            }}>
              $
            </Text>
            <Text style={{
              fontSize: 48,
              color: '#FFFFFF',
              fontWeight: '700',
              minWidth: 200,
            }}>
              {amount || '0.00'}
            </Text>
          </View>

          {/* Validation Message */}
          <Text style={{
            fontSize: 16,
            color: getAmountValue() >= 1.00 ? colors.mutedText : colors.error,
          }}>
            Enter an amount greater than $1.00
          </Text>
        </View>

        {/* Bottom Section with Button and Keypad */}
        <View style={{
          backgroundColor: colors.cardBackground,
          paddingTop: spacing.xl,
          paddingBottom: insets.bottom + spacing.lg,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        }}>
          {/* Continue Button */}
          <TouchableOpacity
            onPress={handleContinue}
            disabled={getAmountValue() < 1.00}
            style={{
              backgroundColor: getAmountValue() >= 1.00 ? colors.primaryPink : colors.border,
              marginHorizontal: spacing.xl,
              marginBottom: spacing.xl,
              borderRadius: 50,
              paddingVertical: spacing.lg,
              alignItems: 'center',
              opacity: getAmountValue() >= 1.00 ? 1 : 0.5,
            }}
          >
            <Text style={{
              fontSize: 18,
              color: '#FFFFFF',
              fontWeight: '600',
            }}>
              Continue
            </Text>
          </TouchableOpacity>

          {/* Custom Keypad */}
          <View style={{
            paddingHorizontal: spacing.md,
          }}>
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
              {keypadButtons.map((button, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    if (button.value === 'delete') {
                      handleDelete();
                    } else if (button.value) {
                      handleKeyPress(button.value);
                    }
                  }}
                  disabled={!button.value}
                  style={{
                    width: '30%',
                    height: 55,
                    backgroundColor: button.value ? colors.border : 'transparent',
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: spacing.sm,
                    opacity: button.value ? 1 : 0,
                  }}
                >
                  {button.value && (
                    <>
                      <Text style={{
                        fontSize: button.value === 'delete' ? 20 : 24,
                        color: '#FFFFFF',
                        fontWeight: '600',
                      }}>
                        {button.label}
                      </Text>
                      {button.subLabel ? (
                        <Text style={{
                          fontSize: 9,
                          color: colors.mutedText,
                          marginTop: 1,
                        }}>
                          {button.subLabel}
                        </Text>
                      ) : null}
                    </>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
    </>
  );
}