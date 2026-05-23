import HomeNavbar from './components/HomeNavbar';
import HomeHero from './components/HomeHero';
import FeaturedCourses from './components/FeaturedCourses';
import Testimonials from './components/Testimonials';
import HomeFooter from './components/HomeFooter';
import './home.css';

function HomePage() {
  return (
    <div className="home-page d-flex flex-column min-vh-100">
      <HomeNavbar />
      <main id="main-content" className="flex-grow-1">
        <HomeHero />
        <FeaturedCourses />
        <Testimonials />
      </main>
      <HomeFooter />
    </div>
  );
}

export default HomePage;
