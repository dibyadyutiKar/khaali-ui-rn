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

import { AccessibleRoutes } from './components/accessible-routes';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

export function Verify() {
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone?: string }>();
  const phoneNumber = phone || '+91 98765 43210';

  const { code, setCode, isComplete, secondsLeft, handleResend } = useOtpInput(
    OTP_LENGTH,
    RESEND_SECONDS,
  );

  function handleVerify() {
    // TODO: verify the code against the backend once it exists. For now, continue the
    // signup flow onward to linking an email address.
    router.push('/email');
  }

  function handleChangeCode(text: string) {
    if (setCode(text).length === OTP_LENGTH) handleVerify();
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
    <FormScreen>
      <Header onBack={() => router.back()} />

      <View style={styles.intro}>
        <ThemedText type="headline">Enter the code</ThemedText>
        <SentToRow recipient={phoneNumber} onEdit={() => router.back()} />
      </View>

      <OtpInput
        code={code}
        length={OTP_LENGTH}
        onChangeCode={handleChangeCode}
        secondsLeft={secondsLeft}
        onResend={handleResend}
      />

      <Button title="Verify" disabled={!isComplete} onPress={handleVerify} />

      {secondsLeft === 0 && (
        <View style={styles.section}>
          <ThemedText type="smallBold" themeColor="textSecondary">
            Didn&apos;t get a code?
          </ThemedText>
          <AccessibleRoutes onWhatsApp={handleWhatsApp} onCall={handleCall} />
        </View>
      )}

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
  section: {
    gap: Spacing.two,
  },
});
