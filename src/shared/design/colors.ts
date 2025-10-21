/**
 * Color palette for the app in light and dark modes
 * Design System: Soft UI Dark Mode (Modern Neumorphic Hybrid)
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fcc2c3'; // Pink accent

export const Colors = {
  light: {
    text: '#000000',
    background: '#F2F2F7',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    // Custom color palette
    mainBackground: '#F2F2F7',
    uiElements: '#FFFFFF',
    accent: '#fcc2c3',
    contentBackground: '#F2F2F7',
    primaryText: '#000000',
    secondaryText: '#8E8E93',
    transactionText: '#000000',
  },
  dark: {
    text: '#FFFFFF',
    background: '#060606',
    tint: tintColorDark,
    icon: '#8E8E93',
    tabIconDefault: '#8E8E93',
    tabIconSelected: tintColorDark,
    // Custom color palette
    mainBackground: '#060606',
    uiElements: '#2C2C2E',
    accent: '#fcc2c3',
    contentBackground: '#F2F2F7',
    primaryText: '#FFFFFF',
    secondaryText: '#8E8E93',
    transactionText: '#000000',
  },
};
