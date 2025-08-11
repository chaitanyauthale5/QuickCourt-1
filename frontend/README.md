# QuickCourt

QuickCourt is a sports venue booking app with role-based dashboards for Users, Facility Owners, and Admins. It features venue discovery, detailed venue pages, booking flows, user booking management, facility management, and admin moderation.

## Tech Stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui
- React Router
- React Query

## Getting Started

Prerequisites: Node.js (LTS) and npm

```
npm install
npm run dev
```

Open http://localhost:8080 in your browser.

## Available Scripts

- `npm run dev` – Start the development server
- `npm run build` – Build for production
- `npm run preview` – Preview the production build
- `npm run lint` – Lint the project

## Project Structure

- `src/pages/venues` – Venues listing and single venue details
- `src/pages/venue/BookCourt.tsx` – Booking flow
- `src/pages/bookings/MyBookings.tsx` – User bookings
- `src/pages/owner` – Facility owner dashboard and management pages
- `src/pages/admin` – Admin dashboard and management pages
- `src/lib/data.ts` – Centralized mock data and booking storage helpers

## Environment

This project currently uses mock data and localStorage for demo purposes. Integrate a backend and real payments in production.

## License

MIT
