import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Icon } from '@/components/icon';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * Two modes: a real editable field (search-location screen), or a non-editable button
 * styled identically that navigates to that screen on tap (Find's embedded bar) — pass
 * `editable={false}` + `onPress` for the latter instead of forking the visual treatment.
 */
export function SearchBar({
  value,
  onChangeText,
  onVoicePress,
  onClear,
  onPress,
  editable = true,
  placeholder = 'Where do you want to park?',
}: {
  value: string;
  onChangeText?: (text: string) => void;
  onVoicePress: () => void;
  onClear?: () => void;
  onPress?: () => void;
  editable?: boolean;
  placeholder?: string;
}) {
  const theme = useTheme();

  const content = (
    <View style={[styles.row, { backgroundColor: theme.background }]}>
      <Icon name={{ sf: 'magnifyingglass', md: 'search' }} size={18} color={theme.textSecondary} />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        placeholder={placeholder}
        placeholderTextColor={theme.textSecondary}
        style={[styles.input, { color: theme.text, outlineWidth: 0 }]}
        pointerEvents={editable ? 'auto' : 'none'}
      />

      {editable && value.length > 0 && onClear && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          onPress={onClear}
          hitSlop={Spacing.one}>
          <Icon name={{ sf: 'xmark.circle.fill', md: 'cancel' }} size={18} color={theme.textSecondary} />
        </Pressable>
      )}

      {editable ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Search by voice"
          onPress={onVoicePress}
          hitSlop={Spacing.one}>
          <Icon name={{ sf: 'mic.fill', md: 'mic' }} size={18} color={theme.textSecondary} />
        </Pressable>
      ) : (
        // Non-editable mode wraps this whole row in one outer Pressable (below) — a nested
        // Pressable here would render an invalid <button> inside a <button> on web and
        // double-fire on tap. The mic is decorative; voice search is reachable once on the
        // real editable field this button navigates to.
        <Icon name={{ sf: 'mic.fill', md: 'mic' }} size={18} color={theme.textSecondary} />
      )}
    </View>
  );

  if (!editable && onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={placeholder} onPress={onPress}>
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
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
});
