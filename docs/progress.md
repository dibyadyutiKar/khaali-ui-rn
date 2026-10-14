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

## Phase 2 — not started

Candidates, in roughly the order they unblock the rest of the app:

1. **Main app / dashboard** — Profile Setup currently has nowhere to send a verified, role-selected user. This is the most load-bearing gap: nothing after onboarding can be built until this exists.
2. **Backend integration** — every item in `docs/gaps.md` under "Backend-dependent" needs a real API before its TODO can be resolved.
3. **Host / list-a-space flow** — referenced from Welcome, not yet designed.
4. **Support flow** — referenced from every "Contact Khaali Support" link, not yet designed.

Nothing in this phase has been started or scaffolded — see `AGENTS.md`'s folder-structure rules on not creating `src/server/`, `src/lib/`, etc. ahead of actual need.
