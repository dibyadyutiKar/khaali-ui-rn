import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolView, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';

export type IconName = {
  sf: SymbolViewProps['name'];
  md: ComponentProps<typeof MaterialIcons>['name'];
};

/**
 * One icon family per platform: real SF Symbols on iOS, Material on Android — SF Symbols
 * render nothing on Android, so every icon needs both names (see expo-native-ui "Icons").
 */
export function Icon({
  name,
  size = 20,
  color,
}: {
  name: IconName;
  size?: number;
  color: string;
}) {
  if (process.env.EXPO_OS === 'ios') {
    return (
      <SymbolView
        name={name.sf}
        tintColor={color}
        resizeMode="scaleAspectFit"
        style={{ width: size, height: size }}
      />
    );
  }

  return <MaterialIcons name={name.md} size={size} color={color} />;
}
