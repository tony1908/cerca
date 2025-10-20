import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { typography, spacing, borderRadius } from '@/constants/SoftUIStyles';
import { useColorScheme } from 'react-native';

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (otp: string) => void;
}

export default function OTPInput({ length = 6, value, onChange }: OTPInputProps) {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // Split the value into an array of digits
  const digits = value.split('').concat(Array(length).fill('')).slice(0, length);

  const handleChange = (text: string, index: number) => {
    // Only allow numbers
    const sanitizedText = text.replace(/[^0-9]/g, '');

    if (sanitizedText.length === 0) {
      // Handle backspace
      const newDigits = [...digits];
      newDigits[index] = '';
      onChange(newDigits.join(''));

      // Move to previous input
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      return;
    }

    // Handle paste of multiple digits
    if (sanitizedText.length > 1) {
      const pastedDigits = sanitizedText.slice(0, length).split('');
      const newDigits = [...digits];

      pastedDigits.forEach((digit, i) => {
        if (index + i < length) {
          newDigits[index + i] = digit;
        }
      });

      onChange(newDigits.join(''));

      // Focus on the next empty field or the last field
      const nextIndex = Math.min(index + pastedDigits.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    // Handle single digit input
    const newDigits = [...digits];
    newDigits[index] = sanitizedText[sanitizedText.length - 1];
    onChange(newDigits.join(''));

    // Move to next input
    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
      // If current field is empty and backspace is pressed, move to previous field
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {digits.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          onFocus={() => setFocusedIndex(index)}
          onBlur={() => setFocusedIndex(null)}
          keyboardType="number-pad"
          maxLength={1}
          selectTextOnFocus
          style={[
            styles.input,
            {
              backgroundColor: colors.mainBackground,
              color: colors.primaryText,
              borderWidth: 2,
              borderColor: focusedIndex === index ? colors.accent : 'transparent',
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  input: {
    width: 48,
    height: 56,
    borderRadius: borderRadius.medium,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
});
