import { useRouter } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '@/components/avatar';
import { BrandMark } from '@/components/brand-mark';
import { Button } from '@/components/button';
import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function ListSpace() {
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  function handleGetStarted() {
    router.push('/list-spot/location');
  }

  return (
    <ThemedView style={styles.screen}>
      <View
        style={[
          styles.header,
          { paddingTop: Platform.OS === 'android' ? insets.top + Spacing.three : Spacing.three },
        ]}>
        <BrandMark />
        <Avatar />
      </View>

      <View style={styles.body}>
        <View style={[styles.iconCircle, { backgroundColor: theme.accentMuted }]}>
          <Icon name={{ sf: 'plus.circle.fill', md: 'add-circle' }} size={32} color={theme.accent} />
        </View>
        <ThemedText type="headline" style={styles.title}>
          List your parking space
        </ThemedText>
        <ThemedText type="default" themeColor="textSecondary" style={styles.message}>
          Turn an empty spot into income — pin its location, add a few photos, and set your
          price.
        </ThemedText>

        <Button title="Get started →" onPress={handleGetStarted} style={styles.cta} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    gap: Spacing.two,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.two,
  },
  title: {
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    marginBottom: Spacing.two,
  },
  cta: {
    width: '100%',
  },
});
