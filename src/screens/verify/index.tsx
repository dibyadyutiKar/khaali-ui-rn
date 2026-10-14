import { useLocalSearchParams, useRouter } from 'expo-router';
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
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

import { AccessibleRoutes } from './components/accessible-routes';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

export function Verify() {
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { phone } = useLocalSearchParams<{ phone?: string }>();
  const phoneNumber = phone || '+91 98765 43210';

  const { digits, secondsLeft, isComplete, handleDigit, handleDelete, handleResend } =
    useOtpInput(OTP_LENGTH, RESEND_SECONDS);

  function handleVerify() {
    if (!isComplete) return;
    // TODO: verify the code against the backend once it exists. For now, continue the
    // signup flow onward to linking an email address.
    router.push('/email');
  }

  function handleEditPhone() {
    router.back();
  }

  function handleWhatsApp() {
    // TODO: trigger WhatsApp OTP delivery once the backend exists.
  }

  function handleCall() {
    // TODO: trigger a voice-call OTP delivery once the backend exists.
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
            Security verification
          </ThemedText>
        </Pill>

        <ThemedText type="headline">Verify your phone number</ThemedText>
        <ThemedText type="default" themeColor="textSecondary">
          We&apos;ve sent a 6-digit verification code via SMS to
        </ThemedText>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Edit phone number ${phoneNumber}`}
          onPress={handleEditPhone}
          style={({ pressed }) => [styles.phoneChipWrapper, { opacity: pressed ? 0.7 : 1 }]}>
          <Pill tone="infoMuted">
            <ThemedText type="smallBold" selectable>
              {phoneNumber}
            </ThemedText>
            <Icon name={{ sf: 'pencil', md: 'edit' }} size={13} color={theme.textSecondary} />
          </Pill>
        </Pressable>

        <OtpCard
          digits={digits}
          secondsLeft={secondsLeft}
          totalSeconds={RESEND_SECONDS}
          onResend={handleResend}
        />

        <View style={styles.accessibleSection}>
          <ThemedText type="label" themeColor="textSecondary">
            Senior &amp; accessible routes
          </ThemedText>
          <AccessibleRoutes onWhatsApp={handleWhatsApp} onCall={handleCall} />
        </View>

        <Keypad onDigit={handleDigit} onDelete={handleDelete} />

        <Button title="Verify & Continue →" disabled={!isComplete} onPress={handleVerify} />

        <TrustFooter
          message="Never share your OTP with anyone. Khaali officials will never request this code."
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
  phoneChipWrapper: {
    alignSelf: 'flex-start',
    marginTop: -Spacing.one,
  },
  accessibleSection: {
    gap: Spacing.two,
  },
});
