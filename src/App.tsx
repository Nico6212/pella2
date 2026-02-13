import { Routes, Route } from 'react-router-dom';
import { TileTransitionProvider } from './components/TileTransition';
import HomePage from './pages/HomePage';
import MariageGallery from './pages/MariageGallery';
import CelebrationGallery from './pages/CelebrationGallery';
import PortfolioGallery from './pages/PortfolioGallery';
import CorporateGallery from './pages/CorporateGallery';
import LuxeGallery from './pages/LuxeGallery';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import ProtectedRoute from './admin/components/ProtectedRoute';
import HeroEditor from './admin/editors/HeroEditor';
import AboutEditor from './admin/editors/AboutEditor';
import ServicesEditor from './admin/editors/ServicesEditor';
import PortfolioEditor from './admin/editors/PortfolioEditor';
import ContactEditor from './admin/editors/ContactEditor';
import FooterEditor from './admin/editors/FooterEditor';
import NavbarEditor from './admin/editors/NavbarEditor';

function App() {
  return (
    <TileTransitionProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/mariage-pela" element={<MariageGallery />} />
        <Route path="/celebration-vintage" element={<CelebrationGallery />} />
        <Route path="/portfolio/:slug" element={<PortfolioGallery />} />
        <Route path="/evenements-corporate" element={<CorporateGallery />} />
        <Route path="/experiences-luxe" element={<LuxeGallery />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="hero" element={<HeroEditor />} />
          <Route path="about" element={<AboutEditor />} />
          <Route path="services" element={<ServicesEditor />} />
          <Route path="portfolio" element={<PortfolioEditor />} />
          <Route path="contact" element={<ContactEditor />} />
          <Route path="footer" element={<FooterEditor />} />
          <Route path="navbar" element={<NavbarEditor />} />
        </Route>
      </Routes>
    </TileTransitionProvider>
  );
}

export default App;
