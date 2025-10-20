# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Expo React Native application built with a **feature-based architecture**, using the Privy SDK for authentication and embedded wallet functionality. The app uses file-based routing via expo-router, integrates with Ethereum/EVM chains through embedded wallets, and leverages TanStack Query for state management.

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

**TypeScript Check:**
```bash
npx tsc --noEmit  # Check for TypeScript errors
```

## Project Architecture

### Feature-Based Structure

The application follows a feature-based architecture for better scalability and maintainability:

```
cerca-app/
├── app/                         # Expo Router - thin routing layer
│   ├── _layout.tsx             # Root layout (imports AppProviders)
│   ├── index.tsx               # Entry validator with Privy config check
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   └── login.tsx          # Imports from @/src/features/auth
│   └── (protected)/
│       ├── _layout.tsx
│       ├── home.tsx
│       ├── wallet.tsx
│       └── settings.tsx
│
├── src/                        # Main application code
│   ├── features/              # Feature modules (self-contained)
│   │   ├── auth/             # Authentication feature
│   │   │   ├── components/   # Feature-specific components
│   │   │   ├── screens/      # Feature screens
│   │   │   ├── hooks/        # Feature hooks (TanStack Query)
│   │   │   ├── queries/      # Query keys and functions
│   │   │   ├── types/        # TypeScript types
│   │   │   └── index.ts      # Public API exports
│   │   │
│   │   └── wallet/           # Wallet feature
│   │       ├── components/   # SendModal, ReceiveModal, EVMWalletActions
│   │       ├── screens/
│   │       ├── hooks/        # Wallet queries and mutations
│   │       └── index.ts
│   │
│   ├── shared/               # Truly reusable code
│   │   ├── components/       # StyledBottomSheet, etc.
│   │   ├── design/          # Design system
│   │   │   ├── colors.ts    # Color palette
│   │   │   ├── typography.ts# Font styles
│   │   │   ├── shadows.ts   # Neumorphic shadows
│   │   │   ├── spacing.ts   # Spacing tokens
│   │   │   └── theme.ts     # Consolidated exports
│   │   ├── hooks/           # useThemeColor, useColorScheme
│   │   └── lib/             # External library configs
│   │       └── tanstack-query/
│   │
│   ├── navigation/          # Navigation logic
│   │   ├── NavigationGuard.tsx
│   │   ├── CustomTabBar.tsx
│   │   └── index.ts
│   │
│   ├── providers/           # App-wide providers
│   │   └── AppProviders.tsx # Unified provider wrapper
│   │
│   └── config/              # Configuration
│       ├── queryClient.config.ts
│       └── privy.config.ts
│
├── assets/                  # Static assets
└── entrypoint.js           # Critical polyfills
```

### Import Patterns

All imports use the `@/src/` prefix for clarity:

```typescript
// From app routes
import { LoginScreen } from '@/src/features/auth';
import { SendModal } from '@/src/features/wallet';

// From features
import { Colors, typography } from '@/src/shared/design/theme';
import { useThemeColor } from '@/src/shared/hooks/useThemeColor';

// From shared components
import StyledBottomSheet from '@/src/shared/components/StyledBottomSheet';
```

## Critical Configuration

### Privy Authentication Setup

The app requires valid Privy credentials configured in [app.json](app.json):
- `extra.privyAppId` - Must be exactly 25 characters
- `extra.privyClientId` - Must start with `client-`
- These values are validated at runtime in [app/index.tsx](app/index.tsx)

### Platform-Specific Configuration

**iOS:**
- Bundle identifier: `ios.bundleIdentifier` in app.json
- Associated domains required for passkey support: `ios.associatedDomains`
- Apple Sign-In enabled via `expo-apple-authentication` plugin

**Android:**
- Package name: `android.package` in app.json

**Passkeys:**
If using passkeys, set `extra.passkeyAssociatedDomain` in app.json to match your associated domain.

## Core Technologies

### Polyfills and Entry Point

The app uses [entrypoint.js](entrypoint.js) instead of standard Expo entry. Critical polyfills MUST be loaded in this exact order:
1. `react-native-get-random-values` - Crypto randomness for React Native
2. `@ethersproject/shims` - Ethereum library compatibility
3. `Buffer` global - Required for blockchain operations

### File-Based Routing

Uses expo-router with typed routes (enabled in app.json). Route structure:
- [app/index.tsx](app/index.tsx) - Root redirector with Privy config validation
- `app/(auth)/` - Authentication routes (login)
- `app/(protected)/` - Protected routes requiring authentication
- [app/_layout.tsx](app/_layout.tsx) - Root layout importing AppProviders

### Provider Hierarchy

AppProviders wraps the app in this order (outer to inner):
1. `GestureHandlerRootView` - Gesture support
2. `QueryClientProvider` - TanStack Query for data fetching
3. `PrivyProvider` - Authentication and wallet management
   - Configured with embedded Ethereum wallet creation
4. `NavigationGuard` - Route protection
5. `PrivyElements` - UI components for Privy flows

### TanStack Query Configuration

Located in [src/config/queryClient.config.ts](src/config/queryClient.config.ts):
- Retry logic for failed requests
- Stale time: 5 minutes default
- Garbage collection time: 10 minutes default
- Network reconnect refetching enabled

Query utilities in [src/shared/lib/tanstack-query/](src/shared/lib/tanstack-query/):
- Query key factories
- Type-safe wrappers
- Prefetch and invalidation helpers

