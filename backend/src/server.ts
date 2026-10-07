import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { findUser, getRecords, getUsers, saveUsers } from './xml-store';
import { Role, User } from './types';

const app = express();
const HOST = process.env.HOST || '0.0.0.0';
const PORT = Number(process.env.PORT || 3000);
const JWT_SECRET = process.env.JWT_SECRET || 'mploychek-demo-secret-change-me';

app.use(cors());
app.use(express.json());

interface AuthRequest extends Request { auth?: { id: string; role: Role }; }

function auth(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ message: 'Authentication required' });
  try {
    req.auth = jwt.verify(header.slice(7), JWT_SECRET) as { id: string; role: Role };
    next();
  } catch { res.status(401).json({ message: 'Invalid or expired token' }); }
}
function adminOnly(req: AuthRequest, res: Response, next: NextFunction) {
  if (req.auth?.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
  next();
}
function delay(ms: number) { return new Promise(resolve => setTimeout(resolve, Math.max(0, Math.min(ms, 10000)))); }

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'MPloyChek Challenge API' }));

app.post('/api/auth/login', async (req, res) => {
  const { login, password, role } = req.body ?? {};
  if (!login || !password || !role) return res.status(400).json({ message: 'Login, password and role are required' });
  const user = await findUser(String(login), String(password), String(role));
  if (!user) return res.status(401).json({ message: 'Invalid credentials, role or inactive account' });
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '2h' });
  const { password: _password, ...safeUser } = user;
  res.json({ token, user: safeUser });
});

app.get('/api/users/me', auth, async (req: AuthRequest, res) => {
  const users = await getUsers();
  const user = users.find(u => u.id === req.auth!.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const { password: _password, ...safeUser } = user;
  res.json(safeUser);
});

app.get('/api/records', auth, async (req: AuthRequest, res) => {
  const delayMs = Number(req.query.delay ?? 1200);
  await delay(Number.isFinite(delayMs) ? delayMs : 1200);
  const records = await getRecords();
  const data = req.auth!.role === 'admin' ? records : records.filter(r => r.userId === req.auth!.id);
  res.json({ data, meta: { count: data.length, delayedByMs: delayMs, processedAt: new Date().toISOString() } });
});

app.get('/api/users', auth, adminOnly, async (_req, res) => {
  const users = await getUsers();
  res.json(users.map(({ password: _password, ...u }) => u));
});

app.post('/api/users', auth, adminOnly, async (req, res) => {
  const { name, email, password, role, status = 'active', department } = req.body ?? {};
  if (!name || !email || !password || !role || !department) return res.status(400).json({ message: 'All user fields are required' });
  const users = await getUsers();
  if (users.some(u => u.email.toLowerCase() === String(email).toLowerCase())) return res.status(409).json({ message: 'Email already exists' });
  const user: User = { id: `USR-${Math.floor(1000 + Math.random() * 8999)}`, name, email, password, role, status, department };
  users.push(user); await saveUsers(users);
  const { password: _password, ...safeUser } = user; res.status(201).json(safeUser);
});

app.put('/api/users/:id', auth, adminOnly, async (req, res) => {
  const users = await getUsers(); const index = users.findIndex(u => u.id === req.params.id);
  if (index < 0) return res.status(404).json({ message: 'User not found' });
  const current = users[index];
  const updated: User = { ...current, ...req.body, id: current.id };
  users[index] = updated; await saveUsers(users);
  const { password: _password, ...safeUser } = updated; res.json(safeUser);
});

app.delete('/api/users/:id', auth, adminOnly, async (req: AuthRequest, res) => {
  if (req.params.id === req.auth!.id) return res.status(400).json({ message: 'You cannot delete your own account' });
  const users = await getUsers(); const index = users.findIndex(u => u.id === req.params.id);
  if (index < 0) return res.status(404).json({ message: 'User not found' });
  users[index].status = 'inactive'; await saveUsers(users); res.status(204).send();
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err); res.status(500).json({ message: 'Unexpected server error' });
});

app.listen(PORT, HOST, () => console.log(`API running on http://${HOST}:${PORT}`));
