import { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * Scaffold for short, header-less onboarding/form screens. Insets are applied by hand
 * (contentInsetAdjustmentBehavior="never") because iOS's automatic insets are added *on top of*
 * a full-height content container, making screens that fit scroll anyway. The keyboard shrinks
 * the frame (KeyboardAvoidingView) instead of scrolling the content, so the header stays put.
 * Content fills the frame (`flexGrow: 1`), so a child with `flex: 1` or `marginTop: 'auto'`
 * can take up spare height on tall phones; it still scrolls when it genuinely doesn't fit.
 */
export function FormScreen({ children, footer }: { children: ReactNode; footer?: ReactNode }) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <ThemedView style={styles.fill}>
      <KeyboardAvoidingView style={styles.fill} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          style={styles.fill}
          contentInsetAdjustmentBehavior="never"
          alwaysBounceVertical={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.content,
            {
              paddingTop: insets.top + Spacing.three,
              paddingBottom: footer ? Spacing.four : insets.bottom + Spacing.four,
            },
          ]}>
          {children}
        </ScrollView>

        {footer && (
          <View
            style={[
              styles.footer,
              { backgroundColor: theme.background, paddingBottom: insets.bottom + Spacing.three },
            ]}>
            {footer}
          </View>
        )}
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.three,
    gap: Spacing.four,
  },
  footer: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
  },
});
