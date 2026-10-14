import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EmailEntry() {
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');

  const isValid = EMAIL_PATTERN.test(email.trim());

  function handleContinue() {
    if (!isValid) return;
    router.push({ pathname: '/verify-email', params: { email: email.trim() } });
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
            <Icon name={{ sf: 'envelope.fill', md: 'email' }} size={12} color={theme.accent} />
            <ThemedText type="label" themeColor="accent">
              Link your email
            </ThemedText>
          </Pill>

          <ThemedText type="headline">What&apos;s your email address?</ThemedText>
          <ThemedText type="default" themeColor="textSecondary">
            We&apos;ll send a 6-digit code to verify it&apos;s yours too — so your account stays
            reachable by phone or email.
          </ThemedText>

          <TextField
            label="Email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="you@example.com"
            autoFocus
            style={styles.fieldInput}
          />

          <Button title="Continue →" disabled={!isValid} onPress={handleContinue} />

          <TrustFooter
            message="Your email links your account across devices. We never share it or send marketing without your consent."
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
    fontSize: 17,
  },
});
