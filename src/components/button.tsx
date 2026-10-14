import { ActivityIndicator, Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { ThemedText } from './themed-text';

export type ButtonProps = {
  title: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md';
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const sizeStyles = {
  sm: { paddingVertical: Spacing.two, paddingHorizontal: Spacing.four },
  md: { paddingVertical: Spacing.three, paddingHorizontal: Spacing.four },
} as const;

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  loading,
  disabled,
  onPress,
  style,
}: ButtonProps) {
  const theme = useTheme();
  const isDisabled = !!(disabled || loading);
  const background = variant === 'primary' ? theme.text : theme.backgroundElement;
  const foreground = variant === 'primary' ? theme.background : theme.text;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: isDisabled, busy: !!loading }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        sizeStyles[size],
        { backgroundColor: background, opacity: disabled ? 0.4 : pressed ? 0.7 : 1 },
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={foreground as string} />
      ) : (
        <ThemedText type="default" style={[styles.label, { color: foreground }]}>
          {title}
        </ThemedText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.full,
    borderCurve: 'continuous',
  },
  label: {
    fontWeight: 600,
  },
});
