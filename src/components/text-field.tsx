import { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function TextField({
  label,
  prefix,
  onFocus,
  onBlur,
  ...inputProps
}: Omit<TextInputProps, 'style'> & { label: string; prefix?: string }) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.container}>
      <ThemedText type="smallBold" themeColor="textSecondary">
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
          <ThemedText type="statValue" themeColor="textSecondary">
            {prefix}
          </ThemedText>
        ) : null}
        <TextInput
          accessibilityLabel={label}
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
          style={[styles.input, { color: theme.text }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.one,
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
  input: {
    flex: 1,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: 600,
    padding: 0,
    // Web renders a real <input> with its own focus ring; the field's border already shows focus.
    outlineWidth: 0,
  },
});
