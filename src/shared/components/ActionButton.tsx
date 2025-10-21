import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, typography, spacing, borderRadius, shadows } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';

interface ActionButtonProps {
  title: string;
  icon?: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
}

export default function ActionButton({
  title,
  icon,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false
}: ActionButtonProps) {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  const getButtonStyle = () => {
    if (disabled) {
      return {
        backgroundColor: colors.uiElements,
        borderColor: colors.uiElements,
      };
    }

    switch (variant) {
      case 'primary':
        return {
          backgroundColor: colors.accent,
          borderColor: colors.accent,
        };
      case 'secondary':
        return {
          backgroundColor: colors.uiElements,
          borderColor: colors.uiElements,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: colors.accent,
        };
      default:
        return {
          backgroundColor: colors.accent,
          borderColor: colors.accent,
        };
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.secondaryText;
    if (variant === 'outline') return colors.accent;
    if (variant === 'secondary') return colors.primaryText;
    return colors.mainBackground;
  };

  const buttonStyle = getButtonStyle();

  return (
    <TouchableOpacity
      style={[
        variant === 'primary' ? shadows.convex : {},
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: buttonStyle.backgroundColor,
          borderWidth: 2,
          borderColor: buttonStyle.borderColor,
          borderRadius: borderRadius.medium,
          paddingVertical: spacing.lg,
          paddingHorizontal: spacing.xl,
        }
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <>
          {icon && (
            <Ionicons
              name={icon as any}
              size={20}
              color={getTextColor()}
              style={{ marginRight: spacing.sm }}
            />
          )}
          <Text style={[typography.bodyText, { color: getTextColor(), fontWeight: '600' }]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
