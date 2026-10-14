import { StyleSheet, TextInput, View } from 'react-native';

import { Icon, IconName } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function RateField({
  label,
  value,
  onChangeText,
  hint,
  hintIcon,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  hint?: string;
  hintIcon?: IconName;
}) {
  const theme = useTheme();

  return (
    <View style={styles.wrapper}>
      <View style={[styles.field, { backgroundColor: theme.backgroundElement }]}>
        <ThemedText type="default">{label}</ThemedText>
        <View style={styles.inputRow}>
          <ThemedText type="default" themeColor="textSecondary">
            ₹
          </ThemedText>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            keyboardType="number-pad"
            style={[styles.input, { color: theme.text, outlineWidth: 0 }]}
          />
        </View>
      </View>

      {hint && (
        <View style={styles.hintRow}>
          {hintIcon && <Icon name={hintIcon} size={11} color={theme.accent} />}
          <ThemedText type="small" themeColor="accent">
            {hint}
          </ThemedText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: Spacing.one,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.three,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.half,
  },
  input: {
    fontSize: 16,
    fontWeight: 700,
    padding: 0,
    minWidth: 40,
    textAlign: 'right',
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.half,
  },
});
