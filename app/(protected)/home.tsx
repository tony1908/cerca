import { Text, View, ScrollView, TouchableOpacity, StatusBar, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePrivy } from "@privy-io/expo";
import { MaterialCommunityIcons, Feather, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, spacing } from "@/src/shared/design/theme";
import { useColorScheme } from "@/src/shared/hooks/useColorScheme";
import { useRouter } from "expo-router";

const { width } = Dimensions.get('window');

export default function Home() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const { user } = usePrivy();
  const router = useRouter();

  // Mock data - Nu Bank style
  const accountBalance = 0.00;
  const creditCardBalance = 7298.52;
  const creditLimit = 1.48;
  const creditCutoffDate = "03 NOV";

  if (!user) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#FF1493" />
      <LinearGradient
        colors={['#FF1493', '#C71585']}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Purple Header Section */}
          <View style={{ paddingTop: insets.top }}>
            {/* Top Navigation Icons */}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: spacing.xl,
              paddingVertical: spacing.lg,
            }}>
              <TouchableOpacity
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => router.push('/(protected)/profile')}
              >
                <Feather name="user" size={24} color="#FFFFFF" />
              </TouchableOpacity>

              <View style={{ flexDirection: 'row', gap: spacing.lg }}>
                <TouchableOpacity>
                  <Feather name="help-circle" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <MaterialCommunityIcons name="email-outline" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Welcome Message */}
            <View style={{ paddingHorizontal: spacing.xl, marginBottom: spacing.xl }}>
              <Text style={{
                fontSize: 18,
                color: '#FFFFFF',
                fontWeight: '500',
              }}>
                Hello, User
              </Text>
            </View>

            {/* Notification Cards */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: spacing.xl, gap: spacing.md }}
              style={{ marginBottom: spacing.xl }}
            >
              <NotificationCard
                icon="alert-triangle"
                title="Update your information today."
                color="#1A1A1A"
                iconColor="#FFA500"
                textColor="#FFFFFF"
              />
              <NotificationCard
                icon="pie-chart"
                title="Increase your credit limit up to $200 m..."
                color="rgba(255,255,255,0.15)"
                iconColor="#FFFFFF"
                textColor="#FFFFFF"
                showDots
              />
            </ScrollView>
          </View>

          {/* Black Section - Account & Services */}
          <View style={{
            backgroundColor: colors.mainBackground,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            flex: 1,
            minHeight: 600,
          }}>
            {/* Account Balance Card */}
            <TouchableOpacity style={{
              padding: spacing.xl,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                  <Text style={{
                    fontSize: 18,
                    color: colors.primaryText,
                    fontWeight: '500',
                    marginBottom: spacing.sm,
                  }}>
                    Cerca Account
                  </Text>
                  <Text style={{
                    fontSize: 28,
                    color: colors.primaryText,
                    fontWeight: '600',
                  }}>
                    ${accountBalance.toFixed(2)}
                  </Text>
                </View>
                <Feather name="chevron-right" size={24} color={colors.mutedText} />
              </View>
            </TouchableOpacity>

            {/* Quick Actions */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: spacing.xl,
                paddingVertical: spacing.xl,
                gap: spacing.md
              }}
            >
              <QuickAction
                icon="arrow-down"
                iconComponent={Feather}
                label="Receive & Deposit"
                onPress={() => router.push('/(protected)/wallet')}
                colors={colors}
                isNew
              />
              <QuickAction
                icon="arrow-up"
                iconComponent={Feather}
                label="Transfer"
                onPress={() => {}}
                colors={colors}
              />
              <QuickAction
                icon="hand-holding-usd"
                iconComponent={FontAwesome5}
                label="Simulate Loan"
                onPress={() => {}}
                colors={colors}
              />
              <QuickAction
                icon="file-text"
                iconComponent={Feather}
                label="Pay Services"
                onPress={() => {}}
                colors={colors}
              />
              <QuickAction
                icon="mobile"
                iconComponent={Feather}
                label="Top Up Mobile"
                onPress={() => {}}
                colors={colors}
              />
            </ScrollView>

            {/* My Cards Section */}
            <TouchableOpacity style={{
              paddingHorizontal: spacing.xl,
              paddingVertical: spacing.md,
              marginBottom: spacing.lg,
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name="credit-card-outline" size={20} color={colors.mutedText} />
                <Text style={{
                  fontSize: 14,
                  color: colors.mutedText,
                  marginLeft: spacing.sm,
                  fontWeight: '500',
                }}>
                  My Cards
                </Text>
              </View>
            </TouchableOpacity>

            {/* Credit Card Section */}
            <TouchableOpacity style={{
              paddingHorizontal: spacing.xl,
              paddingBottom: spacing.xl,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View>
                  <Text style={{
                    fontSize: 18,
                    color: colors.primaryText,
                    fontWeight: '500',
                    marginBottom: spacing.lg,
                  }}>
                    Credit Card
                  </Text>

                  <Text style={{
                    fontSize: 14,
                    color: colors.mutedText,
                    marginBottom: spacing.xs,
                  }}>
                    Current Balance
                  </Text>
                  <Text style={{
                    fontSize: 24,
                    color: colors.primaryText,
                    fontWeight: '600',
                    marginBottom: spacing.lg,
                  }}>
                    ${creditCardBalance.toFixed(2)}
                  </Text>

                  <Text style={{
                    fontSize: 14,
                    color: colors.mutedText,
                  }}>
                    Cutoff Date: {creditCutoffDate}
                  </Text>
                  <Text style={{
                    fontSize: 14,
                    color: colors.mutedText,
                    marginTop: spacing.xs,
                  }}>
                    Available Limit: ${creditLimit.toFixed(2)}
                  </Text>
                </View>
                <Feather name="chevron-right" size={24} color={colors.mutedText} />
              </View>
            </TouchableOpacity>

            {/* MSI con Nu Section */}
            <TouchableOpacity style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: spacing.xl,
              backgroundColor: colors.cardBackground,
              marginTop: spacing.xl,
              marginHorizontal: spacing.xl,
              borderRadius: 12,
            }}>
              <View style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: colors.primaryPink,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: spacing.md,
              }}>
                <Feather name="percent" size={16} color="#FFFFFF" />
              </View>
              <Text style={{
                fontSize: 16,
                color: colors.primaryText,
                fontWeight: '500',
              }}>
                Interest Free with Cerca
              </Text>
            </TouchableOpacity>

            {/* Bottom Spacing */}
            <View style={{ height: 100 }} />
          </View>
        </ScrollView>
      </LinearGradient>
    </>
  );
}

