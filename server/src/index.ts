import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { v4 as uuid } from 'uuid';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(json());

// --- In-memory demo storage ---
type Role = 'user' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  paymentStatus: 'pending' | 'paid';
}

interface Payment {
  id: string;
  userId: string;
  groupSize: number;
  amount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

const users: User[] = [];
const payments: Payment[] = [];

// Simple demo admin
const ADMIN_EMAIL = 'admin@previsa.mn';

// --- Auth routes (simple demo, no passwords) ---
app.post('/api/auth/register', (req, res) => {
  const { name, email } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }

  let existing = users.find(u => u.email === email);
  if (existing) {
    return res.json(existing);
  }

  const role: Role = email === ADMIN_EMAIL ? 'admin' : 'user';

  const user: User = {
    id: uuid(),
    name,
    email,
    role,
    paymentStatus: 'pending'
  };
  users.push(user);
  res.status(201).json(user);
});

app.post('/api/auth/login', (req, res) => {
  const { email } = req.body || {};
  if (!email) {
    return res.status(400).json({ error: 'email is required' });
  }
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(404).json({ error: 'user not found' });
  }
  res.json(user);
});

// --- Payment workflow routes ---
app.post('/api/payments', (req, res) => {
  const { userId, groupSize } = req.body || {};
  if (!userId || !groupSize || groupSize <= 0) {
    return res.status(400).json({ error: 'userId and positive groupSize are required' });
  }

  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'user not found' });
  }

  const pricePerPerson = groupSize >= 5 ? 50000 : 70000;
  const amount = pricePerPerson * groupSize;

  const payment: Payment = {
    id: uuid(),
    userId,
    groupSize,
    amount,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  payments.push(payment);
  res.status(201).json(payment);
});

app.get('/api/payments', (req, res) => {
  res.json(payments);
});

app.post('/api/payments/:id/confirm', (req, res) => {
  const id = req.params.id;
  const payment = payments.find(p => p.id === id);
  if (!payment) {
    return res.status(404).json({ error: 'payment not found' });
  }
  payment.status = 'confirmed';

  const user = users.find(u => u.id === payment.userId);
  if (user) {
    user.paymentStatus = 'paid';
  }

  res.json(payment);
});

app.post('/api/payments/:id/cancel', (req, res) => {
  const id = req.params.id;
  const payment = payments.find(p => p.id === id);
  if (!payment) {
    return res.status(404).json({ error: 'payment not found' });
  }
  payment.status = 'cancelled';
  res.json(payment);
});

// --- Health check ---
app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Previsa MN backend running on http://localhost:${PORT}`);
});


