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

**Status: started (2 of 3 steps).** The List Space tab is no longer a placeholder — it's a real entry screen with a working "Get started" button into the listing wizard.

### What's built

- **List Space tab** (`src/screens/list-space/`) — replaces its old `ComingSoon` placeholder with real content: hero icon, headline, a one-line pitch, and a "Get started →" button that pushes into the wizard below. This closes one row from Phase 2's "what's left" list.
- **Listing flow, step 1 of 3** (`src/screens/list-spot-location/`, route `/list-spot/location`) — "Where is your parking space?": a map-pin placeholder (same honest-illustration approach as Find's map — see below), an address card, an optional multiline entrance-instructions field, and a 5-slot photo picker (Cover, Gate Entry, Wide Angle, Pillar/Mark, Driveway). "Continue to Pricing" is disabled until a cover photo is added.
- **Photos are genuinely functional**, not decorative — `expo-image-picker` is wired for real: tapping an empty slot requests media-library permission and opens the real system photo picker; a picked photo renders in that slot; a filled slot can be removed. This is real device capability, not backend-dependent, so it was built all the way rather than stubbed.
- **Listing flow, step 2 of 3** (`src/screens/list-spot-details/`, route `/list-spot/details`) — "Space details & pricing": a single-select space-type grid (Open/Covered/Basement/Stilt), multi-select vehicle-type and amenity chip rows, a spot-count stepper, an availability card (days + hours + 24×7 toggle), three rate fields, and an Instant Book toggle. "Continue" is disabled until at least one vehicle type and an hourly rate are set, and step 1's "Continue to Pricing" now actually lands here.
- **First use of `@expo/ui`'s `Switch`** (24×7 toggle, Instant Book toggle) — wrapped in `Host matchContents` per the skill's rule that every `@expo/ui` tree needs one. Verified as a genuinely working native control (toggled via its real `input[role="switch"]`, confirmed the checked state actually flips), not just visually present.
- Generalized `ChipOption` (from `select-chips.tsx`) into a sibling `MultiSelectChips` component (`src/components/multi-select-chips.tsx`) for the vehicle-type and amenity rows — same chip visuals as `SelectChips`, but toggling independently rather than radio-style, so it's a different component rather than a forced dual-mode API on the existing one.
- Two new shared components from step 1, justified ahead of a literal second use because the screen's own copy states there are 3 steps (not a speculative guess): `FlowHeader` (back + centered title — a third, distinct header shape alongside `Header` and `FindHeader`, for focused wizard flows) and `FlowStepProgress` (Step X of Y + a continuous fill bar, distinct from Profile Setup's discrete-segment `StepProgress` since that one only ever needs 2 segments). Step 2 is the second real use of both, as predicted.

### Reference-design judgment applied (per AGENTS.md, automatically)

Step 1:
- The Figma's map used a detailed, realistic street map (real-looking road names, area labels). Reproducing that exactly would mean inventing fake geographic data — this screen keeps the same honest static-placeholder approach as Find's map instead, which matters more here, not less: precise pin placement is this screen's literal core task, so a fake-looking "real" map would be more misleading than a clearly-illustrative one.
- Pin stays fixed (not draggable) — dragging it over placeholder content with no real geography underneath would be motion without meaning.

Step 2 (this one was flagged explicitly as disorganized, not left to inference):
- **Moved the "Continue" button from mid-page to a sticky footer at the bottom.** The Figma placed it between the "Amenities & Security" heading and its own chip row, cutting the section in half — almost certainly a reference authoring slip, not an intentional layout, and not something to faithfully reproduce.
- **Grouped Availability (days + hours + 24×7 toggle) into one card.** The Figma showed these as three separate elements in a flat list with no visual relationship; they're one decision a host is making, so they now read as one unit, matching how Address/OTP/Instant-Book content elsewhere already uses card grouping for related fields.
- **Unified the step-progress label convention.** Step 1 showed a section name ("Location & Spot"); this Figma showed a raw percentage ("66% Completed") instead — redundant with the fill bar itself, and an inconsistent convention between two steps of the same flow. Kept the section-name convention ("Space & Pricing") both steps now share.
- **Added "Optional" to the Amenities & Security heading**, matching the "Required" / "Multiple selectable" labels the two sections above it already carry — the Figma dropped it only for this one section with no evident reason.
- Every multi-select group (vehicle types, amenities) defaults to **nothing selected**, even though the Figma's mock showed some pre-checked — defaulting a real host's form to specific vehicle types or amenities they haven't actually confirmed would be presumptuous, not a convenience.

