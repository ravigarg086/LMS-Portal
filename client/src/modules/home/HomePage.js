import HomeNavbar from './components/HomeNavbar';
import HomeHero from './components/HomeHero';
import FeatureScrollSpy from './components/FeatureScrollSpy';
import Testimonials from './components/Testimonials';
import FaqSection from './components/FaqSection';
import HomeFooter from './components/HomeFooter';
import './home.css';

function HomePage() {
  return (
    <div className="home-page">
      <HomeNavbar />
      <main id="main-content">
        <HomeHero />
        <FeatureScrollSpy />
        <Testimonials />
        <FaqSection />
      </main>
      <HomeFooter />
    </div>
  );
}

export default HomePage;
