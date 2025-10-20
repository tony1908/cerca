import { Platform, ViewStyle } from 'react-native';

/**
 * Shadow configurations for Neumorphic design
 */
export const shadows = {
  // Convex/Extruded (Raised) - for elements that appear raised from the surface
  convex: {
    dark: {
      ...Platform.select({
        ios: {
          shadowColor: '#000000',
          shadowOffset: { width: 4, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
        },
        android: {
          elevation: 8,
        },
      }),
    } as ViewStyle,
    darkSecondary: {
      ...Platform.select({
        ios: {
          shadowColor: '#2C2C2E',
          shadowOffset: { width: -4, height: -4 },
          shadowOpacity: 0.5,
          shadowRadius: 6,
        },
        android: {
          // Android doesn't support multiple shadows natively
        },
      }),
    } as ViewStyle,
    light: {
      ...Platform.select({
        ios: {
          shadowColor: '#000000',
          shadowOffset: { width: 4, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
        },
        android: {
          elevation: 4,
        },
      }),
    } as ViewStyle,
  },
  // Concave/Indented (Pressed) - for elements that appear pressed into the surface
  concave: {
    dark: {
      // Inner shadows are harder to achieve in React Native
      // We'll simulate with border and background colors
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.2)',
    } as ViewStyle,
    light: {
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
    } as ViewStyle,
  },
  // Standard elevation for cards
  standard: {
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  } as ViewStyle,
};

/**
 * Helper function to create neumorphic box shadow for custom configurations
 */
export const createNeumorphicShadow = (
  type: 'convex' | 'concave',
  intensity: 'light' | 'medium' | 'strong' = 'medium'
): ViewStyle => {
  const offset = intensity === 'light' ? 2 : intensity === 'medium' ? 4 : 6;
  const radius = intensity === 'light' ? 4 : intensity === 'medium' ? 6 : 8;
  const opacity = intensity === 'light' ? 0.15 : intensity === 'medium' ? 0.25 : 0.35;

  if (type === 'convex') {
    return {
      ...Platform.select({
        ios: {
          shadowColor: '#000000',
          shadowOffset: { width: offset, height: offset },
          shadowOpacity: opacity,
          shadowRadius: radius,
        },
        android: {
          elevation: offset * 2,
        },
      }),
    } as ViewStyle;
  }

  // Concave is simulated with borders
  return {
    borderWidth: 1,
    borderColor: `rgba(0, 0, 0, ${opacity})`,
  } as ViewStyle;
};
