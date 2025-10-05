require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./lib/db');

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration for frontend and admin
app.use(cors({
  origin: [process.env.FRONTEND_URL || 'http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));

app.use(express.json());

// Routes
const exampleRoutes = require('./routes/exampleRoutes');
const testimonialRoutes = require('./routes/testimonial.route');
const faqRoutes = require('./routes/faq.route');
const blogRoutes = require('./routes/blog.route');
const termsRoutes = require('./routes/termsAndConditions.route');
app.use('/api', exampleRoutes);
app.use('/api', testimonialRoutes);
app.use('/api', faqRoutes);
app.use('/api', blogRoutes);
app.use('/api', termsRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Prozecto Backend API' });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});