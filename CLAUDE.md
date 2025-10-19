# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Expo React Native application built with the Privy SDK for authentication and embedded wallet functionality. The app uses file-based routing via expo-router and integrates with Ethereum/EVM chains through embedded wallets.

## Development Commands

**Start Development Server:**
```bash
yarn start  # or: npm start
# Opens Expo Go with dev client
```

**Run on Platforms:**
```bash
yarn ios      # Run on iOS simulator/device
yarn android  # Run on Android emulator/device
```

**Linting:**
```bash
yarn lint     # or: npm run lint
```

## Critical Configuration

### Privy Authentication Setup

The app requires valid Privy credentials configured in [app.json](app.json):
- `extra.privyAppId` - Must be exactly 25 characters
- `extra.privyClientId` - Must start with `client-`
- These values are validated at runtime in [app/index.tsx:10-43](app/index.tsx#L10-L43)

### Platform-Specific Configuration

**iOS:**
- Bundle identifier: `ios.bundleIdentifier` in app.json
- Associated domains required for passkey support: `ios.associatedDomains`
- Apple Sign-In enabled via `expo-apple-authentication` plugin

**Android:**
- Package name: `android.package` in app.json

**Passkeys:**
If using passkeys, set `extra.passkeyAssociatedDomain` in app.json to match your associated domain.

## Architecture

### Polyfills and Entry Point

The app uses [entrypoint.js](entrypoint.js) instead of standard Expo entry. Critical polyfills MUST be loaded in this exact order:
1. `react-native-get-random-values` - Crypto randomness for React Native
2. `@ethersproject/shims` - Ethereum library compatibility
3. `Buffer` global - Required for blockchain operations

### File-Based Routing

Uses expo-router with typed routes (enabled in app.json). Route structure:
- [app/index.tsx](app/index.tsx) - Root redirector with Privy config validation
- `app/(auth)/` - Authentication routes (login, etc.)
- `app/(protected)/` - Protected routes requiring authentication
- [app/_layout.tsx](app/_layout.tsx) - Root layout with providers

### Navigation Guard

[app/_layout.tsx:16-37](app/_layout.tsx#L16-L37) implements `NavigationGuard` component that:
- Redirects unauthenticated users to `/(auth)/login`
- Redirects authenticated users away from auth routes to `/(protected)/home`
- Waits for Privy to be ready before routing

### Provider Hierarchy

Root layout wraps app in this provider order (outer to inner):
1. `QueryClientProvider` - TanStack Query for data fetching
2. `PrivyProvider` - Authentication and wallet management
   - Configured with embedded Ethereum wallet creation for users without wallets
3. `NavigationGuard` - Route protection
4. `PrivyElements` - UI components for Privy flows

### TypeScript Configuration

- Uses `@/*` path alias mapping to project root
- Strict mode enabled
- Module resolution: "Bundler" for conditional/deep imports on packages

### Metro Bundler Customization

[metro.config.js](metro.config.js) includes custom resolver for the `jose` package, forcing browser exports for React Native compatibility.

## Bottom Sheet Modals

The app uses `@gorhom/bottom-sheet` for gesture-driven modal interactions. All bottom sheets are wrapped with Soft UI styling.

### StyledBottomSheet Component

Reusable wrapper that applies the design system to any bottom sheet:

```typescript
import StyledBottomSheet from '@/components/StyledBottomSheet';

<StyledBottomSheet
  title="Send Ethereum"
  isOpen={isOpen}
  onClose={onClose}
  snapPoints={['60%', '90%']}
>
  {/* Content here */}
</StyledBottomSheet>
```

### SendModal

Modal for sending cryptocurrency. Handles recipient address and amount input with validation.

```typescript
import SendModal from '@/components/SendModal';

const [sendOpen, setSendOpen] = useState(false);

<SendModal
  isOpen={sendOpen}
  onClose={() => setSendOpen(false)}
  walletAddress={account?.address}
/>
```

### ReceiveModal

Modal for receiving cryptocurrency. Displays QR code and wallet address with copy/share functionality.

```typescript
import ReceiveModal from '@/components/ReceiveModal';

const [receiveOpen, setReceiveOpen] = useState(false);

<ReceiveModal
  isOpen={receiveOpen}
  onClose={() => setReceiveOpen(false)}
  walletAddress={account?.address}
/>
```

## Key Patterns

### Embedded Wallet Usage

To interact with embedded Ethereum wallets:
```typescript
import { useEmbeddedEthereumWallet, getUserEmbeddedEthereumWallet } from "@privy-io/expo";

const { wallets } = useEmbeddedEthereumWallet();
const account = getUserEmbeddedEthereumWallet(user);
const provider = await wallets[0].getProvider();
```

See [components/walletActions/EVMWalletActions.tsx](components/walletActions/EVMWalletActions.tsx) for examples of:
- Signing messages (`personal_sign`)
- Signing transactions (`eth_signTransaction`)
- Sending transactions (`eth_sendTransaction`)

### Chain Switching

Use the provider's `wallet_switchEthereumChain` method:
```typescript
await provider.request({
  method: "wallet_switchEthereumChain",
  params: [{ chainId: "0x1" }],
});
```

Example implementation in [app/(protected)/home.tsx:38-51](app/(protected)/home.tsx#L38-L51).

## Important Dependencies

- **@privy-io/expo** - Authentication and embedded wallets
- **@privy-io/expo-native-extensions** - Native platform extensions for Privy
- **expo-router** - File-based navigation
- **@tanstack/react-query** - Async state management
- **viem** - Ethereum library (pinned to 2.32.0)
- **@solana/web3.js** - Solana support (included but not actively used in current implementation)
- **@gorhom/bottom-sheet** - Gesture-driven bottom sheet modals for Send/Receive flows
- **react-native-qrcode-styled** - QR code generation for wallet addresses

## Component Organization

- `components/login/` - Authentication UI components (SMS, OAuth, Passkey, PrivyUI)
- `components/walletActions/` - Wallet interaction components (EVM operations)
- `components/StyledBottomSheet.tsx` - Reusable bottom sheet wrapper with Soft UI styling
- `components/SendModal.tsx` - Send cryptocurrency modal with recipient and amount inputs
- `components/ReceiveModal.tsx` - Receive modal with QR code and address sharing
- `hooks/` - Custom React hooks (color scheme, theme)

## Design System

### Style Guide: Soft UI Dark Mode (Modern Neumorphic Hybrid)

**Theme Philosophy:**
- **Feel:** Premium, clean, spacious, tactile, and "soft"
- **Key Principle:** Blends Neumorphism (extruded/indented surfaces) with modern flat design. UI components look like they are part of a single, soft surface rather than floating on top
- **Density:** Low density with generous padding and whitespace

### Color Palette

The app uses a custom color palette defined in [constants/Colors.ts](constants/Colors.ts) with support for both light and dark modes:

**Dark Mode (Primary):**
- Main Background: `#1B1B1D` (near black charcoal - not pure black to allow shadows to be visible)
- UI Elements: `#2C2C2E` (dark gray)
- Accent: `#FADADD` (blush pink/rose gold - used for main card, active navigation, key highlights)
- Content Background: `#F2F2F7` (off-white gray - used for light-mode cards like transaction list items)
- Primary Text: `#FFFFFF` (white - main text on dark backgrounds)
- Secondary Text: `#8E8E93` (muted light gray - subtitles, metadata, less-emphasized text)
- Transaction Text: `#000000` (black - text on light or colored backgrounds)

**Light Mode:**
- Main Background: `#F2F2F7` (light gray)
- UI Elements: `#FFFFFF` (white)
- Accent: `#FADADD` (pale pink)
- Content Background: `#F2F2F7` (light gray)
- Primary Text: `#000000` (black)
- Secondary Text: `#8E8E93` (medium gray)
- Transaction Text: `#000000` (black)

**Usage:**
```typescript
import { useThemeColor } from '@/hooks/useThemeColor';

const backgroundColor = useThemeColor({}, 'mainBackground');
const accentColor = useThemeColor({}, 'accent');
```

The `useThemeColor` hook automatically selects colors based on the device's color scheme.

### Typography

**Font Family:** Clean, modern, geometric sans-serif (Inter is already configured via `@expo-google-fonts/inter`)

**Type Hierarchy:**
- **Hero (Balance):** 32pt, Bold
- **Primary Title (Greetings):** 24pt, SemiBold
- **Section Header (Transactions):** 22pt, SemiBold
- **List Item Title:** 17pt, SemiBold
- **Body Text (Card Names):** 16pt, Regular
- **Subtitle/Metadata:** 14pt, Regular, Secondary Text Color (#8E8E93)

**Font Weights Available:**
- `Inter_400Regular` - Body text
- `Inter_500Medium` - Slightly emphasized
- `Inter_600SemiBold` - Headers and titles

### Layout Principles

- **Padding:** Generous padding inside all elements and container margins
- **Gutters:** Consistent spacing between cards and list items
- **Structure:** Card-based layout with clear visual separation of sections
- **Alignment:** Strong left-alignment for titles and text. Amounts and metadata are right-aligned

### Component Styling

**Border Radius (Extremely high is a key feature):**
- Main Cards: 20px - 30px
- Buttons (Action): Fully circular
- List Items: 16px - 20px
- Navigation Bar: 24px - 30px

**Shadows (Neumorphic/Soft UI):**

Light source is assumed to be top-left. Three shadow types:

1. **Convex/Extruded (Raised)** - Used for Tab Bar
   - Simulates being "raised" from the surface
   - Soft light shadow on top-left + soft dark shadow on bottom-right

2. **Concave/Indented (Pressed)** - Used for Action Buttons
   - Simulates being "pressed into" the surface
   - Soft dark inner shadow on top-left + soft light inner shadow on bottom-right

3. **Standard Elevation** - Used for Transaction Cards
   - Conventional, very diffuse, soft drop-shadow
   - Creates slight "floating" effect on light cards

**Button Styles:**

- **Action Buttons (Send/Receive):**
  - Circular shape
  - Background: primaryBackground
  - Style: Concave/Indented with inner-shadow effect

- **Tab Bar:**
  - Pill/highly-rounded rectangle shape
  - Background: primaryBackground
  - Style: Convex/Extruded with outer-shadow effect

- **Active Tab Item:**
  - Circular shape
  - Background: primaryAccent (#FADADD)
  - Style: Convex/Extruded to "pop" from tab bar

**Iconography:**
- Style: Minimalist, glyph, or outline for inactive states
- Color: Monochrome (white/light gray) on dark backgrounds
- List Icons: Brand logos housed within rounded square or circle containers

## iOS Development Notes

- Minimum deployment target: iOS 17.5 (configured in expo-build-properties plugin)
- NSAppTransportSecurity allows arbitrary loads (configured in app.json infoPlist)

## Android Development Notes

- Compile SDK version: 35 (configured in expo-build-properties plugin)
