import { useEmbeddedEthereumWallet } from "@privy-io/expo";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useColorScheme } from "@/src/shared/hooks/useColorScheme";
import { Colors, typography, spacing, borderRadius } from "@/src/shared/design/theme";
import { Ionicons } from "@expo/vector-icons";

export default function EVMWalletActions() {
  const [result, setResult] = useState<string | null>(null);
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const { wallets } = useEmbeddedEthereumWallet();
  const wallet = wallets?.[0];

  const signMessage = async () => {
    const provider = await wallet?.getProvider?.();
    if (!provider) return;

    const message = "Hello World";
    const signature = await provider.request({
      method: "personal_sign",
      params: [message, wallet?.address],
    });
    setResult(signature);
  };
  const signTransaction = async () => {
    const provider = await wallet?.getProvider?.();
    if (!provider) return;

    // Sign transaction (will be signed and populated)
    try {
      const { signature } = await provider.request({
        method: "eth_signTransaction",
        params: [
          {
            from: wallet.address,
            to: "0x0000000000000000000000000000000000000000",
            value: "1",
          },
        ],
      });
      setResult(signature);
    } catch (error) {
      setResult(JSON.stringify(error));
    }
  };
  const signAndSendTransaction = async () => {
    const provider = await wallet?.getProvider?.();
    if (!provider) return;
    const response = await provider.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: wallet.address,
          to: "0x0000000000000000000000000000000000000000",
          value: "1",
        },
      ],
    });
    setResult(JSON.stringify(response));
  };

  const actionButtons = [
    { title: "Sign Message", icon: "create-outline", onPress: signMessage },
    { title: "Sign Transaction", icon: "document-text-outline", onPress: signTransaction },
    { title: "Send Transaction", icon: "send-outline", onPress: signAndSendTransaction },
  ];

  return (
    <View style={{ marginBottom: spacing.xl }}>
      <Text style={[
        typography.bodyText,
        { color: colors.primaryText, marginBottom: spacing.lg }
      ]}>
        Wallet Actions
      </Text>

      <View style={{ gap: spacing.md }}>
        {actionButtons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: colors.mainBackground,
              padding: spacing.lg,
              borderRadius: borderRadius.medium,
            }}
            onPress={button.onPress}
          >
            <Ionicons name={button.icon as any} size={20} color={colors.accent} />
            <Text style={[
              typography.bodyText,
              { color: colors.primaryText, marginLeft: spacing.md }
            ]}>
              {button.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {result && (
        <View style={{
          marginTop: spacing.lg,
          padding: spacing.md,
          backgroundColor: colors.mainBackground,
          borderRadius: borderRadius.small,
        }}>
          <Text style={[
            typography.subtitle,
            { color: colors.secondaryText }
          ]} numberOfLines={3}>
            {result}
          </Text>
        </View>
      )}
    </View>
  );
}