## Feature Modules

### Auth Feature (`src/features/auth/`)

**Components:**
- `EmailLoginForm` - Email + OTP authentication
- `OTPInput` - 6-digit verification code input
- `OAuth` - OAuth provider buttons
- `PasskeyLogin` - Passkey authentication
- `PrivyUI` - Privy's built-in UI
- `SMS` - Phone number authentication

**Screens:**
- `LoginScreen` - Main login with carousel and bottom sheet

### Wallet Feature (`src/features/wallet/`)

**Components:**
- `SendModal` - Send cryptocurrency modal
- `ReceiveModal` - Receive with QR code display
- `EVMWalletActions` - Wallet operations (sign, send)

**Future Hooks (TanStack Query):**
- `useWalletBalance` - Query wallet balance
- `useSendTransaction` - Mutation for sending
- `useTransactionHistory` - Query transaction list

## Key Patterns

### Embedded Wallet Usage

To interact with embedded Ethereum wallets:
```typescript
import { useEmbeddedEthereumWallet, getUserEmbeddedEthereumWallet } from "@privy-io/expo";

const { wallets } = useEmbeddedEthereumWallet();
const account = getUserEmbeddedEthereumWallet(user);
const provider = await wallets[0].getProvider();
```

See [src/features/wallet/components/EVMWalletActions.tsx](src/features/wallet/components/EVMWalletActions.tsx) for examples.

### Using Shared Components

```typescript
import StyledBottomSheet from '@/src/shared/components/StyledBottomSheet';

<StyledBottomSheet
  title="Send Ethereum"
  isOpen={isOpen}
  onClose={onClose}
  snapPoints={['60%', '90%']}
>
  {/* Content here */}
</StyledBottomSheet>
```

### Theme Usage

```typescript
import { Colors, typography, spacing } from '@/src/shared/design/theme';
import { useColorScheme } from '@/src/shared/hooks/useColorScheme';

const colorScheme = useColorScheme() ?? 'dark';
const colors = Colors[colorScheme];
```

## Important Dependencies

- **@privy-io/expo** - Authentication and embedded wallets
- **@privy-io/expo-native-extensions** - Native platform extensions
- **expo-router** - File-based navigation
- **@tanstack/react-query** - Async state management
- **viem** - Ethereum library (pinned to 2.32.0)
- **@gorhom/bottom-sheet** - Gesture-driven bottom sheet modals
- **react-native-qrcode-styled** - QR code generation
- **expo-linear-gradient** - Gradient support
- **@expo-google-fonts/inter** - Inter font family

## Design System

### Style Guide: Soft UI Dark Mode (Modern Neumorphic Hybrid)

**Theme Philosophy:**
- **Feel:** Premium, clean, spacious, tactile, and "soft"
- **Key Principle:** Blends Neumorphism with modern flat design
- **Density:** Low density with generous padding

### Color Palette

Defined in [src/shared/design/colors.ts](src/shared/design/colors.ts):

**Dark Mode (Primary):**
- Main Background: `#1B1B1D` (near black charcoal)
- UI Elements: `#2C2C2E` (dark gray)
- Accent: `#FADADD` (blush pink/rose gold)
- Content Background: `#F2F2F7` (off-white gray)
- Primary Text: `#FFFFFF` (white)
- Secondary Text: `#8E8E93` (muted light gray)

### Typography

Defined in [src/shared/design/typography.ts](src/shared/design/typography.ts):
- **Hero:** 32pt, SemiBold
- **Primary Title:** 24pt, SemiBold
- **Section Header:** 22pt, SemiBold
- **Body Text:** 16pt, Regular
- **Subtitle:** 14pt, Regular

### Shadows (Neumorphic)

Defined in [src/shared/design/shadows.ts](src/shared/design/shadows.ts):
1. **Convex/Extruded** - Raised elements
2. **Concave/Indented** - Pressed elements
3. **Standard Elevation** - Floating cards

## Development Best Practices

### Feature Development

When adding new features:
1. Create a new folder in `src/features/`
2. Include components, screens, hooks, and types
3. Export public API through `index.ts`
4. Keep feature-specific code isolated

### Shared Code

Only add to `src/shared/` if:
- Used by multiple features
- Truly reusable across the app
- Part of the design system

### State Management

Use TanStack Query for:
- Server state (API calls)
- Async operations
- Caching and synchronization

Pattern example:
```typescript
// Query hook
export const useWalletBalance = (address: string) => {
  return useQuery({
    queryKey: ['wallet', 'balance', address],
    queryFn: () => fetchBalance(address),
    staleTime: 30000, // 30 seconds
  });
};

// Mutation hook
export const useSendTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries(['wallet']);
    },
  });
};
```

## iOS Development Notes

- Minimum deployment target: iOS 17.5
- NSAppTransportSecurity allows arbitrary loads

## Android Development Notes

- Compile SDK version: 35
- Min SDK version: 21

## Testing

Run TypeScript checks:
```bash
npx tsc --noEmit
```

Run linting:
```bash
yarn lint
```

## Common Issues & Solutions

### Module Resolution
All imports from src/ should use the `@/src/` prefix:
```typescript
// Correct
import { Colors } from '@/src/shared/design/theme';

// Incorrect
import { Colors } from '@shared/design/theme';
```

### Privy Configuration
If you see "Invalid Privy configuration", check:
1. `privyAppId` is exactly 25 characters
2. `privyClientId` starts with "client-"
3. Both are set in app.json's `extra` field