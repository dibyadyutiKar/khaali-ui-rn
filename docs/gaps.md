# Khaali UI — Known Gaps

Every place the UI intentionally stops short of a real action, because there's no backend (or no next screen) for it to act on yet. Each row is a `// TODO` already sitting in the code — this doc is the index, not a duplicate; go to the cited file for the exact line.

Read each row as: *"once [what unblocks it] exists, implement [what's stubbed] in [file]."*

Delete a row here the moment its TODO is resolved in code — a stale gap list is worse than none.

---

## Backend-dependent (needs an API)

| Screen | File | Function | What's stubbed | What unblocks it |
|---|---|---|---|---|
| Phone Verify | `src/screens/verify/index.tsx` | `handleVerify` | Doesn't check the entered code against anything — the button is only gated on "6 digits typed," not correctness | OTP verification endpoint |
| Phone Verify | `src/screens/verify/index.tsx` | `handleWhatsApp` / `handleCall` | "Via WhatsApp" / "Call me instead" buttons are no-ops | SMS/WhatsApp/voice OTP delivery service |
| Email Verify | `src/screens/verify-email/index.tsx` | `handleVerify` | Same as Phone Verify, for the email code | OTP verification endpoint |
| Profile Setup | `src/screens/profile-setup/index.tsx` | `handleContinue` | Selected role isn't persisted anywhere | User profile / role endpoint |
| Welcome | `src/screens/welcome/index.tsx` | `handleGooglePress` | No real OAuth — button does nothing. Once wired, this path should skip straight to **Phone Entry** (`/phone`), not Email Entry — Google already verifies the email half of the identity, so only the phone half still needs collecting | Google Sign-In integration (client ID + native config via `expo-auth-session` or similar) |
| Welcome | `src/screens/welcome/index.tsx` | `handleEarnPress` | "Have a parking space? Earn from it" goes nowhere | The host/list-a-space flow doesn't exist yet (not designed) |
| Phone Entry, Email Entry, Phone Verify, Email Verify | 4 files | `handleContactSupport` | "Need help? Contact Khaali Support" link is inert on all four screens | The support flow/contact channel doesn't exist yet (not designed) |
| Find | `src/screens/find/index.tsx` | `handleNotificationsPress` | Bell icon button is a no-op | A notifications screen/system doesn't exist yet (not designed) |
| Find | `src/screens/find/index.tsx` | `handleVoicePress` | Mic icon in the search bar is a no-op | Speech-to-text provider not chosen |
| Find | `src/screens/find/index.tsx` | `handleSortFilterPress` | "Sort & Filter" button is a no-op | Not worth building against 3 hardcoded mock spots — wire up once there's a real, larger result set |
| Find | `src/screens/find/index.tsx` | `handleSpotPress` | Tapping a spot card goes nowhere | Spot detail screen doesn't exist yet (not designed) |
| Search Location | `src/screens/search-location/index.tsx` | `handleVoicePress` | Mic icon is a no-op | Speech-to-text provider not chosen (same gap as Find's) |
| Search Location | `src/screens/search-location/index.tsx` | `handleUseCurrentLocation` | Navigates to Search Results for real, but `detectedLabel` ("Koramangala 4th Block") is a hardcoded string, not a real GPS fix | `expo-location` (device GPS) + a reverse-geocoding API |
| Search Location | `src/screens/search-location/index.tsx` | `handleAddPlace` | "+ Add New" under Saved Places is a no-op | A "save this place" flow, which itself needs a real address source (geocoding) first |
| Search Results | `src/screens/search-results/index.tsx` | `handleBookPress` | "Book" button is a no-op | Booking flow doesn't exist yet (not designed) |
| List a Spot (step 1) | `src/screens/list-spot-location/index.tsx` | `handleEditAddress` | "Edit" next to the exact address is a no-op — the address itself is a hardcoded mock | `expo-location` + reverse-geocoding, same as Search Location's current-location gap |
| List a Spot (step 1) | `src/screens/list-spot-location/index.tsx` | `handleLocatePress`, `handleZoomIn`, `handleZoomOut` | Map controls are present and tappable but do nothing | Real map SDK — see "Maps are illustrative" below, same root cause |
| List a Spot (step 2) | `src/screens/list-spot-details/index.tsx` | `handleContinue` | "Continue" has nowhere to go once vehicle types + an hourly rate are set | Step 3 of the listing flow doesn't exist yet (not designed) |
| List a Spot (step 2) | `src/screens/list-spot-location/index.tsx` | Time fields ("From" / "To") | Free-text `TextInput`, not a real time picker | See `docs/progress.md` Phase 3 — `@expo/ui`'s `DateTimePicker` renders nothing on web (confirmed in its own source), so it was deliberately not used; revisit once native (iOS/Android) verification is possible |

## Missing screens (the flow currently dead-ends)

- **Listing flow, step 3.** Steps 1 ("Location & Spot") and 2 ("Space & Pricing") are built; a review/submit step presumably isn't.
- **Booking flow.** Referenced by "Book" on every Search Results card.
- **Support flow.** Referenced by every "Contact Khaali Support" link.
- **Spot detail screen.** Referenced by every `SpotCard` tap on Find (Search Results' cards link to Book directly, not a detail screen, by design — a card already shows enough detail to decide).
- **Bookings / Profile real screens.** Both tabs are currently `ComingSoon` placeholders — see `docs/progress.md` Phase 2. (List Space is no longer in this list — it's a real entry screen now, see Phase 3.)
- **Phone-number edit screen beyond "go back."** Tapping the phone/email chip on a Verify screen just calls `router.back()` to the entry screen — there's no dedicated edit UI, which is fine since the entry screen already serves that purpose.

## Known platform-specific quirks (not bugs — left alone on purpose)

- **Web-only autofill outline.** Chrome draws its own blue autofill-recognition rectangle around the `TextInput` on Phone Entry / Email Entry, on top of the app's own focus-border styling (`src/components/text-field.tsx`). This is browser chrome, not CSS the app controls, and it cannot occur on iOS/Android — the app's actual target platforms, where there's no browser UI layer at all. Fixing it would mean disabling autofill (`autoComplete="off"`), which trades away a real convenience for users just to clean up a secondary-platform (web preview) screenshot. Left as-is; revisit only if the web build becomes a primary target.
- **Web-only tab bar position.** `NativeTabs` (`src/app/(tabs)/_layout.tsx`) renders a real bottom tab bar on iOS/Android, but on web it falls back to a `position:fixed`, top-pinned "navigation menu" — confirmed via DOM inspection to be the library's own web shim, not a layout bug in any screen. Tab navigation itself works correctly on web (verified by direct navigation + active-state checks); only the bar's visual position differs. See `AGENTS.md` → "Rules."
- **Maps are illustrative everywhere, not real maps.** Find, Search Location, and the listing flow's pin screen all use the same static-illustration approach (hardcoded sample content, no pannable tiles, no live coordinates) rather than a real map SDK. This is one deliberate scope call applied consistently, not three separate oversights — a real map SDK needs an API key and is real, non-speculative work once the backend exists to feed it live data. See `docs/progress.md`.

## How to use this doc

When backend work starts, work the first table top to bottom — each row names the exact file and function to return to. When a screen gets built for one of the "Missing screens" entries, remove that row and update `docs/progress.md`'s relevant phase.
