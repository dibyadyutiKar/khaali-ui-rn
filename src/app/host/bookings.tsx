import { ComingSoon } from '@/components/coming-soon';

export default function HostBookingsScreen() {
  return (
    <ComingSoon
      icon={{ sf: 'calendar', md: 'event' }}
      title="Bookings"
      message="A full calendar of every booking across your spaces will show up here."
    />
  );
}
