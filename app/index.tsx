import { SafeAreaView, Text, View, ActivityIndicator } from "react-native";
import Constants from "expo-constants";
import { usePrivy } from "@privy-io/expo";
import { Redirect } from "expo-router";
import { Colors, commonStyles, typography, spacing } from "@/src/shared/design/theme";
import { useColorScheme } from "@/src/shared/hooks/useColorScheme";

export default function Index() {
  const { user, isReady } = usePrivy();
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  // Validate configuration
  if ((Constants.expoConfig?.extra?.privyAppId as string).length !== 25) {
    return (
      <SafeAreaView style={[commonStyles.container, { justifyContent: 'center' }]}>
        <View
          style={[
            commonStyles.card,
            {
              backgroundColor: colors.uiElements,
              alignItems: "center",
              padding: spacing.xxxl,
            }
          ]}
        >
          <Text style={[
            typography.bodyText,
            {
              color: colors.primaryText,
              textAlign: 'center'
            }
          ]}>
            You have not set a valid `privyAppId` in app.json
          </Text>
        </View>
      </SafeAreaView>
    );
  }
  if (
    !(Constants.expoConfig?.extra?.privyClientId as string).startsWith(
      "client-"
    )
  ) {
    return (
      <SafeAreaView style={[commonStyles.container, { justifyContent: 'center' }]}>
        <View
          style={[
            commonStyles.card,
            {
              backgroundColor: colors.uiElements,
              alignItems: "center",
              padding: spacing.xxxl,
            }
          ]}
        >
          <Text style={[
            typography.bodyText,
            {
              color: colors.primaryText,
              textAlign: 'center'
            }
          ]}>
            You have not set a valid `privyClientId` in app.json
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Wait for auth to be ready
  if (!isReady) {
    return (
      <SafeAreaView style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={[
          typography.subtitle,
          {
            color: colors.secondaryText,
            marginTop: spacing.lg
          }
        ]}>
          Loading...
        </Text>
      </SafeAreaView>
    );
  }

  // Redirect based on authentication state
  if (user) {
    return <Redirect href="/(protected)/home" />;
  }

  return <Redirect href="/(auth)/login" />;
}
