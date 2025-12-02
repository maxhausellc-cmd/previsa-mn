import express from 'express';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 3001;

// Frontend URL-г зөв оруулах
app.use(cors({
  origin: ['http://localhost:5173', 'https://previsa-mn-frontend.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Example routes
app.post('/api/auth/register', (req, res) => {
  res.json({ message: 'User registered' });
});

app.post('/api/auth/login', (req, res) => {
  res.json({ message: 'User logged in' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Previsa MN backend running on http://localhost:${PORT}`);
});


