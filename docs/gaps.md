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

## Missing screens (the flow currently dead-ends)

- **Main app / dashboard.** Profile Setup's "Continue" is the last screen in the chain — there is nowhere for a fully-onboarded user to land. This is the single most load-bearing gap; see `docs/progress.md` Phase 2.
- **Host / list-a-space flow.** Referenced by Welcome's "Have a parking space? Earn from it."
- **Support flow.** Referenced by every "Contact Khaali Support" link.
- **Phone-number edit screen beyond "go back."** Tapping the phone/email chip on a Verify screen just calls `router.back()` to the entry screen — there's no dedicated edit UI, which is fine since the entry screen already serves that purpose.

## Known platform-specific quirk (not a bug — left alone on purpose)

- **Web-only autofill outline.** Chrome draws its own blue autofill-recognition rectangle around the `TextInput` on Phone Entry / Email Entry, on top of the app's own focus-border styling (`src/components/text-field.tsx`). This is browser chrome, not CSS the app controls, and it cannot occur on iOS/Android — the app's actual target platforms, where there's no browser UI layer at all. Fixing it would mean disabling autofill (`autoComplete="off"`), which trades away a real convenience for users just to clean up a secondary-platform (web preview) screenshot. Left as-is; revisit only if the web build becomes a primary target.

## How to use this doc

When backend work starts, work the first table top to bottom — each row names the exact file and function to return to. When a screen gets built for one of the "Missing screens" entries, remove that row and update `docs/progress.md`'s Phase 2 list.
