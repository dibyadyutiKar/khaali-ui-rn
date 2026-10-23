import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { FormScreen } from '@/components/form-screen';
import { Header } from '@/components/header';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { TrustFooter } from '@/components/trust-footer';
import { Spacing } from '@/constants/theme';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EmailEntry() {
  const router = useRouter();
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
    <FormScreen>
      <Header onBack={() => router.back()} />

      <View style={styles.intro}>
        <ThemedText type="headline">What&apos;s your email?</ThemedText>
        <ThemedText type="default" themeColor="textSecondary">
          We&apos;ll send a 6-digit code to verify it.
        </ThemedText>
      </View>

      <TextField
        label="Email address"
        value={email}
        onChangeText={setEmail}
        onSubmitEditing={handleContinue}
        returnKeyType="next"
        keyboardType="email-address"
        autoComplete="email"
        textContentType="emailAddress"
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="you@example.com"
        autoFocus
      />

      <Button title="Continue" disabled={!isValid} onPress={handleContinue} />

      <TrustFooter
        message="We never share your email or send marketing without consent."
        onContactSupport={handleContactSupport}
      />
    </FormScreen>
  );
}

const styles = StyleSheet.create({
  intro: {
    gap: Spacing.one,
  },
});
