import React from 'react';
import { View, Text, TouchableOpacity, Share, Clipboard } from 'react-native';
import StyledBottomSheet from '@/src/shared/components/StyledBottomSheet';
import QRCode from 'react-native-qrcode-styled';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';
import { Colors, typography, spacing, borderRadius } from '@/src/shared/design/theme';
import { Ionicons } from '@expo/vector-icons';

interface ReceiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress?: string;
}

export default function ReceiveModal({ isOpen, onClose, walletAddress }: ReceiveModalProps) {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  const handleCopyAddress = async () => {
    if (walletAddress) {
      await Clipboard.setString(walletAddress);
      // You could add a toast notification here
    }
  };

  const handleShare = async () => {
    if (walletAddress) {
      try {
        await Share.share({
          message: `My Ethereum wallet address: ${walletAddress}`,
          title: 'Share Wallet Address',
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <StyledBottomSheet
      title="Receive Ethereum"
      isOpen={isOpen}
      onClose={onClose}
      snapPoints={['70%', '90%']}
    >
      {/* QR Code */}
      <View style={{
        alignItems: 'center',
        marginBottom: spacing.xxl,
        padding: spacing.xl,
        backgroundColor: colors.mainBackground,
        borderRadius: borderRadius.large,
      }}>
        {walletAddress ? (
          <QRCode
            value={walletAddress}
            size={180}
            color={colors.primaryText}
            backgroundColor={colors.mainBackground}
          />
        ) : (
          <Text style={[
            typography.bodyText,
            { color: colors.secondaryText }
          ]}>
            No wallet address available
          </Text>
        )}
      </View>

      {/* Wallet Address */}
      <View style={{ marginBottom: spacing.xxl }}>
        <Text style={[
          typography.bodyText,
          { color: colors.secondaryText, marginBottom: spacing.sm }
        ]}>
          YOUR WALLET ADDRESS
        </Text>
        <View style={{
          backgroundColor: colors.mainBackground,
          borderRadius: borderRadius.medium,
          padding: spacing.lg,
        }}>
          <Text
            style={[
              typography.bodyText,
              { color: colors.primaryText, fontFamily: 'monospace' }
            ]}
            numberOfLines={2}
          >
            {walletAddress || 'Not available'}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={{
        flexDirection: 'row',
        gap: spacing.lg,
      }}>
        {/* Copy Button */}
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.mainBackground,
            paddingVertical: spacing.lg,
            borderRadius: borderRadius.medium,
          }}
          onPress={handleCopyAddress}
        >
          <Ionicons name="copy" size={20} color={colors.accent} />
          <Text style={[
            typography.bodyText,
            { color: colors.primaryText, marginLeft: spacing.md, fontWeight: '600' }
          ]}>
            Copy
          </Text>
        </TouchableOpacity>

        {/* Share Button */}
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.accent,
            paddingVertical: spacing.lg,
            borderRadius: borderRadius.medium,
          }}
          onPress={handleShare}
        >
          <Ionicons name="share-social" size={20} color={colors.transactionText} />
          <Text style={[
            typography.bodyText,
            { color: colors.transactionText, marginLeft: spacing.md, fontWeight: '600' }
          ]}>
            Share
          </Text>
        </TouchableOpacity>
      </View>

      {/* Info Text */}
      <Text style={[
        typography.subtitle,
        { color: colors.secondaryText, textAlign: 'center', marginTop: spacing.xl }
      ]}>
        Share your address to receive funds from anyone
      </Text>
    </StyledBottomSheet>
  );
}