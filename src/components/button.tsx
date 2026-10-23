import { ActivityIndicator, Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { Icon, IconName } from '@/components/icon';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { ThemedText } from './themed-text';

export type ButtonProps = {
  title: string;
  /** `tonal` is `secondary` for use on a `backgroundElement` card, where secondary would blend in. */
  variant?: 'primary' | 'secondary' | 'tonal';
  size?: 'sm' | 'md';
  icon?: IconName;
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
  icon,
  loading,
  disabled,
  onPress,
  style,
}: ButtonProps) {
  const theme = useTheme();
  const isDisabled = !!(disabled || loading);

  const palette = {
    primary: { background: theme.text, foreground: theme.background },
    secondary: { background: theme.backgroundElement, foreground: theme.text },
    tonal: { background: theme.backgroundSelected, foreground: theme.text },
  }[variant];
  const background = disabled ? theme.backgroundSelected : palette.background;
  const foreground = disabled ? theme.textSecondary : palette.foreground;

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
        { backgroundColor: background, opacity: pressed ? 0.7 : 1 },
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={foreground} />
      ) : (
        <>
          {icon && <Icon name={icon} size={16} color={foreground} />}
          <ThemedText type="defaultBold" numberOfLines={1} style={{ color: foreground }}>
            {title}
          </ThemedText>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.one,
    borderRadius: Radius.full,
    borderCurve: 'continuous',
  },
});
