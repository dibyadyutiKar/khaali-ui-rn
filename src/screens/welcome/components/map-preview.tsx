import { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { Dot } from './dot';
import { PricePin } from './price-pin';

const ROAD_GAP = Spacing.two;

/**
 * Stylized map illustration: city "blocks" laid out with flexbox, with the gaps between them
 * doubling as dashed roads (border-on-the-gap, not absolute-positioned lines) so the whole
 * thing reflows cleanly at any width instead of relying on fixed coordinates.
 */
export function MapPreview({ style }: { style?: StyleProp<ViewStyle> }) {
  const theme = useTheme();
  const roadColor = theme.backgroundSelected;

  return (
    <View style={[styles.card, { backgroundColor: theme.backgroundElement }, style]}>
      <View style={styles.grid}>
        <View style={[styles.column, styles.leftColumn, { borderRightColor: roadColor }]}>
          <Block flex={0.3} end alignStart>
            <PricePin price="₹40" period="/hr" />
          </Block>
          <Block flex={0.42} />
          <Block flex={0.28} center>
            <Dot color={theme.accent} size={10} />
            <ThemedText type="small" themeColor="textSecondary" style={styles.markerLabel}>
              SONY WORLD JCT
            </ThemedText>
          </Block>
        </View>

        <View style={[styles.column, styles.rightColumn]}>
          <Block
            flex={0.3}
            style={{ borderBottomColor: roadColor, borderBottomWidth: 1, borderStyle: 'dashed' }}
          />
          <Block flex={0.42} featured center>
            <PricePin price="₹2,500" period="/mo" featured />
          </Block>
          <View style={[styles.row, { flex: 0.28 }]}>
            <Block flex={1} />
            <Block flex={1} end alignEnd>
              <PricePin price="₹150" period="/day" />
            </Block>
          </View>
        </View>
      </View>

      <ThemedText type="small" themeColor="textSecondary" style={styles.horizontalRoadLabel}>
        100 FT ROAD
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary" style={styles.verticalRoadLabel}>
        80 FT INTERMEDIATE
      </ThemedText>
    </View>
  );
}

function Block({
  flex,
  featured,
  center,
  end,
  alignStart,
  alignEnd,
  style,
  children,
}: {
  flex: number;
  featured?: boolean;
  center?: boolean;
  end?: boolean;
  alignStart?: boolean;
  alignEnd?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.block,
        { flex, backgroundColor: featured ? theme.mapBlockFeatured : theme.mapBlock },
        center && styles.blockCenter,
        end && styles.blockEnd,
        alignStart && styles.blockAlignStart,
        alignEnd && styles.blockAlignEnd,
        style,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    aspectRatio: 1.3,
    padding: Spacing.two,
    borderRadius: Radius.xl,
    borderCurve: 'continuous',
    overflow: 'hidden',
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    gap: ROAD_GAP,
  },
  row: {
    flexDirection: 'row',
    gap: ROAD_GAP,
  },
  column: {
    flex: 1,
    gap: ROAD_GAP,
  },
  leftColumn: {
    flex: 0.32,
    borderRightWidth: 1,
    borderStyle: 'dashed',
  },
  rightColumn: {
    flex: 0.68,
  },
  block: {
    flex: 1,
    borderRadius: Radius.md,
    borderCurve: 'continuous',
    padding: Spacing.one,
  },
  blockCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockEnd: {
    justifyContent: 'flex-end',
  },
  blockAlignStart: {
    alignItems: 'flex-start',
  },
  blockAlignEnd: {
    alignItems: 'flex-end',
  },
  // Map-annotation text sits intentionally below the smallest ThemedText scale step (10px vs.
  // the 14px "small" type) — these are decorative cartography labels, not a reusable text role.
  markerLabel: {
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 13,
    letterSpacing: 0.3,
  },
  horizontalRoadLabel: {
    position: 'absolute',
    top: '24%',
    left: '46%',
    fontSize: 9,
    lineHeight: 11,
    letterSpacing: 0.3,
  },
  verticalRoadLabel: {
    position: 'absolute',
    top: '38%',
    left: '24%',
    width: 110,
    textAlign: 'center',
    fontSize: 9,
    lineHeight: 11,
    letterSpacing: 0.3,
    transform: [{ rotate: '-90deg' }],
  },
});
