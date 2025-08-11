// Mock data for QuickCourt demo flows
export type Review = {
  user: string;
  rating: number; // 1-5
  comment: string;
  date: string; // ISO
};

export type Court = {
  id: string;
  name: string;
  sport: string;
  pricePerHour: number;
  operatingHours: string; // e.g., 6:00-22:00
  availableSlots: string[]; // e.g., '2025-08-11T18:00:00'
};

export type Venue = {
  id: string;
  name: string;
  description: string;
  address: string;
  sports: string[];
  amenities: string[];
  about: string;
  photos: string[];
  reviews: Review[];
  courts: Court[];
};

export const venues: Venue[] = [
  {
    id: '1',
    name: 'Ace Sports Complex',
    description: 'Premium indoor courts with pro-grade flooring and lighting.',
    address: 'Koramangala, Bengaluru',
    sports: ['Badminton', 'Table Tennis'],
    amenities: ['Parking', 'Locker Rooms', 'Drinking Water', 'Coaching'],
    about:
      'Ace Sports Complex offers high-quality indoor courts with LED lighting and cushioned flooring. Ideal for both casual games and professional coaching sessions.',
    photos: [
      '/api/placeholder/800/500',
      '/api/placeholder/800/501',
      '/api/placeholder/800/502',
    ],
    reviews: [
      { user: 'Rahul', rating: 5, comment: 'Great courts and friendly staff!', date: '2025-08-05' },
      { user: 'Sneha', rating: 4, comment: 'Clean and well maintained.', date: '2025-08-03' },
    ],
    courts: [
      {
        id: 'c1',
        name: 'Court 1',
        sport: 'Badminton',
        pricePerHour: 1200,
        operatingHours: '06:00-22:00',
        availableSlots: [
          '2025-08-11T06:00:00',
          '2025-08-11T07:00:00',
          '2025-08-11T18:00:00',
          '2025-08-11T19:00:00',
        ],
      },
      {
        id: 'c2',
        name: 'Court 2',
        sport: 'Badminton',
        pricePerHour: 1200,
        operatingHours: '06:00-22:00',
        availableSlots: [
          '2025-08-11T17:00:00',
          '2025-08-11T20:00:00',
          '2025-08-12T07:00:00',
        ],
      },
      {
        id: 'c3',
        name: 'Table 1',
        sport: 'Table Tennis',
        pricePerHour: 600,
        operatingHours: '07:00-21:00',
        availableSlots: ['2025-08-11T09:00:00', '2025-08-11T19:00:00'],
      },
    ],
  },
  {
    id: '2',
    name: 'Court Champions',
    description: 'Outdoor tennis courts with night lighting and pro nets.',
    address: 'Indiranagar, Bengaluru',
    sports: ['Tennis'],
    amenities: ['Parking', 'Pro Shop', 'Showers'],
    about:
      'Court Champions provides top-notch outdoor tennis courts maintained to competitive standards, with coaching and equipment available on-site.',
    photos: ['/api/placeholder/800/510', '/api/placeholder/800/511'],
    reviews: [{ user: 'Aisha', rating: 5, comment: 'Best tennis courts in town!', date: '2025-08-04' }],
    courts: [
      {
        id: 't1',
        name: 'Court A',
        sport: 'Tennis',
        pricePerHour: 1800,
        operatingHours: '06:00-23:00',
        availableSlots: ['2025-08-11T18:00:00', '2025-08-11T19:00:00'],
      },
    ],
  },
];

export type Booking = {
  id: string;
  venueId: string;
  venueName: string;
  courtId: string;
  courtName: string;
  sport: string;
  dateTime: string; // ISO start time
  durationHours: number;
  price: number;
  status: 'confirmed' | 'cancelled' | 'completed' | 'pending';
};

const BOOKINGS_KEY = 'quickcourt_bookings';

export function getBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    return raw ? (JSON.parse(raw) as Booking[]) : [];
  } catch {
    return [];
  }
}

export function saveBooking(b: Booking) {
  const list = getBookings();
  list.push(b);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(list));
}

export function cancelBooking(id: string) {
  const list = getBookings().map((x) => (x.id === id ? { ...x, status: 'cancelled' } : x));
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(list));
}

export function completePastBookings() {
  const now = new Date().toISOString();
  const list = getBookings().map((x) => (x.dateTime < now && x.status === 'confirmed' ? { ...x, status: 'completed' } : x));
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(list));
}

export function findVenue(id: string) {
  return venues.find((v) => v.id === id);
}
