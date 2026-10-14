import { useState } from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function TextField({
  label,
  prefix,
  style,
  onFocus,
  onBlur,
  ...inputProps
}: TextInputProps & { label: string; prefix?: string; style?: StyleProp<TextStyle> }) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.container}>
      <ThemedText type="small" themeColor="textSecondary" style={styles.label}>
        {label}
      </ThemedText>

      <View
        style={[
          styles.field,
          {
            backgroundColor: theme.backgroundElement,
            borderColor: focused ? theme.text : 'transparent',
          },
        ]}>
        {prefix ? (
          <ThemedText type="statValue" style={styles.prefix}>
            {prefix}
          </ThemedText>
        ) : null}
        <TextInput
          {...inputProps}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          placeholderTextColor={theme.textSecondary}
          style={[styles.input, { color: theme.text }, style]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.one,
  },
  label: {
    fontWeight: 600,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
    borderWidth: 2,
  },
  prefix: {
    opacity: 0.6,
  },
  input: {
    flex: 1,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: 700,
    padding: 0,
    // Web renders a real <input> with its own native focus ring; the outer field View
    // already shows focus via borderColor, so suppress the browser's default outline.
    outlineWidth: 0,
  },
});
