/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#FADADD'; // Pale pink accent

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
    accent: '#FADADD',
    contentBackground: '#F2F2F7',
    primaryText: '#000000',
    secondaryText: '#8E8E93',
    transactionText: '#000000',
  },
  dark: {
    text: '#FFFFFF',
    background: '#1B1B1D',
    tint: tintColorDark,
    icon: '#8E8E93',
    tabIconDefault: '#8E8E93',
    tabIconSelected: tintColorDark,
    // Custom color palette
    mainBackground: '#1B1B1D',
    uiElements: '#2C2C2E',
    accent: '#FADADD',
    contentBackground: '#F2F2F7',
    primaryText: '#FFFFFF',
    secondaryText: '#8E8E93',
    transactionText: '#000000',
  },
};
