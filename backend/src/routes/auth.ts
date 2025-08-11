import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/User';
import { signToken } from '../utils/jwt';
import { requireAuth, AuthedRequest } from '../middleware/auth';

const router = Router();

const SignupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['user', 'facility_owner', 'admin']).optional()
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  const parsed = SignupSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.format() });

  const { name, email, password, role } = parsed.data;
  try {
    const existing = await UserModel.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ name, email, passwordHash, role: role || 'user', isVerified: true });

    const token = signToken({ userId: String(user._id), role: user.role as any });
    return res.status(201).json({
      user: { _id: user._id, name: user.name, email: user.email, role: user.role, isVerified: user.isVerified },
      token
    });
  } catch (e: any) {
    if (e?.code === 11000) return res.status(409).json({ error: 'Email already registered' });
    console.error(e);
    return res.status(500).json({ error: 'Failed to sign up' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const parsed = LoginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.format() });

  const { email, password } = parsed.data;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const token = signToken({ userId: String(user._id), role: user.role as any });
    return res.json({
      user: { _id: user._id, name: user.name, email: user.email, role: user.role, isVerified: user.isVerified },
      token
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Failed to login' });
  }
});

// GET /api/auth/me
router.get('/me', requireAuth, async (req: AuthedRequest, res) => {
  try {
    const u = await UserModel.findById(req.user!.userId).lean();
    if (!u) return res.status(404).json({ error: 'User not found' });
    return res.json({ user: { _id: u._id, name: u.name, email: u.email, role: u.role, isVerified: u.isVerified } });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Failed to load profile' });
  }
});

export default router;