// Notification Card Component
function NotificationCard({ icon, title, color, iconColor, textColor, showDots }: any) {
  return (
    <View style={{
      backgroundColor: color,
      borderRadius: 12,
      padding: spacing.lg,
      width: width * 0.75,
      minHeight: 120,
      justifyContent: 'space-between',
    }}>
      {showDots && (
        <TouchableOpacity style={{
          position: 'absolute',
          top: spacing.md,
          right: spacing.md,
        }}>
          <MaterialCommunityIcons name="dots-vertical" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      )}

      <View style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: color === '#1A1A1A' ? '#2A2A2A' : 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.md,
      }}>
        <Feather name={icon} size={18} color={iconColor} />
      </View>

      <Text style={{
        fontSize: 14,
        color: textColor,
        fontWeight: '500',
        lineHeight: 20,
      }}>
        {title}
      </Text>
    </View>
  );
}

// Quick Action Button Component
function QuickAction({ icon, iconComponent: Icon, label, onPress, colors, isNew }: any) {
  return (
    <TouchableOpacity onPress={onPress} style={{ alignItems: 'center' }}>
      <View style={{
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: colors.cardBackground,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.sm,
        borderWidth: 1,
        borderColor: colors.border,
      }}>
        {isNew && (
          <View style={{
            position: 'absolute',
            top: -2,
            right: -2,
            backgroundColor: colors.primaryPink,
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: 10,
            zIndex: 1,
          }}>
            <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '600' }}>
              Nuevo
            </Text>
          </View>
        )}
        <Icon name={icon} size={24} color={colors.whiteText} />
      </View>
      <Text style={{
        fontSize: 12,
        color: colors.whiteText,
        textAlign: 'center',
        width: 80,
      }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}