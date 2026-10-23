import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { FormScreen } from '@/components/form-screen';
import { Header } from '@/components/header';
import { OtpInput } from '@/components/otp-input';
import { SentToRow } from '@/components/sent-to-row';
import { ThemedText } from '@/components/themed-text';
import { TrustFooter } from '@/components/trust-footer';
import { Spacing } from '@/constants/theme';
import { useOtpInput } from '@/hooks/use-otp-input';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

export function VerifyEmail() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email?: string }>();
  const emailAddress = email || 'you@example.com';

  const { code, setCode, isComplete, secondsLeft, handleResend } = useOtpInput(
    OTP_LENGTH,
    RESEND_SECONDS,
  );

  function handleVerify() {
    // TODO: verify the code against the backend once it exists. Phone and email are now
    // both collected, so continue on to profile setup.
    router.push('/profile-setup');
  }

  function handleChangeCode(text: string) {
    if (setCode(text).length === OTP_LENGTH) handleVerify();
  }

  function handleContactSupport() {
    // TODO: route to support once that flow exists.
  }

  return (
    <FormScreen>
      <Header onBack={() => router.back()} />

      <View style={styles.intro}>
        <ThemedText type="headline">Check your email</ThemedText>
        <SentToRow recipient={emailAddress} onEdit={() => router.back()} />
      </View>

      <OtpInput
        code={code}
        length={OTP_LENGTH}
        onChangeCode={handleChangeCode}
        secondsLeft={secondsLeft}
        onResend={handleResend}
      />

      <Button title="Verify" disabled={!isComplete} onPress={handleVerify} />

      <TrustFooter
        message="Never share this code. Khaali will never ask for it."
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
