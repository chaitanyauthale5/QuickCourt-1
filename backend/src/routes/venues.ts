import { Router } from 'express';
import { VenueModel } from '../models/Venue';

const router = Router();

// List venues (optional sport filter)
router.get('/', async (req, res) => {
  try {
    const { sport } = req.query as { sport?: string };
    const q: any = {};
    if (sport) q.sports = { $in: [sport] };
    const venues = await VenueModel.find(q).lean();
    res.json({ data: venues });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch venues' });
  }
});

// Get single venue
router.get('/:id', async (req, res) => {
  try {
    const venue = await VenueModel.findById(req.params.id).lean();
    if (!venue) return res.status(404).json({ error: 'Venue not found' });
    res.json({ data: venue });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch venue' });
  }
});

export default router;
