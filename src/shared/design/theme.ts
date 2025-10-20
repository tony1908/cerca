import { ViewStyle } from 'react-native';
import { Colors } from './colors';
import { shadows } from './shadows';
import { typography } from './typography';
import { spacing, borderRadius } from './spacing';

/**
 * Common component styles using the design system
 */
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

// Export all design tokens
export { Colors, shadows, typography, spacing, borderRadius };
export * from './colors';
export * from './shadows';
export * from './typography';
export * from './spacing';
