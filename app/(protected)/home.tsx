import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePrivy } from "@privy-io/expo";
import { Ionicons } from "@expo/vector-icons";
import { Colors, commonStyles, typography, spacing, borderRadius, shadows } from "@/src/shared/design/theme";
import { useColorScheme } from "@/src/shared/hooks/useColorScheme";
import CreditLineCard from "@/src/shared/components/CreditLineCard";
import LoanCard from "@/src/shared/components/LoanCard";
import TransactionRow from "@/src/shared/components/TransactionRow";

export default function Home() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const { user } = usePrivy();

  // Mock data - will be replaced with real data from API
  const creditLine = {
    totalAmount: 500,
    availableAmount: 350,
    usedAmount: 150,
    nextPaymentDue: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
  };

  const activeLoans = [
    {
      id: '1',
      amount: 100,
      serviceName: 'CFE - Electricity',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      status: 'active' as const,
    },
    {
      id: '2',
      amount: 50,
      serviceName: 'Telmex - Internet',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      status: 'active' as const,
    },
  ];

  const recentTransactions = [
    {
      id: '1',
      type: 'bill_payment' as const,
      amount: 100,
      description: 'CFE Bill Payment',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: '2',
      type: 'loan_disbursement' as const,
      amount: 100,
      description: 'Loan Approved',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
  ];

  if (!user) {
    return null;
  }

  return (
    <View style={[commonStyles.container, { paddingTop: insets.top, paddingBottom: insets.bottom + 90 }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={{ marginBottom: spacing.xxxl }}>
          
        </View>
        {/* Credit Line Card */}
        <CreditLineCard {...creditLine} />

        {/* Quick Actions */}
        <View style={{ marginBottom: spacing.xxxl }}>
          <Text style={[typography.sectionHeader, { color: colors.primaryText, marginBottom: spacing.lg }]}>
            Quick Actions
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md }}>
            <QuickActionButton
              icon="add-circle"
              title="Request Loan"
              colors={colors}
              onPress={() => {}}
            />
            <QuickActionButton
              icon="cash"
              title="Repay"
              colors={colors}
              onPress={() => {}}
            />
            <QuickActionButton
              icon="wallet"
              title="Wallet"
              colors={colors}
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Active Loans */}
        {activeLoans.length > 0 && (
          <View style={{ marginBottom: spacing.xxxl }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg }}>
              <Text style={[typography.sectionHeader, { color: colors.primaryText }]}>
                Active Loans
              </Text>
              <TouchableOpacity onPress={() => {}}>
                <Text style={[typography.subtitle, { color: colors.accent }]}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            {activeLoans.map((loan) => (
              <LoanCard
                key={loan.id}
                amount={loan.amount}
                serviceName={loan.serviceName}
                dueDate={loan.dueDate}
                status={loan.status}
                onPress={() => {}}
              />
            ))}
          </View>
        )}

        {/* Recent Activity */}
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

        {/* Help Banner */}
        <View style={[
          shadows.standard,
          {
            backgroundColor: colors.uiElements,
            borderRadius: borderRadius.medium,
            padding: spacing.lg,
            flexDirection: 'row',
            alignItems: 'center',
          }
        ]}>
          <Ionicons name="help-circle" size={24} color={colors.accent} style={{ marginRight: spacing.md }} />
          <View style={{ flex: 1 }}>
            <Text style={[typography.bodyText, { color: colors.primaryText, marginBottom: spacing.xs }]}>
              Need Help?
            </Text>
            <Text style={[typography.subtitle, { color: colors.secondaryText }]}>
              Contact our support team
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.secondaryText} />
        </View>
      </ScrollView>
    </View>
  );
}

function QuickActionButton({ icon, title, colors, onPress }: any) {
  return (
    <TouchableOpacity
      style={[
        shadows.standard,
        {
          flex: 1,
          backgroundColor: colors.uiElements,
          borderRadius: borderRadius.medium,
          padding: spacing.lg,
          alignItems: 'center',
          justifyContent: 'center',
          aspectRatio: 1,
        }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name={icon} size={32} color={colors.accent} style={{ marginBottom: spacing.sm }} />
      <Text style={[typography.subtitle, { color: colors.primaryText, textAlign: 'center' }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
