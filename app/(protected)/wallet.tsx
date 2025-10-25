import { View, Text, ScrollView, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, spacing } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import { useRouter } from 'expo-router';
import QRCodeStyled from 'react-native-qrcode-styled';
import { usePrivy } from '@privy-io/expo';
import { useEmbeddedEthereumWallet, getUserEmbeddedEthereumWallet } from '@privy-io/expo';
import * as Clipboard from 'expo-clipboard';
import { useState, useEffect } from 'react';
import NetworkSwitcher from '@/src/features/wallet/components/NetworkSwitcher';

export default function WalletScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { user } = usePrivy();
  const { wallets } = useEmbeddedEthereumWallet();
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [balance, setBalance] = useState(0.00);

  useEffect(() => {
    if (user) {
      const embeddedWallet = getUserEmbeddedEthereumWallet(user);
      if (embeddedWallet?.address) {
        setWalletAddress(embeddedWallet.address);
      }
    }
  }, [user]);

  const copyToClipboard = async () => {
    if (walletAddress) {
      await Clipboard.setStringAsync(walletAddress);
      Alert.alert('Copied!', 'Wallet address copied to clipboard');
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View
        style={{ flex: 1, backgroundColor: '#000000' }}
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
              <Feather name="x" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <View />
            <View />
          </View>

          {/* Title */}
          <View style={{ paddingHorizontal: spacing.xl, paddingBottom: spacing.lg }}>
            <Text style={{
              fontSize: 24,
              color: '#FFFFFF',
              fontWeight: '700',
              lineHeight: 32,
            }}>
              Receive deposits in your{'\n'}Cerca Wallet
            </Text>
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
            {/* Network Switcher */}
            <View style={{ paddingHorizontal: spacing.xl, paddingTop: spacing.xxl }}>
              <NetworkSwitcher />
            </View>

            {/* Deposit Options */}
            <View style={{ paddingHorizontal: spacing.xl, marginBottom: spacing.xl }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                gap: spacing.xl,
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
                    <Feather name="arrow-down-left" size={32} color={colors.primaryPink} />
                  </View>
                  <Text style={{
                    fontSize: 14,
                    color: '#FFFFFF',
                    fontWeight: '500',
                  }}>
                    Via Transfer
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
                    <MaterialCommunityIcons name="swap-horizontal" size={32} color={colors.primaryPink} />
                  </View>
                  <Text style={{
                    fontSize: 14,
                    color: '#FFFFFF',
                    fontWeight: '500',
                  }}>
                    From Exchange
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Wallet Address Section */}
            <View style={{ paddingHorizontal: spacing.xl, marginBottom: spacing.xl }}>
              <Text style={{
                fontSize: 14,
                color: colors.mutedText,
                marginBottom: spacing.sm,
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}>
                Wallet Address
              </Text>
              <View style={{
                backgroundColor: colors.cardBackground,
                borderRadius: 12,
                padding: spacing.lg,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderWidth: 1,
                borderColor: colors.border,
              }}>
                <Text style={{
                  fontSize: 16,
                  color: '#FFFFFF',
                  fontFamily: 'monospace',
                  flex: 1,
                }}>
                  {walletAddress ? `${walletAddress.slice(0, 10)}...${walletAddress.slice(-8)}` : 'Loading...'}
                </Text>
                <View style={{ flexDirection: 'row', gap: spacing.md }}>
                  <TouchableOpacity onPress={copyToClipboard}>
                    <Feather name="copy" size={20} color={colors.primaryPink} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Feather name="more-vertical" size={20} color={colors.mutedText} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* QR Code Card */}
            <View style={{ paddingHorizontal: spacing.xl, marginBottom: spacing.xl }}>
              <View
                style={{
                  backgroundColor: colors.primaryPink,
                  borderRadius: 16,
                  padding: spacing.xl,
                  alignItems: 'center',
                }}
              >
                <View style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 12,
                  padding: spacing.md,
                  marginBottom: spacing.lg,
                }}>
                  {walletAddress && (
                    <QRCodeStyled
                      data={walletAddress}
                      style={{
                        backgroundColor: '#FFFFFF',
                      }}
                      pieceSize={6}
                      pieceBorderRadius={2}
                      color="#1B1B1D"
                    />
                  )}
                </View>

                <Text style={{
                  fontSize: 18,
                  color: '#FFFFFF',
                  fontWeight: '600',
                  marginBottom: spacing.sm,
                  textAlign: 'center',
                }}>
                  Receive your first deposit
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.9)',
                  textAlign: 'center',
                  lineHeight: 20,
                }}>
                  Scan this QR code or share your wallet address to receive PYUSDC deposits
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
}