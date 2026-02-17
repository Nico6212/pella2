const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const createContentRouter = require('./routes/content');

const Hero = require('./models/Hero');
const About = require('./models/About');
const Services = require('./models/Services');
const Portfolio = require('./models/Portfolio');
const Contact = require('./models/Contact');
const Footer = require('./models/Footer');
const Navbar = require('./models/Navbar');

const app = express();
const PORT = process.env.PORT || 3001;

connectDB();

app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/hero', createContentRouter(Hero));
app.use('/api/about', createContentRouter(About));
app.use('/api/services', createContentRouter(Services));
app.use('/api/portfolio', createContentRouter(Portfolio));
app.use('/api/contact', createContentRouter(Contact));
app.use('/api/footer', createContentRouter(Footer));
app.use('/api/navbar', createContentRouter(Navbar));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
