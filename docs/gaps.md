# Khaali UI — Known Gaps

Every place the UI intentionally stops short of a real action, because there's no backend (or no next screen) for it to act on yet. Each row is a `// TODO` already sitting in the code — this doc is the index, not a duplicate; go to the cited file for the exact line.

Read each row as: *"once [what unblocks it] exists, implement [what's stubbed] in [file]."*

Delete a row here the moment its TODO is resolved in code — a stale gap list is worse than none.

---

## Backend-dependent (needs an API)

| Screen | File | Function | What's stubbed | What unblocks it |
|---|---|---|---|---|
| Phone Verify, Email Verify | `src/screens/verify/index.tsx`, `src/screens/verify-email/index.tsx` | `handleVerify` | Any 6 digits pass — the code isn't checked against anything. Entering the 6th digit auto-submits | OTP verification endpoint |
| Phone Verify | `src/screens/verify/index.tsx` | `handleWhatsApp` / `handleCall` | "Via WhatsApp" / "Call me instead" (shown only once the resend timer runs out) are no-ops | SMS/WhatsApp/voice OTP delivery service |
| Profile Setup | `src/screens/profile-setup/index.tsx` | `handleContinue` | Selected role isn't persisted anywhere | User profile / role endpoint |
| Welcome | `src/screens/welcome/index.tsx` | `handleGooglePress` | No real OAuth — button does nothing. Once wired, this path should skip straight to **Phone Entry** (`/phone`) — Google already verifies the email half of the identity | Google Sign-In integration |
| Phone Entry, Email Entry, Phone Verify, Email Verify | 4 files | `handleContactSupport` | "Contact support" link is inert | The support flow/contact channel doesn't exist yet (not designed) |
| Search Location | `src/screens/search-location/index.tsx` | `handleUseCurrentLocation` | Navigates to Search Results for real, but the detected area is a hardcoded string, not a GPS fix | `expo-location` + a reverse-geocoding API |
| List a Spot (step 2) | `src/screens/list-spot-details/index.tsx` | `handleContinue` | "Continue" has nowhere to go | Step 3 of the listing flow doesn't exist yet (not designed) |
| List a Spot (step 2) | `src/screens/list-spot-details/components/availability-card.tsx` | `TimeField` | Free-text `TextInput`, not a real time picker | `@expo/ui`'s `DateTimePicker` renders nothing on web (confirmed in its source); revisit once native verification is possible — see `docs/progress.md` Phase 3 |
| Checkout | `src/screens/checkout/index.tsx` | `handlePay` | "Pay & reserve" is a no-op — the total is fully computed, and a typed UPI ID must look like `name@bank`, but nothing is charged or reserved | Payment processor + reservations endpoint |
| Host Dashboard | `src/screens/host-dashboard/index.tsx` | `resolveRequest` | Accept/Decline remove the request locally but don't confirm or notify anyone | Reservations + notification endpoints |

## Removed until they can work (not stubbed — gone)

The 2026-10 design review removed every control that looked tappable but did nothing, per AGENTS.md's "no dead ends" rule. These aren't TODOs in code anymore; add each back **with** its real behavior once what it needs exists:

- **Notifications bell** (Find header) — needs a notifications system.
- **Voice search mic** (`SearchBar`) — needs a speech-to-text provider.
- **Sort & Filter button** (Find) — needs a real, larger result set.
- **Map locate / zoom buttons** (Find, listing step 1) — needs a real map SDK.
- **"Edit" exact address** (listing step 1) — needs reverse geocoding off a real pin.
- **"+ Add New" saved place** (Search Location) — needs a real address source.
- **"Change" vehicle** (Checkout) — needs a vehicle-management screen.
- **"Verify" UPI ID** (Checkout) — needs a backend to verify against; the field is format-checked only.
- **"View payouts"** and **"Manage all"** (Host Dashboard) — need payouts and listing-management screens.
- **Spot card tap** (Find) — cards are no longer pressable until a spot detail screen exists.

## Missing screens (the flow currently dead-ends)

- **Listing flow, step 3.** Steps 1 and 2 are built; a review/submit step isn't.
- **Spot detail screen.** See "Spot card tap" above.
- **Vehicle management**, **payouts**, **listing management**, **support flow** — see the removed controls above.
- **Bookings / Profile real screens (renter-facing).** Both tabs are `ComingSoon` placeholders — see `docs/progress.md` Phase 2.
- **Host Bookings / Earnings / Profile real screens.** All three host tabs (`/host/*`) are `ComingSoon` placeholders — see `docs/progress.md` Phase 5.

## Known platform-specific quirks (not bugs — left alone on purpose)

- **Web-only autofill outline.** Chrome may draw its own autofill rectangle around Phone/Email Entry's field. Browser chrome, can't occur on iOS/Android; left as-is.
- **Web-only tab bar position.** `NativeTabs` renders a real bottom tab bar on iOS/Android but a `position:fixed`, top-pinned menu on web that overlaps the top of tab-root screens. Library web shim — see `AGENTS.md` → "Rules."
- **Maps are illustrative everywhere, not real maps.** Welcome, Find, and listing step 1 use static illustrations. One deliberate scope call: a real map SDK needs an API key and live data from a backend.
- **`@expo/ui` `Switch` has no accessibility-label prop** (only a visible `label`), so screen readers announce listing/EV/credits switches by role and state only. Revisit if `@expo/ui` adds one.

## How to use this doc

When backend work starts, work the first table top to bottom — each row names the exact file and function to return to. When a screen gets built for one of the "Missing screens" entries, remove that row and update `docs/progress.md`'s relevant phase.
