import { StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function RateField({
  label,
  value,
  onChangeText,
  hint,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  hint?: string;
}) {
  const theme = useTheme();

  return (
    <View style={[styles.field, { backgroundColor: theme.backgroundElement }]}>
      <View style={styles.text}>
        <ThemedText type="default">{label}</ThemedText>
        {hint && (
          <ThemedText type="small" themeColor="textSecondary">
            {hint}
          </ThemedText>
        )}
      </View>
      <View style={styles.inputRow}>
        <ThemedText type="defaultBold" themeColor="textSecondary">
          ₹
        </ThemedText>
        <TextInput
          value={value}
          onChangeText={(text) => onChangeText(text.replace(/\D/g, ''))}
          accessibilityLabel={`Rate ${label.toLowerCase()} in rupees`}
          keyboardType="number-pad"
          style={[styles.input, { color: theme.text }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
  },
  text: {
    flex: 1,
    gap: Spacing.half,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.half,
  },
  input: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 700,
    padding: 0,
    width: 72,
    textAlign: 'right',
    outlineWidth: 0,
  },
});
