import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Icon } from '@/components/icon';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * Two modes: a real editable field, or a non-editable button styled identically that navigates
 * on tap — pass `editable={false}` + `onPress` for the latter instead of forking the visual.
 */
export function SearchBar({
  value,
  onChangeText,
  onSubmit,
  onClear,
  onPress,
  editable = true,
  autoFocus,
  placeholder = 'Where do you want to park?',
}: {
  value: string;
  onChangeText?: (text: string) => void;
  onSubmit?: () => void;
  onClear?: () => void;
  onPress?: () => void;
  editable?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
}) {
  const theme = useTheme();

  const content = (
    <View style={[styles.row, { backgroundColor: theme.backgroundElement }]}>
      <Icon name={{ sf: 'magnifyingglass', md: 'search' }} size={18} color={theme.textSecondary} />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
        autoFocus={autoFocus}
        editable={editable}
        placeholder={placeholder}
        accessibilityLabel={placeholder}
        placeholderTextColor={theme.textSecondary}
        style={[styles.input, { color: theme.text }]}
        pointerEvents={editable ? 'auto' : 'none'}
      />

      {editable && value.length > 0 && onClear && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          onPress={onClear}
          hitSlop={Spacing.two}>
          <Icon name={{ sf: 'xmark.circle.fill', md: 'cancel' }} size={18} color={theme.textSecondary} />
        </Pressable>
      )}
    </View>
  );

  if (!editable && onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={placeholder}
        onPress={onPress}
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    borderRadius: Radius.full,
    borderCurve: 'continuous',
  },
  input: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
    padding: 0,
    outlineWidth: 0,
  },
});
