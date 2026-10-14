import { Pressable, StyleSheet, View } from 'react-native';

import { Dot } from '@/components/dot';
import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { OtpBox } from './otp-box';

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function OtpCard({
  digits,
  secondsLeft,
  totalSeconds,
  onResend,
  resendLabel = 'Resend via SMS',
}: {
  digits: string[];
  secondsLeft: number;
  totalSeconds: number;
  onResend: () => void;
  resendLabel?: string;
}) {
  const theme = useTheme();
  const activeIndex = digits.findIndex((d) => d === '');
  const isComplete = activeIndex === -1;
  const canResend = secondsLeft === 0;
  const progress = secondsLeft / totalSeconds;

  return (
    <View style={[styles.card, { backgroundColor: theme.background, borderColor: theme.backgroundSelected }]}>
      <View style={styles.headerRow}>
        <ThemedText type="small" style={styles.cardLabel}>
          Authentication Code
        </ThemedText>
        <View style={styles.statusRow}>
          <Dot color={isComplete ? theme.accent : theme.textSecondary} size={6} />
          <ThemedText type="label" themeColor={isComplete ? 'accent' : 'textSecondary'}>
            {isComplete ? 'Code complete' : 'Awaiting input'}
          </ThemedText>
        </View>
      </View>

      <View style={styles.boxRow}>
        {digits.map((digit, index) => (
          <OtpBox key={index} digit={digit} active={index === activeIndex} />
        ))}
      </View>

      <View style={[styles.progressTrack, { backgroundColor: theme.backgroundSelected }]}>
        <View
          style={[
            styles.progressFill,
            { backgroundColor: theme.accent, width: `${Math.max(0, progress) * 100}%` },
          ]}
        />
      </View>

      <View style={styles.footerRow}>
        <View style={styles.resendTimer}>
          <Icon name={{ sf: 'clock', md: 'schedule' }} size={14} color={theme.textSecondary} />
          <ThemedText type="small" themeColor="textSecondary">
            {canResend ? 'You can resend now' : `Resend code in ${formatTime(secondsLeft)}`}
          </ThemedText>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={resendLabel}
          accessibilityState={{ disabled: !canResend }}
          disabled={!canResend}
          onPress={onResend}
          hitSlop={Spacing.two}>
          <ThemedText
            type="small"
            themeColor={canResend ? 'accent' : 'textSecondary'}
            style={[styles.resendLabel, !canResend && styles.resendLabelDisabled]}>
            {resendLabel}
          </ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
    padding: Spacing.three,
    gap: Spacing.three,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardLabel: {
    fontWeight: 600,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  boxRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  progressTrack: {
    height: 4,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: Radius.full,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resendTimer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  resendLabel: {
    fontWeight: 600,
  },
  resendLabelDisabled: {
    opacity: 0.6,
  },
});
