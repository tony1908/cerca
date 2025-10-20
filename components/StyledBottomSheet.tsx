import React, { useCallback, useMemo } from 'react';
import { View, Text } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Colors } from '@/constants/Colors';
import { typography, spacing, borderRadius } from '@/constants/SoftUIStyles';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StyledBottomSheetProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  snapPoints?: (string | number)[];
}

export default function StyledBottomSheet({
  title,
  isOpen,
  onClose,
  children,
  snapPoints = ['25%', '50%', '90%'],
}: StyledBottomSheetProps) {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose]
  );

  const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

  if (!isOpen) return null;

  return (
    <BottomSheet
      snapPoints={memoizedSnapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose
      backgroundStyle={{
        backgroundColor: colors.uiElements,
      }}
      handleIndicatorStyle={{
        backgroundColor: colors.secondaryText,
      }}
    >
      <BottomSheetView
        style={{
          flex: 1,
          backgroundColor: colors.uiElements,
        }}
      >
        {/* Header */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: spacing.xl,
          paddingTop: spacing.lg,
          paddingBottom: spacing.xl,
          borderBottomWidth: 1,
          borderBottomColor: `rgba(${colorScheme === 'dark' ? '255,255,255' : '0,0,0'},0.1)`,
        }}>
          <Text style={[
            typography.sectionHeader,
            { color: colors.primaryText }
          ]}>
            {title}
          </Text>
          <Ionicons
            name="close"
            size={24}
            color={colors.secondaryText}
            onPress={onClose}
            style={{ cursor: 'pointer', position: 'absolute', right: spacing.xl }}
          />
        </View>

        {/* Content */}
        <View style={{
          flex: 1,
          paddingHorizontal: spacing.xl,
          paddingTop: spacing.xl,
          paddingBottom: spacing.xl,
        }}>
          {children}
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}