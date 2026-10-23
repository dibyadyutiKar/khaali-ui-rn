import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { Icon } from '@/components/icon';
import { TabHeader } from '@/components/tab-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function ListSpace() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <ThemedView style={styles.screen}>
      <TabHeader />

      <ScrollView
        style={styles.screen}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.body}>
        <View style={[styles.iconCircle, { backgroundColor: theme.backgroundElement }]}>
          <Icon name={{ sf: 'parkingsign', md: 'local-parking' }} size={28} color={theme.text} />
        </View>
        <ThemedText type="headline" style={styles.center}>
          List your parking space
        </ThemedText>
        <ThemedText type="default" themeColor="textSecondary" style={styles.center}>
          Pin your spot, add photos, set your price.
        </ThemedText>

        <Button
          title="Get started"
          onPress={() => router.push('/list-spot/location')}
          style={styles.cta}
        />

        <Pressable
          accessibilityRole="link"
          onPress={() => router.push('/host/dashboard')}
          hitSlop={Spacing.two}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>
          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.link}>
            Already hosting? Open Host Dashboard
          </ThemedText>
        </Pressable>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  body: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.four,
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
  center: {
    textAlign: 'center',
  },
  cta: {
    alignSelf: 'stretch',
    marginTop: Spacing.three,
  },
  link: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: Spacing.two,
  },
});
