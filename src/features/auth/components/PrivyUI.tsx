import { useLogin } from "@privy-io/expo/ui";
import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Colors, typography, spacing, borderRadius, shadows } from "@/src/shared/design/theme";
import { useColorScheme } from "@/src/shared/hooks/useColorScheme";

export default function PrivyUI() {
  const [error, setError] = useState("");
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  const { login } = useLogin();

  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={[
        typography.bodyText,
        {
          color: colors.primaryText,
          marginBottom: spacing.xl,
          textAlign: 'center'
        }
      ]}>
        Sign in to continue
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: colors.accent,
          paddingVertical: spacing.lg,
          paddingHorizontal: spacing.xxxl,
          borderRadius: borderRadius.button,
          minWidth: 200,
          alignItems: 'center',
          ...shadows.convex.dark
        }}
        onPress={() => {
          login({ loginMethods: ["email"] })
            .then((session) => {
              console.log("User logged in", session.user);
            })
            .catch((err) => {
              setError(JSON.stringify(err.error) as string);
            });
        }}
      >
        <Text style={[
          typography.bodyText,
          {
            color: colors.transactionText,
            fontWeight: '600'
          }
        ]}>
          Continue with Email
        </Text>
      </TouchableOpacity>

      {error && (
        <View style={{
          marginTop: spacing.lg,
          padding: spacing.md,
          backgroundColor: 'rgba(255, 59, 48, 0.1)',
          borderRadius: borderRadius.small,
          maxWidth: '100%'
        }}>
          <Text style={[
            typography.subtitle,
            {
              color: '#FF3B30',
              textAlign: 'center'
            }
          ]}>
            {error}
          </Text>
        </View>
      )}
    </View>
  );
}
