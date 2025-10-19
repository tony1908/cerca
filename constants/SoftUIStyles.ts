import { Platform, ViewStyle, TextStyle } from 'react-native';
import { Colors } from './Colors';

// Shadow configurations for Neumorphic design
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

// Typography styles based on the style guide
export const typography = {
  hero: {
    fontSize: 32,
    fontFamily: 'Inter_600SemiBold',
    fontWeight: '600',
  } as TextStyle,
  primaryTitle: {
    fontSize: 24,
    fontFamily: 'Inter_600SemiBold',
    fontWeight: '600',
  } as TextStyle,
  sectionHeader: {
    fontSize: 22,
    fontFamily: 'Inter_600SemiBold',
    fontWeight: '600',
  } as TextStyle,
  listItemTitle: {
    fontSize: 17,
    fontFamily: 'Inter_600SemiBold',
    fontWeight: '600',
  } as TextStyle,
  bodyText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    fontWeight: '400',
  } as TextStyle,
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    fontWeight: '400',
  } as TextStyle,
};

// Border radius values
export const borderRadius = {
  mainCard: 24,
  button: 999, // Fully circular
  listItem: 18,
  navigationBar: 28,
  small: 12,
  medium: 16,
  large: 20,
  extraLarge: 30,
};

// Spacing values for consistent padding and margins
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// Common component styles
export const commonStyles = {
  // Main container with dark background
  container: {
    flex: 1,
    backgroundColor: Colors.dark.mainBackground,
    padding: spacing.xl,
  } as ViewStyle,

  // Card with neumorphic raised effect
  card: {
    backgroundColor: Colors.dark.mainBackground,
    borderRadius: borderRadius.mainCard,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    ...shadows.convex.dark,
  } as ViewStyle,

  // Light card for content (like transaction items)
  lightCard: {
    backgroundColor: Colors.dark.contentBackground,
    borderRadius: borderRadius.listItem,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.standard,
  } as ViewStyle,

  // Accent card (main highlight card)
  accentCard: {
    backgroundColor: Colors.dark.accent,
    borderRadius: borderRadius.mainCard,
    padding: spacing.xxl,
    marginBottom: spacing.xl,
    ...shadows.convex.dark,
  } as ViewStyle,

  // Circular button with concave effect
  circularButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.dark.mainBackground,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.concave.dark,
  } as ViewStyle,

  // Tab bar container
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.dark.mainBackground,
    borderRadius: borderRadius.navigationBar,
    padding: spacing.sm,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.convex.dark,
  } as ViewStyle,

  // Active tab item
  activeTab: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.dark.accent,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.convex.dark,
  } as ViewStyle,

  // Inactive tab item
  inactiveTab: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,

  // Row layout for horizontal arrangements
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,

  // Space between elements in a row
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as ViewStyle,
};

// Helper function to create neumorphic box shadow for custom configurations
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