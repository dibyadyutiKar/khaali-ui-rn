import { useLocalSearchParams, useRouter } from 'expo-router';
import { Platform, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { EncryptedBadge } from '@/components/encrypted-badge';
import { Header } from '@/components/header';
import { Icon } from '@/components/icon';
import { Keypad } from '@/components/keypad';
import { OtpCard } from '@/components/otp-card';
import { Pill } from '@/components/pill';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TrustFooter } from '@/components/trust-footer';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useOtpInput } from '@/hooks/use-otp-input';
import { useTheme } from '@/hooks/use-theme';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

export function VerifyEmail() {
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { email } = useLocalSearchParams<{ email?: string }>();
  const emailAddress = email || 'you@example.com';

  const { digits, secondsLeft, isComplete, handleDigit, handleDelete, handleResend } =
    useOtpInput(OTP_LENGTH, RESEND_SECONDS);

  function handleVerify() {
    if (!isComplete) return;
    // TODO: verify the code against the backend once it exists. Phone and email are now
    // both collected, so continue on to profile setup.
    router.push('/profile-setup');
  }

  function handleEditEmail() {
    router.back();
  }

  function handleContactSupport() {
    // TODO: route to support once that flow exists.
  }

  return (
    <ThemedView style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: Platform.OS === 'android' ? insets.top + Spacing.three : Spacing.three,
            paddingBottom: Platform.OS === 'ios' ? Spacing.four : insets.bottom + Spacing.four,
          },
        ]}>
        <Header onBack={() => router.back()} badge={<EncryptedBadge />} />

        <Pill tone="accentMuted" style={styles.sectionBadge}>
          <Icon name={{ sf: 'checkmark.shield.fill', md: 'verified-user' }} size={12} color={theme.accent} />
          <ThemedText type="label" themeColor="accent">
            Email verification
          </ThemedText>
        </Pill>

        <ThemedText type="headline">Verify your email</ThemedText>
        <ThemedText type="default" themeColor="textSecondary">
          We&apos;ve sent a 6-digit verification code to
        </ThemedText>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Edit email address ${emailAddress}`}
          onPress={handleEditEmail}
          style={({ pressed }) => [styles.emailChipWrapper, { opacity: pressed ? 0.7 : 1 }]}>
          <Pill tone="infoMuted">
            <ThemedText type="smallBold" selectable>
              {emailAddress}
            </ThemedText>
            <Icon name={{ sf: 'pencil', md: 'edit' }} size={13} color={theme.textSecondary} />
          </Pill>
        </Pressable>

        <OtpCard
          digits={digits}
          secondsLeft={secondsLeft}
          totalSeconds={RESEND_SECONDS}
          onResend={handleResend}
          resendLabel="Resend via email"
        />

        <Keypad onDigit={handleDigit} onDelete={handleDelete} />

        <Button title="Verify & Continue →" disabled={!isComplete} onPress={handleVerify} />

        <TrustFooter
          message="Never share this code with anyone. Khaali officials will never request it."
          onContactSupport={handleContactSupport}
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.three,
    gap: Spacing.three,
  },
  sectionBadge: {
    marginTop: Spacing.one,
  },
  emailChipWrapper: {
    alignSelf: 'flex-start',
    marginTop: -Spacing.one,
  },
});
