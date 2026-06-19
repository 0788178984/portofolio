const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');
const REQUESTS_FILE = path.join(DATA_DIR, 'requests.json');

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'https://asmartdev.netlify.app,http://localhost:5500,http://127.0.0.1:5500,http://localhost:8888')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(CONTACTS_FILE)) fs.writeFileSync(CONTACTS_FILE, '[]');
  if (!fs.existsSync(REQUESTS_FILE)) fs.writeFileSync(REQUESTS_FILE, '[]');
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return [];
  }
}

function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function sanitize(str, max = 5000) {
  if (typeof str !== 'string') return '';
  return str.trim().slice(0, max);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

ensureDataDir();

app.use(express.json({ limit: '32kb' }));
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || ALLOWED_ORIGINS.includes(origin) || ALLOWED_ORIGINS.includes('*')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests. Please try again later.' },
});

app.use('/api/', limiter);

app.get('/api/health', (_req, res) => {
  res.json({ success: true, status: 'ok', platform: 'Asmart Tech Platform' });
});

app.post('/api/contact', (req, res) => {
  const { name, email, phone, subject, message, service } = req.body || {};

  if (!sanitize(name, 120) || !isValidEmail(email) || !sanitize(subject, 200) || !sanitize(message, 4000)) {
    return res.status(400).json({ success: false, error: 'Name, valid email, subject, and message are required.' });
  }

  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    type: 'contact',
    name: sanitize(name, 120),
    email: sanitize(email, 200),
    phone: sanitize(phone || '', 30),
    subject: sanitize(subject, 200),
    message: sanitize(message, 4000),
    service: sanitize(service || '', 120),
    createdAt: new Date().toISOString(),
    status: 'new',
  };

  const contacts = readJson(CONTACTS_FILE);
  contacts.unshift(entry);
  writeJson(CONTACTS_FILE, contacts.slice(0, 500));

  res.status(201).json({
    success: true,
    message: 'Message received! We will respond within 24 hours.',
    id: entry.id,
  });
});

app.post('/api/service-request', (req, res) => {
  const { name, email, phone, serviceId, serviceName, description, urgency, location } = req.body || {};

  if (!sanitize(name, 120) || !isValidEmail(email) || !sanitize(description, 4000)) {
    return res.status(400).json({ success: false, error: 'Name, valid email, and description are required.' });
  }

  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    type: 'service-request',
    name: sanitize(name, 120),
    email: sanitize(email, 200),
    phone: sanitize(phone || '', 30),
    serviceId: sanitize(serviceId || '', 80),
    serviceName: sanitize(serviceName || 'General inquiry', 120),
    description: sanitize(description, 4000),
    urgency: sanitize(urgency || 'normal', 30),
    location: sanitize(location || '', 120),
    createdAt: new Date().toISOString(),
    status: 'pending',
  };

  const requests = readJson(REQUESTS_FILE);
  requests.unshift(entry);
  writeJson(REQUESTS_FILE, requests.slice(0, 500));

  res.status(201).json({
    success: true,
    message: 'Service request submitted! We will contact you to discuss pricing and next steps.',
    id: entry.id,
  });
});

app.get('/api/stats', (_req, res) => {
  res.json({
    success: true,
    contacts: readJson(CONTACTS_FILE).length,
    requests: readJson(REQUESTS_FILE).length,
  });
});

app.listen(PORT, () => {
  console.log(`Asmart Platform API running on port ${PORT}`);
});
