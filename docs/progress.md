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

**Search Results** (`src/screens/search-results/`, route `/search-results?location=<name>`) — selecting a location on Search Location (current location, a saved place, or a recent search) now pushes here with that name as a param, instead of just calling `router.back()`. This is what actually resolved the "shared location state" gap noted below in an earlier draft of this doc — not a Context/shared-state mechanism, but the simpler realization that selecting a location should navigate *forward* to results for that place, not backward into Find. Shows a sort-chip row (Nearest/Cheapest/Top rated/EV Charging, reusing the same `SelectChips` component as Find's duration filter — see below), 3 mock result cards with a real, working save/heart toggle, and a floating "Map" button that navigates to `/find`. "Book" is a TODO (no booking flow yet).

Reference-design judgment applied: the Figma's header again showed stale "Profile Setup" text (same copy-pasted-frame artifact as Search Location) — dropped for the standard `Header`. The Figma itself showed real photos on 2 of 3 result cards and a plain color block on the third; rather than matching that inconsistency (or fabricating a third photo), every card uses the same honest icon-placeholder treatment — more consistent than the reference, not less. The "12 verified spots nearby" copy is computed from the actual mock result count (3) instead of copying the Figma's unrelated number.

Generalized Find's `DurationFilter`-specific `FilterChips` into `src/components/select-chips.tsx` (`SelectChips<T>`) once this second screen needed the identical chip-row pattern with different options — supports both a fixed-color status dot (Find's "Now") and a semantic icon that inverts with selection (this screen's checkmark/star), since both are now real requirements, not speculative API surface.

### Known limitation (platform-specific, not a bug)

`NativeTabs` renders a real bottom tab bar on iOS/Android but a `position:fixed`, top-pinned fallback on web (confirmed via DOM inspection — this is the library's own web shim, not something in this codebase). Tab navigation itself works correctly on web (verified — tapping a tab does land on the right screen with the right active state); only the tab bar's own visual position differs. See `AGENTS.md` → "Rules."

### Bugs found and fixed this phase

- **Nested interactive elements in `SearchBar`'s non-editable mode.** The first version wrapped the whole bar (including the inner mic `Pressable`) in an outer `Pressable` for the "navigate on tap" mode — on web this rendered a `<button>` inside a `<button>`, invalid HTML that React flagged as a hydration-risk console error. Caught by checking the browser console after interaction, not by looking at a screenshot. Fixed by making the mic icon decorative (plain `Icon`, no nested `Pressable`) whenever the bar itself is the single tappable element; confirmed fixed by directly querying the DOM for nested `<button>` elements (zero), not by the console going quiet (a stale warning from the same long-lived tab initially made it look unfixed — re-verified with a fresh browser profile).

### What's left in this phase

1. **Backend integration** — every item in `docs/gaps.md` under "Backend-dependent" needs a real API before its TODO can be resolved, Find/Search Location/Search Results included.
2. **Real map SDK** — Find's map is a static illustration with hardcoded sample pins; swapping in `react-native-maps` (or similar) + live spot coordinates is real work, not yet started. The "center on my location" button (on Find, Search Location, and the listing flow's pin screen) is wired to nothing until this exists.
3. **Bookings, Profile** — still placeholders; each is its own real screen to design and build. (List Space graduated out of this list in Phase 3, below.)
4. **Support flow** — referenced from every "Contact Khaali Support" link; not yet designed.
5. **Spot detail screen** — tapping a `SpotCard` (Find) or `ResultCard` (Search Results) currently goes nowhere; not yet designed.
6. **Booking flow** — tapping "Book" on a Search Results card is a TODO; not yet designed.

See `AGENTS.md`'s folder-structure rules before scaffolding any of the above — `src/server/`, `src/lib/`, etc. still shouldn't exist until something real needs them.

---

## Phase 3 — Host flow: listing a spot

**Status: started (1 of 3 steps).** The List Space tab is no longer a placeholder — it's a real entry screen with a working "Get started" button into the listing wizard.

### What's built

- **List Space tab** (`src/screens/list-space/`) — replaces its old `ComingSoon` placeholder with real content: hero icon, headline, a one-line pitch, and a "Get started →" button that pushes into the wizard below. This closes one row from Phase 2's "what's left" list.
- **Listing flow, step 1 of 3** (`src/screens/list-spot-location/`, route `/list-spot/location`) — "Where is your parking space?": a map-pin placeholder (same honest-illustration approach as Find's map — see below), an address card, an optional multiline entrance-instructions field, and a 5-slot photo picker (Cover, Gate Entry, Wide Angle, Pillar/Mark, Driveway). "Continue to Pricing" is disabled until a cover photo is added.
- **Photos are genuinely functional**, not decorative — `expo-image-picker` is wired for real: tapping an empty slot requests media-library permission and opens the real system photo picker; a picked photo renders in that slot; a filled slot can be removed. This is real device capability, not backend-dependent, so it was built all the way rather than stubbed.
- Two new shared components, justified ahead of a literal second use because the screen's own copy states there are 3 steps (not a speculative guess): `FlowHeader` (back + centered title — a third, distinct header shape alongside `Header` and `FindHeader`, for focused wizard flows) and `FlowStepProgress` (Step X of Y + a continuous fill bar, distinct from Profile Setup's discrete-segment `StepProgress` since that one only ever needs 2 segments).

### Reference-design judgment applied (per AGENTS.md, automatically)

- The Figma's map used a detailed, realistic street map (real-looking road names, area labels). Reproducing that exactly would mean inventing fake geographic data — this screen keeps the same honest static-placeholder approach as Find's map instead, which matters more here, not less: precise pin placement is this screen's literal core task, so a fake-looking "real" map would be more misleading than a clearly-illustrative one.
- Pin stays fixed (not draggable) — dragging it over placeholder content with no real geography underneath would be motion without meaning.

### Bug caught and fixed this phase

Dark mode contrast bug in the map's "Move map to adjust pin" hint pill: its background is a deliberately fixed dark overlay (not theme-adaptive, by design — it needs to read on top of the map in either theme), but its text color was mistakenly set to `theme.background`, which is white in light mode (fine) but flips to black in dark mode — black text on a near-black pill, invisible. Fixed to a fixed white, matching the fixed pill background. Caught by actually looking at a dark-mode screenshot, not by code review alone — worth remembering that a "theme-aware" value isn't automatically correct just because it's token-driven; it has to be paired with something that varies the same way.

### What's left in this phase

1. **Steps 2 and 3** (implied "Pricing" and presumably a review/submit step) don't exist yet — step 1's "Continue to Pricing" button is a TODO with nowhere to go.
2. **Real map SDK + reverse geocoding** — same gap as Find/Search Location; this screen's "Exact Address" is a hardcoded mock, and "Edit" has nothing real to edit yet.
3. **Photo upload** — picked photos stay local (device URIs); nothing is actually uploaded anywhere, since there's no backend/storage yet.
