import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import StyledBottomSheet from './StyledBottomSheet';
import { Colors } from '@/constants/Colors';
import { typography, spacing, borderRadius, shadows } from '@/constants/SoftUIStyles';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress?: string;
}

export default function SendModal({ isOpen, onClose, walletAddress }: SendModalProps) {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async () => {
    if (!recipientAddress || !amount) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // TODO: Implement actual send transaction logic
      console.log('Sending', amount, 'ETH to', recipientAddress);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Reset and close on success
      setRecipientAddress('');
      setAmount('');
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to send transaction');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledBottomSheet
      title="Send Ethereum"
      isOpen={isOpen}
      onClose={onClose}
      snapPoints={['60%', '90%']}
    >
      {/* From Address */}
      <View style={{ marginBottom: spacing.xxl }}>
        <Text style={[
          typography.bodyText,
          { color: colors.secondaryText, marginBottom: spacing.sm }
        ]}>
          FROM
        </Text>
        <View style={{
          backgroundColor: colors.mainBackground,
          borderRadius: borderRadius.medium,
          padding: spacing.lg,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Ionicons name="wallet" size={20} color={colors.accent} />
          <Text
            style={[
              typography.bodyText,
              { color: colors.primaryText, marginLeft: spacing.md, flex: 1 }
            ]}
            numberOfLines={1}
          >
            {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'No wallet connected'}
          </Text>
        </View>
      </View>

      {/* Recipient Address */}
      <View style={{ marginBottom: spacing.xxl }}>
        <Text style={[
          typography.bodyText,
          { color: colors.secondaryText, marginBottom: spacing.sm }
        ]}>
          RECIPIENT ADDRESS
        </Text>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.mainBackground,
          borderRadius: borderRadius.medium,
          paddingHorizontal: spacing.lg,
        }}>
          <Ionicons name="send-outline" size={20} color={colors.secondaryText} />
          <TextInput
            value={recipientAddress}
            onChangeText={setRecipientAddress}
            placeholder="0x..."
            placeholderTextColor={colors.secondaryText}
            style={[
              typography.bodyText,
              {
                flex: 1,
                color: colors.primaryText,
                paddingVertical: spacing.lg,
                paddingHorizontal: spacing.md,
              }
            ]}
          />
        </View>
      </View>

      {/* Amount */}
      <View style={{ marginBottom: spacing.xxl }}>
        <Text style={[
          typography.bodyText,
          { color: colors.secondaryText, marginBottom: spacing.sm }
        ]}>
          AMOUNT (ETH)
        </Text>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.mainBackground,
          borderRadius: borderRadius.medium,
          paddingHorizontal: spacing.lg,
        }}>
          <Ionicons name="cash" size={20} color={colors.secondaryText} />
          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder="0.0"
            placeholderTextColor={colors.secondaryText}
            keyboardType="decimal-pad"
            style={[
              typography.bodyText,
              {
                flex: 1,
                color: colors.primaryText,
                paddingVertical: spacing.lg,
                paddingHorizontal: spacing.md,
              }
            ]}
          />
        </View>
      </View>

      {/* Error Message */}
      {error && (
        <View style={{
          marginBottom: spacing.lg,
          padding: spacing.md,
          backgroundColor: 'rgba(255, 59, 48, 0.1)',
          borderRadius: borderRadius.small,
        }}>
          <Text style={[
            typography.subtitle,
            { color: '#FF3B30', textAlign: 'center' }
          ]}>
            {error}
          </Text>
        </View>
      )}

      {/* Send Button */}
      <TouchableOpacity
        style={{
          backgroundColor: colors.accent,
          paddingVertical: spacing.lg,
          paddingHorizontal: spacing.xl,
          borderRadius: borderRadius.button,
          alignItems: 'center',
          marginTop: spacing.xl,
          ...shadows.convex.dark
        }}
        onPress={handleSend}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color={colors.transactionText} />
        ) : (
          <Text style={[
            typography.bodyText,
            { color: colors.transactionText, fontWeight: '600' }
          ]}>
            Send Now
          </Text>
        )}
      </TouchableOpacity>
    </StyledBottomSheet>
  );
}