import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, spacing } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import { useRouter } from 'expo-router';

export default function WalletScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const balance = 250.50;
  const walletAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';

  const recentTransactions = [
    {
      id: '1',
      type: 'deposit',
      amount: 200,
      description: 'USDC Deposit',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: '2',
      type: 'payment',
      amount: -50,
      description: 'Loan Repayment',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
  ];

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#FF1493" />
      <LinearGradient
        colors={['#FF1493', '#C71585']}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={{ paddingTop: insets.top }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: spacing.xl,
            paddingVertical: spacing.lg,
          }}>
            <TouchableOpacity onPress={() => router.back()}>
              <Feather name="arrow-left" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={{
              fontSize: 18,
              color: '#FFFFFF',
              fontWeight: '600',
            }}>
              Billetera
            </Text>
            <TouchableOpacity>
              <Feather name="help-circle" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Balance Display */}
          <View style={{ paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl }}>
            <Text style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.8)',
              marginBottom: spacing.sm,
            }}>
              Saldo disponible
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: spacing.md }}>
              <Text style={{
                fontSize: 36,
                color: '#FFFFFF',
                fontWeight: '700',
              }}>
                ${balance.toFixed(2)}
              </Text>
              <Text style={{
                fontSize: 16,
                color: 'rgba(255,255,255,0.8)',
                marginLeft: spacing.sm,
              }}>
                USDC
              </Text>
            </View>
            <TouchableOpacity style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.2)',
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.sm,
              borderRadius: 20,
              alignSelf: 'flex-start',
            }}>
              <Text style={{
                fontSize: 12,
                color: '#FFFFFF',
                marginRight: spacing.sm,
              }}>
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </Text>
              <Feather name="copy" size={14} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* White Content Area */}
        <View style={{
          flex: 1,
          backgroundColor: colors.mainBackground,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            {/* Quick Actions */}
            <View style={{
              flexDirection: 'row',
              paddingHorizontal: spacing.xl,
              paddingVertical: spacing.xxl,
              gap: spacing.md,
            }}>
              <QuickActionButton
                icon="arrow-down"
                label="Depositar"
                onPress={() => {}}
                colors={colors}
                primary
              />
              <QuickActionButton
                icon="arrow-up"
                label="Retirar"
                onPress={() => {}}
                colors={colors}
              />
              <QuickActionButton
                icon="repeat"
                label="Cambiar"
                onPress={() => {}}
                colors={colors}
              />
            </View>

            {/* Features Section */}
            <View style={{ paddingHorizontal: spacing.xl, marginBottom: spacing.xl }}>
              <Text style={{
                fontSize: 18,
                color: colors.primaryText,
                fontWeight: '600',
                marginBottom: spacing.lg,
              }}>
                Funciones
              </Text>

              <FeatureCard
                icon="credit-card"
                title="Tarjeta virtual"
                description="Solicita tu tarjeta USDC"
                colors={colors}
                onPress={() => {}}
              />
              <FeatureCard
                icon="shield"
                title="Seguridad"
                description="Configura tu autenticación"
                colors={colors}
                onPress={() => {}}
              />
              <FeatureCard
                icon="bar-chart-2"
                title="Rendimientos"
                description="Gana intereses con tu saldo"
                colors={colors}
                onPress={() => {}}
              />
            </View>

            {/* Recent Activity */}
            <View style={{ paddingHorizontal: spacing.xl }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: spacing.lg
              }}>
                <Text style={{
                  fontSize: 18,
                  color: colors.primaryText,
                  fontWeight: '600',
                }}>
                  Actividad reciente
                </Text>
                <TouchableOpacity>
                  <Text style={{
                    fontSize: 14,
                    color: colors.primaryPink,
                    fontWeight: '500',
                  }}>
                    Ver todo
                  </Text>
                </TouchableOpacity>
              </View>

              {recentTransactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                  colors={colors}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </>
  );
}

function QuickActionButton({ icon, label, onPress, colors, primary }: any) {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: primary ? colors.primaryPink : colors.cardBackground,
        borderRadius: 12,
        paddingVertical: spacing.lg,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: primary ? colors.primaryPink : colors.border,
      }}
      onPress={onPress}
    >
      <Feather
        name={icon}
        size={24}
        color="#FFFFFF"
        style={{ marginBottom: spacing.sm }}
      />
      <Text style={{
        fontSize: 14,
        color: '#FFFFFF',
        fontWeight: '500',
      }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function FeatureCard({ icon, title, description, colors, onPress }: any) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.cardBackground,
        borderRadius: 12,
        padding: spacing.lg,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
      }}
      onPress={onPress}
    >
      <View style={{
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255, 20, 147, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.lg,
      }}>
        <Feather name={icon} size={24} color={colors.primaryPink} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{
          fontSize: 16,
          color: '#FFFFFF',
          fontWeight: '600',
          marginBottom: 2,
        }}>
          {title}
        </Text>
        <Text style={{
          fontSize: 14,
          color: colors.mutedText,
        }}>
          {description}
        </Text>
      </View>
      <Feather name="chevron-right" size={20} color={colors.mutedText} />
    </TouchableOpacity>
  );
}

function TransactionItem({ transaction, colors }: any) {
  const isPositive = transaction.amount > 0;

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      <View style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: isPositive ? 'rgba(0, 255, 136, 0.15)' : 'rgba(255, 59, 48, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
      }}>
        <Feather
          name={isPositive ? 'arrow-down-left' : 'arrow-up-right'}
          size={20}
          color={isPositive ? colors.success : colors.error}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{
          fontSize: 16,
          color: '#FFFFFF',
          fontWeight: '500',
        }}>
          {transaction.description}
        </Text>
        <Text style={{
          fontSize: 14,
          color: colors.mutedText,
          marginTop: 2,
        }}>
          {transaction.timestamp.toLocaleDateString()}
        </Text>
      </View>
      <Text style={{
        fontSize: 16,
        color: isPositive ? colors.success : '#FFFFFF',
        fontWeight: '600',
      }}>
        {isPositive ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
      </Text>
    </TouchableOpacity>
  );
}