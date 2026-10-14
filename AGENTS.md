This is an Expo/React Native mobile application (Khaali UI). Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json` (currently SDK 57).
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v57.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Project context

`docs/progress.md` tracks what's been built, phase by phase. `docs/gaps.md` indexes every TODO left in the code because it needs a backend or a screen that doesn't exist yet — check it before assuming something is unfinished by accident. Read both before starting new screen work; update both when you finish a phase or resolve a gap.

## Stack

- Expo SDK 57, Expo Router (file-based), TypeScript (strict), React 19 / React Native 0.86.
- `@expo/ui` is installed — prefer it for native controls (see Components below).
- No state-management library, no data-fetching library, no test runner yet. Add one only when a real screen needs what it provides — see "Don't overengineer" below.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start               # start the dev server
npx expo lint                # lint
npx tsc --noEmit             # typecheck
npx expo-doctor              # diagnose dependency and config issues
npx expo install --fix       # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Folder structure

```
Khaali-UI/
├── assets/                   # images, fonts, static media
├── scripts/                  # one-off dev scripts (e.g. reset-project.js)
├── src/
│   ├── app/                  # Expo Router routes ONLY — every file here is a route
│   │   ├── _layout.tsx       # root layout (theme, splash, tabs)
│   │   └── index.tsx         # "/" route — always required
│   ├── screens/               # screen bodies — route files render these
│   │   └── <name>/
│   │       ├── index.tsx      # rendered by src/app/<name>.tsx
│   │       └── components/    # private pieces used only by this screen
│   ├── components/            # UI reused by 2+ screens (Button, Card, ThemedText…)
│   │   └── ui/                 # low-level primitives wrapping native/@expo/ui elements
│   ├── hooks/                  # reusable hooks (use-theme, use-color-scheme…)
│   ├── constants/
│   │   └── theme.ts            # single source of design tokens — Colors, Fonts, Spacing…
│   ├── types/                  # shared TypeScript types (API payloads, domain models)
│   ├── utils/                  # pure helpers, colocated with their *.test.ts
│   └── global.css               # web-only base styles
├── app.json / eas.json
├── tsconfig.json                # strict mode; @/* → src/*, @/assets/* → assets/*
└── package.json
```

`screens/`, `types/`, and `utils/` don't exist on disk yet — create each one the first time it's actually needed, not speculatively.

Rules:

- `src/app/` is routes-only. Never put a component, hook, or util there — route files import from `screens/`, `components/`, `hooks/`.
- A new screen's first version lives inline in its route file. Once it grows, extract the body into `src/screens/<name>/index.tsx` and let the route render `<ScreenName />` — that becomes the only thing the route file does.
- Promote a view into `src/components/` only once it's reused by a second screen (see Components below). Until then it stays in `src/screens/<name>/components/`.
- `src/types/` holds cross-cutting types only. A type used by exactly one screen stays colocated in that screen's file.
- Add `src/server/` + `src/app/api/` only when the app actually grows a backend route (`+api.ts`). Add `src/lib/` or `src/services/` only once there's a real API client to put there. Don't scaffold either ahead of time.
- Platform variants: `.ios.tsx` / `.android.tsx` / `.web.tsx` / `.native.tsx`, always alongside a default file (no-op if the component is single-platform). Props must be identical across variants.
- Kebab-case filenames everywhere (`comment-card.tsx`). No special characters.
- Colocate a file's test (`format-date.test.ts` next to `format-date.ts`) and its styles (`StyleSheet.create` at the bottom of the component file) — no separate `.styles.ts` or `__tests__/` folder.

## Design system — extend what exists, don't fork it

`src/constants/theme.ts` is already this project's single source of design tokens (`Colors`, `Fonts`, `Spacing`, `BottomTabInset`, `MaxContentWidth`), paired with `useTheme()`, `<ThemedText>`, and `<ThemedView>`. That is the real design system here — never start a second one (`src/theme/`, a different token file, a UI library's own theme config) beside it.

- **Colors** are flat light/dark hex pairs (not the `Color`/`PlatformColor` semantic API) — that's this project's idiom. Extend `Colors.light` / `Colors.dark` with the same pair shape when a screen needs a color that doesn't exist yet. Don't mix in a `Platform.select(Color.ios…)` ladder next to it; one consistent system beats a "more correct" second one.
- **Spacing** is the named scale in `Spacing` (`half` … `six`). Use it for every padding/margin/gap; never a raw number. If the same in-between value keeps recurring, add it as a named step instead of inlining it.
- **Text** goes through `<ThemedText type="…">` — add a new `type` to its `styles` object instead of passing one-off `fontSize`/`lineHeight` on a bare `<Text>`.
- **Backgrounds** go through `<ThemedView type="…">` the same way.
- A literal (color, spacing, radius) that appears twice belongs in `theme.ts`, not copy-pasted.
- Rounded corners use `{ borderCurve: 'continuous' }` (not a plain `borderRadius` alone); shadows use `boxShadow` style strings — never legacy `shadowColor`/`elevation`.

## Working from a reference design

Every screen built from a screenshot/Figma gets this pass automatically — don't wait to be asked per screen:

- **The reference is ~90% fidelity, not a pixel contract.** Match its structure and intent; use judgment on exact spacing, and feel free to diverge where this app's own conventions say otherwise.
- **Reuse this app's chrome over the reference's.** If the reference shows a header/nav bar, check whether `Header` (or any other already-shipped component) covers it before building a one-off that matches the screenshot's specific styling. A screen-specific badge/label is fine as a slot *inside* the shared component (see `Header`'s `badge` prop); a second header layout, button style, or card treatment is not. When a reference's chrome conflicts with what's already shipped, the shipped version wins — flag the conflict in your summary rather than forking it.
- **Cut decoration that doesn't serve this screen's task.** Trust badges, stat tickers, or flourishes already established elsewhere in the app (e.g. the welcome screen's stats) don't need to repeat on every subsequent screen just because the reference shows them again. Keep what the user needs to complete the screen's one job; cut what's there to make the mock look finished.
- **Never copy an emoji icon from the reference.** Swap it for a real `Icon` (SF Symbol + Material) even when the source design uses emoji — see Components below.
- **Say what you changed and why**, briefly, in your summary — the user should be able to see the judgment calls, not just the result.

## Responsive & cross-device layout

Every screen must hold up on a small phone, a large phone, a tablet, and web — there is no single fixed target device.

- Build with flexbox (`flex`, `gap`, `%`) — never hardcode pixel widths/heights for layout.
- Use `useWindowDimensions()` for anything that genuinely needs the viewport size — never `Dimensions.get()` (it doesn't update on rotation/resize/split-screen).
- Respect `MaxContentWidth` (already in `theme.ts`) on wide viewports so content doesn't stretch edge-to-edge on tablet/web — see `src/app/index.tsx` for the existing pattern.
- Wrap scrollable screens in `ScrollView`/`FlatList` with `contentInsetAdjustmentBehavior="automatic"` instead of manual `SafeAreaView` insets; account for both top and bottom safe areas.
- Pad via `contentContainerStyle`, not the scroll container itself.
- Never disable font scaling (`allowFontScaling={false}`); let text and row heights grow for Dynamic Type and large accessibility sizes.
- A screen's root is exactly one of: a `ScrollView`, a `FlatList`/`FlashList`, or a full-bleed view (camera/map) — never nest a `ScrollView` around a list.
- Sanity-check every new screen at a small phone width and with a long/overflowing label before calling it done.

## Navigation

- Expo Router only. Routes live in `src/app/`; `_layout.tsx` files define navigators.
- `<Link href="/path" />` for navigation; `Stack`/`NativeTabs` from `expo-router` for navigators.
- Always give a Stack screen its title via navigation options — never a custom `<Text>` header.
- Modals/sheets use `presentation: "modal"` / `"formSheet"` on a route, not a hand-built modal component.

## Components

- For any icon, use `Icon` from `src/components/icon.tsx` — it already does the SF-Symbol-on-iOS / Material-on-Android split (`<Icon name={{ sf: '...', md: '...' }} />`). Never emoji as an icon, never a single-platform icon library.
- Check `@expo/ui` first for any sheet, picker, slider, toggle, menu, or grouped-form section (`BottomSheet`, `Switch`, `Slider`, `Menu`, `FieldGroup`, `List`/`ListItem`) before a React Native built-in or a community library.
- `@expo/ui`'s `List` renders native grouped rows (fixed-length, e.g. settings) — it is not virtualized. Use `FlatList`/`FlashList` for feeds, search results, or anything of unknown length.
- Never use `Picker`, `WebView`, `SafeAreaView`, or `AsyncStorage` imported from `react-native` — they're removed/legacy. Use `react-native-safe-area-context`, `@expo/ui` pickers, and `@react-native-async-storage/async-storage` / `expo-secure-store` instead.
- `expo-image`, not `<img>` or other intrinsic elements (outside a WebView/DOM component).
- Promote a view from a screen into `src/components/` only once it's used by a second screen, has a nameable role ("Card", not "the thing on profile"), and its API is smaller than its implementation. Until then keep it inline or in `src/screens/<name>/components/` — a second copy of a small view is cheaper than a wrong abstraction.
- When a component's props start describing content (`leftIcon`, `subtitle`, `footerText`) instead of variant/size/state, switch to `children`.
- Every interactive primitive needs pressed/disabled/loading states and `accessibilityRole`/`accessibilityLabel`/`accessibilityState` — icon-only controls especially.

## Code quality — DRY without overengineering

Write this as a senior engineer would: correct, typed, and no more complex than the problem in front of you.

- **TypeScript strict, no `any`.** Model real domain types in `src/types/`; let everything else infer.
- **DRY, but earn the abstraction.** Extract a function/component after it's duplicated, not before — a hypothetical future reuse is not a reason to add a parameter, a config object, or a new layer today. Three similar lines beat a premature helper.
- **No speculative infrastructure.** Don't add Redux/Zustand/MobX, React Query/SWR, a DI container, or a service layer until an actual screen needs what it provides. `useState`/`useReducer`/Context covers most needs here; reach further only when prop-drilling or cache invalidation actually hurts.
- **One reason to change per file.** A screen renders; a hook holds logic; a component renders UI; `theme.ts` holds tokens. Don't blend them.
- **Every screen that loads data has four states** — loading, error, empty, content — and never shows "empty" while the first load is still in flight.
- **No dead ends.** Every control does what it claims (Save saves, Search filters) — no empty `onPress` handlers or decorative controls.
- Comments explain *why*, not *what* — only when a constraint or workaround isn't obvious from the code itself.

## Before calling a task done

1. `npx tsc --noEmit` — must pass clean.
2. `npx expo lint` — must pass clean.
3. Walk the primary task on the screen you touched, including a failure/empty state if it loads or saves data.
4. Check it at a small phone width, with a long label, and with the keyboard open if it has a text input.
5. Report what you verified and what you could not (e.g. "not tested on a physical Android device").

## Skills

Expo skills are installed under `.agents/skills/` / `.claude/skills/`. Load `expo-overview` first for any Expo/EAS task — it routes to the right leaf skill. Installed: `expo-project-structure` (this layout), `expo-router` (navigation), `expo-native-ui` (styling, HIG, colors, responsiveness), `expo-ui` (`@expo/ui` components), `expo-design-system` (tokens/component contracts, drift audits). Install more as new needs show up, e.g.:

```bash
npx skills add https://github.com/expo/skills --skill expo-animation
npx skills add https://github.com/expo/skills --skill expo-data-fetching
```

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies.
- `NativeTabs` (`expo-router/unstable-native-tabs`, used in `src/app/(tabs)/_layout.tsx`) renders a real bottom tab bar on iOS/Android but a `position:fixed`, top-pinned "navigation menu" fallback on web — confirmed via DOM inspection, not a bug in screen code. Don't try to CSS-patch this; it's the library's own web shim for a component that's native-first by design. Verify tab screens on web by checking the destination route renders correctly, not by how the tab bar itself looks there.
