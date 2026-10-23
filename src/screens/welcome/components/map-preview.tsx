import { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { PricePin } from './price-pin';

const ROAD_GAP = Spacing.two;

/**
 * Stylized map illustration: city "blocks" laid out with flexbox, with the gaps between them
 * doubling as roads, so it reflows at any width instead of relying on fixed coordinates.
 */
export function MapPreview({ style }: { style?: StyleProp<ViewStyle> }) {
  const theme = useTheme();
  const roadColor = theme.backgroundSelected;

  return (
    <View
      style={[styles.card, { backgroundColor: theme.backgroundElement }, style]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants">
      <View style={styles.grid}>
        <View style={[styles.column, styles.leftColumn, { borderRightColor: roadColor }]}>
          <Block flex={0.3} end alignStart>
            <PricePin price="₹40" period="/hr" />
          </Block>
          <Block flex={0.42} />
          <Block flex={0.28} />
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
});
