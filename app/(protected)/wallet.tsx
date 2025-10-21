import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, commonStyles, typography, spacing, borderRadius, shadows } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import TransactionRow from '@/src/shared/components/TransactionRow';

export default function WalletScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();

  const balance = 250.50;
  const walletAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';

  const recentTransactions = [
    {
      id: '1',
      type: 'wallet_deposit' as const,
      amount: 200,
      description: 'USDC Deposit',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: '2',
      type: 'loan_repayment' as const,
      amount: 50,
      description: 'Loan Repayment',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
  ];

  return (
    <View style={[commonStyles.container, { paddingTop: insets.top, paddingBottom: insets.bottom + 90 }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={{ marginBottom: spacing.xl }}>
          <Text style={[typography.primaryTitle, { color: colors.primaryText }]}>
            USDC Wallet
          </Text>
          <Text style={[typography.subtitle, { color: colors.secondaryText, marginTop: spacing.xs }]}>
            Manage your funds
          </Text>
        </View>

        {/* Balance Card */}
        <View style={[
          shadows.convex,
          { borderRadius: borderRadius.large, overflow: 'hidden', marginBottom: spacing.xl }
        ]}>
          <LinearGradient
            colors={[colors.accent, '#FF9AA2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ padding: spacing.xl }}
          >
            <Text style={[typography.subtitle, { color: colors.mainBackground, opacity: 0.9, marginBottom: spacing.sm }]}>
              Available Balance
            </Text>
            <Text style={[typography.hero, { color: colors.mainBackground, fontSize: 48, marginBottom: spacing.lg }]}>
              ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Text>
            <Text style={[typography.subtitle, { color: colors.mainBackground, opacity: 0.8 }]} numberOfLines={1}>
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </Text>
          </LinearGradient>
        </View>

        {/* Action Buttons */}
        <View style={{ flexDirection: 'row', gap: spacing.md, marginBottom: spacing.xxxl }}>
          <ActionCard
            icon="arrow-down"
            title="Deposit"
            onPress={() => {}}
            colors={colors}
          />
          <ActionCard
            icon="arrow-up"
            title="Withdraw"
            onPress={() => {}}
            colors={colors}
          />
        </View>

        {/* Recent Transactions */}
        <View style={{ marginBottom: spacing.xl }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg }}>
            <Text style={[typography.sectionHeader, { color: colors.primaryText }]}>
              Recent Activity
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={[typography.subtitle, { color: colors.accent }]}>
                View All
              </Text>
            </TouchableOpacity>
          </View>

          {recentTransactions.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              type={transaction.type}
              amount={transaction.amount}
              description={transaction.description}
              timestamp={transaction.timestamp}
              onPress={() => {}}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function ActionCard({ icon, title, onPress, colors }: any) {
  return (
    <TouchableOpacity
      style={[
        shadows.standard,
        {
          flex: 1,
          backgroundColor: colors.uiElements,
          borderRadius: borderRadius.medium,
          padding: spacing.xl,
          alignItems: 'center',
        }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name={icon} size={32} color={colors.accent} style={{ marginBottom: spacing.md }} />
      <Text style={[typography.bodyText, { color: colors.primaryText }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