### A technical decision worth recording: why the time fields are a plain `TextInput`, not `@expo/ui`'s `DateTimePicker`

`@expo/ui/community/datetime-picker` is the skill-recommended component for this. It was evaluated directly against its installed source: its **web implementation renders nothing (`return null`)** — a real, confirmed no-op for this project's only inspectable target in this environment, not a hypothetical. Wiring it in would mean the "From"/"To" fields simply vanish on web, with no way to verify the native iOS/Android dialog/inline behavior from here either. A plain `TextInput` (free-text, e.g. "9:00 AM") stayed instead — fully real, fully cross-platform, fully testable. Revisit once there's a way to verify the native picker's actual behavior (a device/simulator, not just web preview).

### Bugs found and fixed this phase

- **Dark mode contrast bug** in step 1's map "Move map to adjust pin" hint pill: its background is a deliberately fixed dark overlay (not theme-adaptive, by design — it needs to read on top of the map in either theme), but its text color was mistakenly set to `theme.background`, which is white in light mode (fine) but flips to black in dark mode — black text on a near-black pill, invisible. Fixed to a fixed white, matching the fixed pill background. Caught by actually looking at a dark-mode screenshot, not by code review alone — worth remembering that a "theme-aware" value isn't automatically correct just because it's token-driven; it has to be paired with something that varies the same way.

### What's left in this phase

1. **Step 3** (a review/submit step, presumably) doesn't exist yet — step 2's "Continue" button is a TODO with nowhere to go.
2. **Real map SDK + reverse geocoding** — same gap as Find/Search Location; step 1's "Exact Address" is a hardcoded mock, and "Edit" has nothing real to edit yet.
3. **Photo upload** — picked photos stay local (device URIs); nothing is actually uploaded anywhere, since there's no backend/storage yet.
4. **Real native time picker** — see the dedicated note above; the current `TextInput` is a deliberate, documented substitution, not a forgotten TODO, but it's still worth revisiting once native verification is possible.

---

## Phase 4 — Booking: checkout

**Status: started.** Reached by tapping "Book" on a Search Results card, which was a TODO as of the last commit — the spot's title and hourly rate are now passed through as real route params (`spotTitle`, `pricePerHour`), not just a hardcoded screen.

### What's built

**Checkout** (`src/screens/checkout/`, route `/checkout?spotTitle=<name>&pricePerHour=<rate>`) — a single, long screen covering the spot summary, schedule & vehicle, payment method, fare summary, and trust messaging. Most of it is a genuine, compounding fare calculator, not static mock numbers:

