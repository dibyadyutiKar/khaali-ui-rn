import { View } from 'react-native';

export function Dot({ color, size = 6 }: { color: string; size?: number }) {
  return (
    <View
      style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: color }}
    />
  );
}
