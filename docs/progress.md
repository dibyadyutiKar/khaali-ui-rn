# Khaali UI — Build Progress

This tracks what's actually been built, phase by phase, as a source of context for picking the work back up later. Pair it with `docs/gaps.md`, which lists everything intentionally left unfinished and why.

**Convention:** a phase is marked done when its screens are built, pass `tsc`/`expo lint`, and have been verified interactively (not just screenshotted) — see "How screens were verified" below. Done does not mean backend-connected; see `gaps.md` for what's stubbed.

---

## Phase 1 — Onboarding & identity linking

**Status: screens complete.** Six screens, wired into one flow, no backend.

The product requirement driving this phase: a user can start signup via phone number or Google, but either path ends up collecting **both** a verified phone number and a verified email, so the two can be linked to one account server-side later.

### Screens

| # | Screen | Route | File |
|---|---|---|---|
| 1 | Welcome | `/` | `src/screens/welcome/` |
| 2 | Phone Entry | `/phone` | `src/screens/phone-entry/` |
| 3 | Phone Verify (OTP) | `/verify` | `src/screens/verify/` |
| 4 | Email Entry | `/email` | `src/screens/email-entry/` |
| 5 | Email Verify (OTP) | `/verify-email` | `src/screens/verify-email/` |
| 6 | Profile Setup (role select) | `/profile-setup` | `src/screens/profile-setup/` |

### Flow

```
Welcome
 ├─ "Continue with phone number" → Phone Entry → Phone Verify ──┐
 ├─ "Continue with Google"        → (stub — see gaps.md)        │
 └─ "Have a parking space?"       → (stub — see gaps.md)        │
                                                                  ▼
                                                    Email Entry → Email Verify → Profile Setup → (dead end — no main app yet)
```

Phone Verify's "Verify & Continue" pushes to Email Entry; Email Verify's "Verify & Continue" pushes to Profile Setup. Profile Setup's "Continue" is the current end of the chain (see `gaps.md` — "Missing screens").

### What's real vs. stubbed

Everything **client-side** is genuinely functional, not decorative:
- Phone/email entry fields validate (10-digit number, email regex) and only enable Continue when valid.
- Typed values pass through route params and render correctly on the next screen (not placeholders).
- OTP boxes support real typing (auto-advance), backspace (auto-retreat), a live countdown timer, and a resend that only enables once the timer hits zero.
- Profile Setup's role cards are single-select (radio behavior), with Continue disabled until one is chosen.

Everything that would require a server is a clearly-marked `// TODO` — see `docs/gaps.md` for the full list and exactly which function/file each one lives in.

### Shared components built this phase

All in `src/components/` (promoted there once a second screen needed them — see `AGENTS.md` → "Components"):

| Component | Purpose |
|---|---|
| `Button` | Primary/secondary pill button — variant/size/state contract |
| `Header` | Back + brand mark + avatar nav bar, with a `badge` slot for screen-specific context (encrypted pill, or nothing) |
| `EncryptedBadge` | The "256-bit encrypted" pill shown in `Header`'s badge slot on auth screens |
| `Pill` | Generic rounded badge/chip container (tone = any theme color key) |
| `Dot` | Small colored status dot |
| `Icon` | SF Symbol (iOS) / Material (Android) icon split in one place — see `AGENTS.md` → "Components" |
| `TextField` | Bordered labeled text input with focus-border state (first free-text input in the app) |
| `OtpCard` / `OtpBox` / `Keypad` | The 6-digit code entry UI, shared by both Phone and Email Verify |
| `TrustFooter` | Lock-icon trust blurb + support link, with the body message as a prop (phone vs. email copy differs) |

Plus `src/hooks/use-otp-input.ts` — the digits/timer/handlers logic behind every OTP screen, extracted once it started getting duplicated between Phone and Email Verify.

### Design-system additions (in `src/constants/theme.ts` and `ThemedText`)

