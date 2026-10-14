import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { EncryptedBadge } from '@/components/encrypted-badge';
import { Header } from '@/components/header';
import { Icon } from '@/components/icon';
import { Pill } from '@/components/pill';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TrustFooter } from '@/components/trust-footer';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const PHONE_LENGTH = 10;

function formatPhone(digits: string) {
  return digits.length > 5 ? `${digits.slice(0, 5)} ${digits.slice(5)}` : digits;
}

export function PhoneEntry() {
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [digits, setDigits] = useState('');

  const isValid = digits.length === PHONE_LENGTH;

  function handleChange(text: string) {
    setDigits(text.replace(/\D/g, '').slice(0, PHONE_LENGTH));
  }

  function handleContinue() {
    if (!isValid) return;
    router.push({ pathname: '/verify', params: { phone: `+91 ${formatPhone(digits)}` } });
  }

  function handleContactSupport() {
    // TODO: route to support once that flow exists.
  }

  return (
    <ThemedView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={insets.top}>
        <ScrollView
          style={styles.flex}
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
            <Icon name={{ sf: 'phone.fill', md: 'call' }} size={12} color={theme.accent} />
            <ThemedText type="label" themeColor="accent">
              Account setup
            </ThemedText>
          </Pill>

          <ThemedText type="headline">What&apos;s your phone number?</ThemedText>
          <ThemedText type="default" themeColor="textSecondary">
            We&apos;ll text a 6-digit code to confirm it&apos;s really you.
          </ThemedText>

          <TextField
            label="Phone number"
            prefix="+91"
            value={formatPhone(digits)}
            onChangeText={handleChange}
            keyboardType="phone-pad"
            placeholder="98765 43210"
            autoFocus
            maxLength={11}
            style={styles.fieldInput}
          />

          <Button title="Continue →" disabled={!isValid} onPress={handleContinue} />

          <TrustFooter
            message="Your number is used only to verify your identity and secure your bookings."
            onContactSupport={handleContactSupport}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  flex: {
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
  fieldInput: {
    letterSpacing: 1,
  },
});
