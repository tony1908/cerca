import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, spacing } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

export default function ServiceNumberInputScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();
  const serviceName = (params.service as string) || 'CFE';

  const [serviceNumber, setServiceNumber] = useState('');
  const maxLength = 12;

  const handleKeyPress = (value: string) => {
    if (serviceNumber.length < maxLength) {
      setServiceNumber(serviceNumber + value);
    }
  };

  const handleDelete = () => {
    setServiceNumber(serviceNumber.slice(0, -1));
  };

  const handleNext = () => {
    if (serviceNumber.length > 0) {
      router.push({
        pathname: '/(protected)/payment-amount',
        params: {
          service: serviceName,
          serviceNumber: serviceNumber
        }
      });
    }
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
            <Feather name="x" size={28} color="#FFFFFF" />
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
              backgroundColor: colors.border,
              borderRadius: 2,
            }} />
            <View style={{
              height: 3,
              width: 60,
              backgroundColor: colors.border,
              borderRadius: 2,
            }} />
          </View>

          {/* Service Name */}
          <Text style={{
            fontSize: 32,
            color: '#FFFFFF',
            fontWeight: '700',
            marginBottom: spacing.xl,
          }}>
            {serviceName}
          </Text>
        </View>

        {/* Input Section */}
        <View style={{
          paddingHorizontal: spacing.xl,
          flex: 1,
        }}>
          <Text style={{
            fontSize: 16,
            color: colors.mutedText,
            marginBottom: spacing.lg,
          }}>
            Service number
          </Text>

          {/* Input Display */}
          <View style={{
            borderBottomWidth: 2,
            borderBottomColor: serviceNumber.length > 0 ? colors.primaryPink : colors.border,
            paddingBottom: spacing.md,
            marginBottom: spacing.sm,
            minHeight: 50,
            justifyContent: 'flex-end',
          }}>
            <Text style={{
              fontSize: 24,
              color: '#FFFFFF',
              fontWeight: '600',
              letterSpacing: 2,
            }}>
              {serviceNumber || ' '}
            </Text>
          </View>

          {/* Character Counter */}
          <Text style={{
            fontSize: 14,
            color: colors.mutedText,
            textAlign: 'right',
            marginBottom: spacing.xxl,
          }}>
            {serviceNumber.length}/{maxLength}
          </Text>
        </View>

        {/* Custom Keypad */}
        <View style={{
          backgroundColor: colors.cardBackground,
          paddingTop: spacing.lg,
          paddingBottom: insets.bottom + spacing.lg,
          paddingHorizontal: spacing.md,
          borderTopWidth: 1,
          borderTopColor: colors.border,
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

          {/* Next Button */}
          <TouchableOpacity
            onPress={handleNext}
            disabled={serviceNumber.length === 0}
            style={{
              position: 'absolute',
              bottom: insets.bottom + spacing.xl,
              right: spacing.xl,
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: serviceNumber.length > 0 ? colors.primaryPink : colors.border,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: serviceNumber.length > 0 ? 1 : 0.5,
            }}
          >
            <Feather name="arrow-right" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}