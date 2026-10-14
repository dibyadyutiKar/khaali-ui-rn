import { ComingSoon } from '@/components/coming-soon';

export default function ListSpaceScreen() {
  return (
    <ComingSoon
      icon={{ sf: 'plus.circle.fill', md: 'add-circle' }}
      title="List your space"
      message="The host flow for listing a parking spot, storage unit, or warehouse is coming soon."
    />
  );
}