- **Extend Duration** (+1 hr / +2 hrs / Reset) recomputes the exit time and the base-parking line together.
- **EV charging toggle** (first second use of `@expo/ui`'s `Switch`, after step 2 of the listing flow) adds/removes its ₹45 line from the fare summary entirely, not just visually.
- **Khaali Credits checkbox** applies a real discount, capped correctly at `min(available balance, max-apply, subtotal)` — verified the cap holds, not just that *a* discount appears.
- **Payment method** is a real single-select radio group (UPI / Card / Cash / Net Banking); selecting UPI reveals its own sub-panel (quick-app buttons + a real UPI-ID `TextInput` + a Verify button gated on non-empty input) and deselecting it collapses the panel entirely, not just visually hides it.
- The footer's total and the "Pay & Reserve • ₹X" button label both read from the same single computed `total`, so every toggle above is reflected in both places at once — verified by compounding four interactions in one pass (extend duration → turn off EV → apply credits → switch payment method) and confirming the fare summary line items, not just the final total, updated correctly at each step.

`FlowHeader` (from the listing wizard) gained an optional `right` slot for this screen's Avatar — the wizard doesn't want one, checkout does; kept as one component with a slot rather than forking a near-duplicate header.

### Reference-design judgment applied

This Figma was already well-organized (unlike listing-flow step 2) — no layout bugs to fix. The one deliberate addition: reused the existing `EncryptedBadge` component for the "256-bit encrypted" badge next to "Payment Method," since it's pixel-identical to the one already used across every auth screen — not rebuilt from scratch just because it appeared in a new context.

### What's left in this phase

1. **Payment backend** — "Pay & Reserve" is a TODO; there's no payment processor integration, and nothing to actually reserve the bay against yet.
2. **UPI verification** — the "Verify" button next to the UPI ID field is a TODO; no backend to check a UPI ID against.
3. **Vehicle management** — "Change" next to the vehicle card is a TODO; there's no screen yet to pick a different saved vehicle or add one.
4. **Everything else carried from the spot the user tapped "Book" on** — only title and hourly rate make the trip from Search Results today. Bay number, address, host-verification copy, and the vehicle itself are all still representative mock data, consistent with how earlier screens handle data not yet backed by a real source.

---

## Phase 5 — Host Dashboard

**Status: started.** The host side of the app now has a home base, reached from the renter-facing List Space tab via a new "Already hosting? Go to your Host Dashboard →" link.

### What's built

**Host Dashboard** (`src/screens/host-dashboard/`, route `/host/dashboard`) — a second, host-specific `NativeTabs` group (`src/app/host/_layout.tsx`: Dashboard/Bookings/Earnings/Profile), separate from the renter tab group, since a host's bottom nav genuinely needs different destinations. Only the Dashboard tab is a real screen; Bookings/Earnings/Profile are `ComingSoon` placeholders — same pattern Phase 2 established for the renter tabs (build the one real screen asked for, placeholder the rest honestly rather than guessing at unspecified screens).

The Dashboard itself is fully interactive, not a static mock:
- **Earnings card** — dark/inverted card (`theme.text`/`theme.background`, same contrast-safe inversion idiom as Search Results' floating Map button) showing this month's total, a `+18%` delta pill, a small bar-sparkline (computed from a local mock array, not an image), and a "View payouts →" link (TODO — no payouts screen yet).
- **Stat tiles** — Active listings / Bookings per week / Occupancy, three-up row.
- **Booking requests** — real Accept/Decline actions that genuinely remove a request from the pending list and recompute the "(N)" count in the section header, down to a real empty state ("No pending requests right now") when both are resolved. Verified by compounding both actions in one pass, not just checking one in isolation.
- **Your listings** — each listing has a real `@expo/ui` `Switch` (third real use, after listing-step-2 and Checkout) that toggles Live/Paused, backed by actual local state per listing, not shared/global.
- **"+ Add space"** floating button genuinely navigates into the existing listing wizard (`/list-spot/location`) — reuses the flow already built in Phase 3 rather than inventing a second one.
- **"Host Mode ⇄" toggle** navigates back to the renter-facing `/find` — real two-way navigation between renter and host views, not a decorative toggle. There's no persisted "mode" state (no auth/session backend to hang it on yet), so switching is a plain navigation action in both directions, not a global app-mode flag — see `docs/gaps.md`.

### Design-system additions

- **Colors:** `danger` / `dangerMuted` (red pair, light/dark) — first need for a destructive/negative action in the app. `Button` gained a third `danger` variant (muted-red fill, red text) for the Decline action, alongside its existing `primary`/`secondary` variants — extended the existing component rather than hand-rolling a one-off red button.

### Reference-design judgment applied

- The reference's "Hi Priya" greeting was dropped for a generic "Welcome back" — there's no auth/profile backend yet (Profile Setup's role selection still isn't persisted, see `gaps.md`), so showing a specific name would be fabricating the logged-in user's own identity, the same category of thing `Avatar`'s doc comment already rules out for photos. Mock *third-party* content (renter names on booking requests, listing addresses) stays, consistent with how Search Results/Checkout already use plausible sample data for things that aren't the viewer's own identity.
- Kept the trust-ticker/stat-flourish content to exactly what the reference showed here (earnings, stat tiles, requests, listings) since each tile serves this screen's actual job (deciding what to accept, what to toggle) rather than being decoration.
- Emoji-free throughout — every icon (star rating, pin, clock, trending-up, swap) is the shared `Icon` component (SF/Material pair), never copied from the source mock as emoji.

### What's left in this phase

1. **Host Bookings / Earnings / Profile tabs** — still `ComingSoon` placeholders; each is its own real screen to design.
2. **Listing management screen** — "Manage all (N)" on the listings section is a TODO; no dedicated management screen exists yet.
3. **Payouts screen** — "View payouts →" on the earnings card is a TODO.
4. **Backend for Accept/Decline** — both genuinely update local UI state, but neither calls a real reservations/notification endpoint yet (no backend exists).
5. **Host-mode as persisted state** — switching between renter/host views is plain navigation today; revisit once there's a real session/profile to carry a "current mode" flag on.

---

## Design review pass (2026-10-15)

Every screen was reviewed in parallel by 12 reviewer agents (product + iOS/Android UI/UX), each screenshotting its screen at 360/390px in light and dark mode. Scores before the pass: 5–6.5/10. The user's brief: no overflow, native-feeling on iOS/Android, **no green text**, clean, only the content each screen needs.

### App-wide changes
- **Green is now the logo dot only.** `accentMuted`/`infoMuted`/`danger*` tokens were removed; no text, pill, icon, or card uses `accent` anymore. The UI is monochrome (text / textSecondary on background / backgroundElement / backgroundSelected); selection is shown by inversion, not color. `Pill` defaults to neutral.
- **No typed arrows/glyphs in labels** (`→`, `↗`, `✓`) — they're read aloud by screen readers and aren't native button style.
- **Decoration cut:** status pills, stats strips, marketing claims ("earn 3x more", "100% Gated & Safe", "₹3,200 est. earnings" before any price was set), duplicated "256-bit encrypted" badges, fake "Live"/"Updated just now" freshness, "Verified" badges on every card.
- **Dead controls removed** rather than left as no-op TODOs — see `docs/gaps.md` → "Removed until they can work."
- **`ThemedText`:** added `defaultBold` and `display`, removed the scaffold's unused `title`/`subtitle`/`link`/`linkPrimary` (hardcoded blue)/`code`. ~20 inline `fontWeight` overrides replaced by types.
- **`Button`:** real disabled colors (was 40% opacity — muddy in dark mode), single-line label, optional `icon`, `tonal` variant for buttons on cards.
- **`Header`** is back + brand only (no avatar before the user has an account); new **`TabHeader`** (brand + avatar) for tab roots applies the top safe-area inset on every platform — the old pattern only did so on Android.
- **`SearchBar`** is visible in dark mode (was black-on-black), submits on the search key, no dead mic. **`SelectChips`** bleed to the screen edge instead of clipping at the gutter.

### Per-screen highlights
- **OTP (Phone/Email Verify):** custom on-screen keypad replaced with one invisible native `TextInput` (`textContentType="oneTimeCode"`, `autoComplete="one-time-code"`) under the six boxes — iOS "From Messages" autofill, Android SMS autofill, paste, and hardware keyboards now work; formatted pastes ("123-456") are normalized; the 6th digit auto-submits. New shared `OtpInput` and `SentToRow`.
- **Phone/Email Entry:** autofill props (`tel`, `email`), Return key submits, phone autofill with `+91` is stripped.
- **Welcome:** primary CTA back above the fold on small phones; "Earn from it" now opens the listing flow.
- **Profile Setup:** compact role rows, Continue pinned to the bottom.
- **Find:** duration chips actually switch the displayed prices (hourly/daily/monthly), on the list and map.
- **Search Location:** typing filters saved/recent places; submit searches the typed text.
- **Search Results:** sort chips actually sort.
- **Checkout:** roughly half the scroll — duration stepper, Card/UPI up front with Cash/Net banking behind "More payment options", one-line cancellation note, footer button can't wrap. EV charging is now opt-in (defaulting a paid add-on to on was a dark pattern).
- **Host Dashboard:** host tabs moved from the `(host)` group to a real `/host/*` segment — `(host)/bookings` and `(tabs)/bookings` both resolved to `/bookings`, so the renter Bookings tab was opening the host one. "Add space" moved from a floating button (which would collide with the native tab bar) into the listings header.

### Verified
`tsc` + `expo lint` clean. All 16 routes screenshotted at 360px in light and dark: zero horizontal overflow, zero console errors. 13 scripted interactions pass (OTP paste + auto-submit, phone autofill, Find price toggle, search filtering, real sort order, route collision fix, checkout math + UPI gating, host accept → empty state). Not verified: native iOS/Android devices (keyboard insets, Dynamic Type, SMS autofill).

### Follow-up from on-device testing (iPhone 16)
- **Onboarding screens scrolled even when their content fit, and the keyboard pushed the header off-screen.** Cause: `contentInsetAdjustmentBehavior="automatic"` adds the safe-area insets *on top of* a full-height (`flexGrow: 1`) content container, and `automaticallyAdjustKeyboardInsets` scrolls the whole page to reveal the focused field. Fix: new shared `FormScreen` (`src/components/form-screen.tsx`) used by Welcome, Phone/Email Entry, both Verify screens and Profile Setup. It applies insets by hand, doesn't bounce when content fits, and uses `KeyboardAvoidingView` so the keyboard shrinks the frame instead of scrolling the header away. It has an optional `footer` slot that stays pinned above the keyboard.
- **Welcome's empty gap above the CTAs:** the map now flexes to fill the spare height (min 200pt) instead of a fixed aspect ratio.
- Verified on web at 393×852 (iPhone 16) and 375×667 (SE): all six screens fit with no scroll. Keyboard behavior can only be confirmed on device.
