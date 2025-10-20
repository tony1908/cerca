import { useState, useCallback } from "react";
import { Text, TextInput, View, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  usePrivy,
  useEmbeddedEthereumWallet,
  getUserEmbeddedEthereumWallet,
  PrivyEmbeddedWalletProvider,
} from "@privy-io/expo";
import { PrivyUser } from "@privy-io/public-api";
import EVMWalletActions from "@/src/features/wallet/components/EVMWalletActions";
import { Colors, commonStyles, typography, spacing, borderRadius, shadows } from "@/src/shared/design/theme";
import { useColorScheme } from "@/src/shared/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";

const toMainIdentifier = (x: PrivyUser["linked_accounts"][number]) => {
  if (x.type === "phone") {
    return x.phoneNumber;
  }
  if (x.type === "email" || x.type === "wallet") {
    return x.address;
  }

  if (x.type === "twitter_oauth" || x.type === "tiktok_oauth") {
    return x.username;
  }

  if (x.type === "custom_auth") {
    return x.custom_user_id;
  }

  return x.type;
};

export default function Home() {
  const [chainId, setChainId] = useState("1");
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();

  const { logout, user } = usePrivy();
  const { wallets } = useEmbeddedEthereumWallet();
  const account = getUserEmbeddedEthereumWallet(user);

  const switchChain = useCallback(
    async (provider: PrivyEmbeddedWalletProvider, id: string) => {
      try {
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: id }],
        });
        alert(`Chain switched to ${id} successfully`);
      } catch (e) {
        console.error(e);
      }
    },
    [account?.address]
  );

  if (!user) {
    return null;
  }

  return (
    <View style={[commonStyles.container, { paddingTop: insets.top, paddingBottom: insets.bottom + 90 }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Header Section */}
        <View style={{ marginBottom: spacing.xl }}>
          <Text style={[
            typography.primaryTitle,
            { color: colors.primaryText }
          ]}>
            Hello {user?.linked_accounts[0] ? toMainIdentifier(user.linked_accounts[0]).split('@')[0] : 'User'}
          </Text>
          <Text style={[
            typography.subtitle,
            { color: colors.secondaryText, marginTop: spacing.xs }
          ]}>
            Welcome Back
          </Text>
        </View>

        {/* Main Wallet Card */}
        {account?.address && (
          <View style={[
            commonStyles.accentCard,
            { marginBottom: spacing.xxl }
          ]}>
            <Text style={[
              typography.subtitle,
              { color: colors.transactionText, marginBottom: spacing.sm }
            ]}>
              ETHEREUM WALLET
            </Text>
            <Text style={[
              typography.hero,
              { color: colors.transactionText, marginBottom: spacing.md }
            ]}>
              $0.00
            </Text>
            <Text style={[
              typography.bodyText,
              { color: colors.transactionText, opacity: 0.8 }
            ]} numberOfLines={1}>
              {account.address.slice(0, 6)}...{account.address.slice(-4)}
            </Text>
          </View>
        )}

        {/* Action Buttons Row */}
        <View style={[
          commonStyles.rowSpaceBetween,
          { marginBottom: spacing.xxl, paddingHorizontal: spacing.xl }
        ]}>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={commonStyles.circularButton}>
              <Ionicons name="arrow-up" size={24} color={colors.accent} />
            </TouchableOpacity>
            <Text style={[
              typography.subtitle,
              { color: colors.secondaryText, marginTop: spacing.sm }
            ]}>
              Send
            </Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={commonStyles.circularButton}>
              <Ionicons name="arrow-down" size={24} color={colors.accent} />
            </TouchableOpacity>
            <Text style={[
              typography.subtitle,
              { color: colors.secondaryText, marginTop: spacing.sm }
            ]}>
              Receive
            </Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={commonStyles.circularButton}>
              <Ionicons name="swap-horizontal" size={24} color={colors.accent} />
            </TouchableOpacity>
            <Text style={[
              typography.subtitle,
              { color: colors.secondaryText, marginTop: spacing.sm }
            ]}>
              Swap
            </Text>
          </View>
        </View>

        {/* Transactions Section */}
        <View style={{ marginBottom: spacing.xl }}>
          <Text style={[
            typography.sectionHeader,
            { color: colors.primaryText, marginBottom: spacing.lg }
          ]}>
            Transactions
          </Text>

          {/* Sample Transaction Items */}
          <View style={commonStyles.lightCard}>
            <View style={commonStyles.rowSpaceBetween}>
              <View style={commonStyles.row}>
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: colors.accent,
                  marginRight: spacing.md,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Ionicons name="swap-horizontal" size={20} color={colors.transactionText} />
                </View>
                <View>
                  <Text style={[typography.listItemTitle, { color: colors.transactionText }]}>
                    Swap ETH
                  </Text>
                  <Text style={[typography.subtitle, { color: colors.secondaryText }]}>
                    2 hours ago
                  </Text>
                </View>
              </View>
              <Text style={[typography.listItemTitle, { color: colors.transactionText }]}>
                -0.05 ETH
              </Text>
            </View>
          </View>
        </View>

        {/* Settings Section */}
        <View style={[
          commonStyles.card,
          { backgroundColor: colors.uiElements }
        ]}>
          <Text style={[
            typography.sectionHeader,
            { color: colors.primaryText, marginBottom: spacing.lg }
          ]}>
            Settings
          </Text>

          {/* Chain Switch */}
          <View style={{ marginBottom: spacing.xl }}>
            <Text style={[
              typography.bodyText,
              { color: colors.primaryText, marginBottom: spacing.md }
            ]}>
              Network
            </Text>
            <View style={commonStyles.row}>
              <TextInput
                value={chainId}
                onChangeText={setChainId}
                placeholder="Chain ID"
                placeholderTextColor={colors.secondaryText}
                style={[
                  {
                    flex: 1,
                    backgroundColor: colors.mainBackground,
                    borderRadius: borderRadius.medium,
                    padding: spacing.md,
                    color: colors.primaryText,
                    marginRight: spacing.md,
                    ...typography.bodyText
                  }
                ]}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: colors.accent,
                  paddingHorizontal: spacing.lg,
                  paddingVertical: spacing.md,
                  borderRadius: borderRadius.medium,
                }}
                onPress={async () =>
                  switchChain(await wallets[0].getProvider(), chainId)
                }
              >
                <Text style={[
                  typography.bodyText,
                  { color: colors.transactionText, fontWeight: '600' }
                ]}>
                  Switch
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <EVMWalletActions />

          {/* Logout Button */}
          <TouchableOpacity
            style={{
              backgroundColor: colors.mainBackground,
              padding: spacing.lg,
              borderRadius: borderRadius.large,
              alignItems: 'center',
              marginTop: spacing.xl,
              ...shadows.concave.dark
            }}
            onPress={logout}
          >
            <Text style={[
              typography.bodyText,
              { color: colors.accent, fontWeight: '600' }
            ]}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