- **Colors:** `accent` / `accentMuted` (brand green), `infoMuted` (pale lavender badge/chip background), `mapBlock` / `mapBlockFeatured` (map illustration only)
- **`Radius`** scale (`sm`/`md`/`lg`/`xl`/`full`) — didn't exist in the scaffold
- **`ThemedText` types:** `headline`, `label`, `statValue` (added to the scaffold's original `default`/`title`/`small`/etc.)

All additions extend the scaffold's existing flat-hex-pair token system rather than introducing a second one — see `AGENTS.md` → "Design system."

### How screens were verified

Every screen in this phase was checked with a headless-Chrome + Chrome DevTools Protocol harness (not just a static screenshot):
- Real typed input (system keyboard simulation), not clicking pre-filled placeholder values
- Real taps on real elements (by accessibility role/label), confirming state actually changes
- `document.documentElement.scrollWidth` checked against viewport width at 375px/390px to catch horizontal overflow invisible to a naive screenshot
- Both light and dark mode
- Browser console checked for thrown errors after each interaction

`npx tsc --noEmit` and `npx expo lint` pass clean as of the last commit in this phase.

---

## Phase 2 — Main app shell

**Status: started.** Profile Setup now lands somewhere real — the dead-end from Phase 1 is resolved.

### What's built

The app's first tab navigator, via `NativeTabs` (`src/app/(tabs)/_layout.tsx`), with four tabs:

| Tab | Route | File | Status |
|---|---|---|---|
| Find | `/find` | `src/screens/find/` | Built — see below |
| Bookings | `/bookings` | `src/app/(tabs)/bookings.tsx` | Honest placeholder (`ComingSoon`) |
| List Space | `/list-space` | `src/app/(tabs)/list-space.tsx` | Honest placeholder (`ComingSoon`) |
| Profile | `/profile` | `src/app/(tabs)/profile.tsx` | Honest placeholder (`ComingSoon`) |

Profile Setup's "Continue" now pushes to `/find` once a role is selected, so the full chain (Welcome → … → Profile Setup → Find) is navigable end to end for the first time.

**Find** (`src/screens/find/`) is the real screen built this phase — a map-based parking search home screen: branded header (notifications + avatar, no back button — this is a tab root), a search bar, a single-select duration filter row (Now/Hourly/Daily/Monthly), a static illustrative map with sample price pins (same visual language as the welcome screen's map, not a real map engine — see `docs/gaps.md`), and a scrollable list of spot cards (icon-placeholder thumbnail, price, distance/walk time, verified/open status, tags, rating). All of it is real, driven by local component state — filter selection, search text entry, and every tappable element were verified with actual clicks/typed input, not just screenshotted.

Three new shared components came out of this, reused immediately by both the real screen and the three placeholders: `BrandMark` and `Avatar` (extracted out of `Header` once a second, differently-shaped header — Find's — needed the identical brand/avatar treatment), and `ComingSoon` (one honest "not built yet" screen, used 3 times rather than copy-pasted three times).

**Search Location** (`src/screens/search-location/`, route `/search-location`) — a dedicated full-screen location picker, pushed when Find's search bar is tapped (which is itself now a non-editable button styled as a search bar, not an inline text field — see below). Has a real editable search input with a working clear button, a "use my current location" card, a Saved Places section (Home/Work), and a removable Recent Searches list ("Clear all" genuinely empties it, down to a real empty state). All driven by real local state and verified with actual typed input and clicks, including the Find → Search Location navigation itself.

Promoted `SearchBar` to `src/components/` (out of `screens/find/`) once this second screen needed it, with one addition: an `editable` prop. `editable={false}` + `onPress` renders the identical bar as a single non-editable button that navigates (Find's usage); `editable={true}` (default) is the real field with a clear button (this screen's usage). This fixed a real bug caught in testing, not just a stylistic choice — see "Bugs found and fixed" below.

### Known limitation (platform-specific, not a bug)

`NativeTabs` renders a real bottom tab bar on iOS/Android but a `position:fixed`, top-pinned fallback on web (confirmed via DOM inspection — this is the library's own web shim, not something in this codebase). Tab navigation itself works correctly on web (verified — tapping a tab does land on the right screen with the right active state); only the tab bar's own visual position differs. See `AGENTS.md` → "Rules."

### Bugs found and fixed this phase

- **Nested interactive elements in `SearchBar`'s non-editable mode.** The first version wrapped the whole bar (including the inner mic `Pressable`) in an outer `Pressable` for the "navigate on tap" mode — on web this rendered a `<button>` inside a `<button>`, invalid HTML that React flagged as a hydration-risk console error. Caught by checking the browser console after interaction, not by looking at a screenshot. Fixed by making the mic icon decorative (plain `Icon`, no nested `Pressable`) whenever the bar itself is the single tappable element; confirmed fixed by directly querying the DOM for nested `<button>` elements (zero), not by the console going quiet (a stale warning from the same long-lived tab initially made it look unfixed — re-verified with a fresh browser profile).

### What's left in this phase

1. **Backend integration** — every item in `docs/gaps.md` under "Backend-dependent" needs a real API before its TODO can be resolved, Find/Search Location included.
2. **Real map SDK** — Find's map is a static illustration with hardcoded sample pins; swapping in `react-native-maps` (or similar) + live spot coordinates is real work, not yet started. The "center on my location" button (on both Find and Search Location) is wired to nothing until this exists.
3. **Shared location state.** Selecting a place on Search Location (current location, a saved place, a recent search) currently just calls `router.back()` — it doesn't update Find's search bar, because there's no state shared across screens yet (Context, or a param round-trip on the way back). Deliberately not built speculatively for one screen; revisit once a second place needs the same thing.
4. **Bookings, List Space, Profile** — currently placeholders; each is its own real screen to design and build.
5. **Host / list-a-space flow** — referenced from Welcome's "Have a parking space?" link and from the List Space tab; not yet designed.
6. **Support flow** — referenced from every "Contact Khaali Support" link; not yet designed.
7. **Spot detail screen** — tapping a `SpotCard` currently goes nowhere; not yet designed.

See `AGENTS.md`'s folder-structure rules before scaffolding any of the above — `src/server/`, `src/lib/`, etc. still shouldn't exist until something real needs them.
