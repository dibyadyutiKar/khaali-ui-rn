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

const PHONE_LENGTH = 10;

function formatPhone(digits: string) {
  return digits.length > 5 ? `${digits.slice(0, 5)} ${digits.slice(5)}` : digits;
}

export function PhoneEntry() {
  const router = useRouter();
  const [digits, setDigits] = useState('');

  const isValid = digits.length === PHONE_LENGTH;

  function handleChange(text: string) {
    const all = text.replace(/\D/g, '');
    // Autofill supplies the number with its country code ("+91 98765 43210"); strip it.
    const local = all.length > PHONE_LENGTH && all.startsWith('91') ? all.slice(2) : all;
    setDigits(local.slice(0, PHONE_LENGTH));
  }

  function handleContinue() {
    if (!isValid) return;
    router.push({ pathname: '/verify', params: { phone: `+91 ${formatPhone(digits)}` } });
  }

  function handleContactSupport() {
    // TODO: route to support once that flow exists.
  }

  return (
    <FormScreen>
      <Header onBack={() => router.back()} />

      <View style={styles.intro}>
        <ThemedText type="headline">What&apos;s your phone number?</ThemedText>
        <ThemedText type="default" themeColor="textSecondary">
          We&apos;ll text you a 6-digit code.
        </ThemedText>
      </View>

      <TextField
        label="Phone number"
        prefix="+91"
        value={formatPhone(digits)}
        onChangeText={handleChange}
        onSubmitEditing={handleContinue}
        keyboardType="phone-pad"
        autoComplete="tel"
        textContentType="telephoneNumber"
        placeholder="98765 43210"
        autoFocus
      />

      <Button title="Continue" disabled={!isValid} onPress={handleContinue} />

      <TrustFooter
        message="Used only to verify you and secure your bookings."
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
