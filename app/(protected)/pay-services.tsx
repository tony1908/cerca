import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Colors, spacing } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import { useRouter } from 'expo-router';

export default function PayServicesScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const serviceProviders = [
    {
      id: 'totalplay',
      name: 'Totalplay',
      logo: '🌐',
      category: 'Internet & TV',
    },
    {
      id: 'izzi',
      name: 'izzi',
      logo: '📺',
      category: 'Cable & Internet',
    },
    {
      id: 'cfe',
      name: 'CFE',
      logo: '💡',
      category: 'Electricity',
    },
    {
      id: 'telmex',
      name: 'Telmex',
      logo: '☎️',
      category: 'Phone & Internet',
    },
    {
      id: 'netflix',
      name: 'Netflix',
      logo: '🎬',
      category: 'Streaming',
    },
    {
      id: 'spotify',
      name: 'Spotify',
      logo: '🎵',
      category: 'Music',
    },
  ];

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.mainBackground} />
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
              marginBottom: spacing.lg,
            }}
          >
            <Feather name="x" size={28} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Service Categories */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: spacing.xl,
          }}>
            <TouchableOpacity style={{ alignItems: 'center' }}>
              <View style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: colors.cardBackground,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: spacing.sm,
                borderWidth: 1,
                borderColor: colors.border,
              }}>
                <Feather name="file-text" size={32} color="#FFFFFF" />
              </View>
              <Text style={{
                fontSize: 14,
                color: '#FFFFFF',
                textAlign: 'center',
              }}>
                New service
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignItems: 'center' }}>
              <View style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: colors.cardBackground,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: spacing.sm,
                borderWidth: 1,
                borderColor: colors.border,
              }}>
                <Feather name="smartphone" size={32} color="#FFFFFF" />
              </View>
              <Text style={{
                fontSize: 14,
                color: '#FFFFFF',
                textAlign: 'center',
              }}>
                Mobile top-up
              </Text>
            </TouchableOpacity>
          </View>

          {/* Info Text */}
          <Text style={{
            fontSize: 18,
            color: '#FFFFFF',
            fontWeight: '600',
            marginBottom: spacing.sm,
          }}>
            Pay and save your services at no cost.
          </Text>
          <Text style={{
            fontSize: 14,
            color: colors.mutedText,
            lineHeight: 20,
          }}>
            This way you can check when you have pending payments.
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + spacing.xl }}
        >
          {/* Suggestions Section */}
          <View style={{ paddingHorizontal: spacing.xl }}>
            <Text style={{
              fontSize: 16,
              color: colors.mutedText,
              marginBottom: spacing.lg,
              fontWeight: '500',
            }}>
              Suggestions
            </Text>

            {/* Service Provider List */}
            {serviceProviders.map((provider) => (
              <TouchableOpacity
                key={provider.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: spacing.lg,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                }}
                onPress={() => router.push({
                  pathname: '/(protected)/service-payment',
                  params: { service: provider.name }
                })}
              >
                <View style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: '#FFFFFF',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: spacing.lg,
                }}>
                  <Text style={{ fontSize: 28 }}>{provider.logo}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 18,
                    color: '#FFFFFF',
                    fontWeight: '600',
                    marginBottom: 2,
                  }}>
                    {provider.name}
                  </Text>
                  <Text style={{
                    fontSize: 14,
                    color: colors.mutedText,
                  }}>
                    {provider.category}
                  </Text>
                </View>
                <Feather name="chevron-right" size={24} color={colors.mutedText} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Bottom Search Bar */}
        <View style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: colors.mainBackground,
          paddingTop: spacing.md,
          paddingBottom: insets.bottom + spacing.md,
          paddingHorizontal: spacing.xl,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        }}>
          <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.cardBackground,
            borderRadius: 50,
            paddingHorizontal: spacing.lg,
            paddingVertical: spacing.md,
            borderWidth: 1,
            borderColor: colors.border,
          }}>
            <Text style={{
              flex: 1,
              fontSize: 16,
              color: colors.mutedText,
            }}>
              Search more services
            </Text>
            <Feather name="search" size={20} color={colors.mutedText} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}