import HomeNavbar from './components/HomeNavbar';
import HomeHero from './components/HomeHero';
import PopularCoursesCarousel from './components/PopularCoursesCarousel';
import HomeFooter from './components/HomeFooter';
import './home.css';

function HomePage() {
  return (
    <div className="home-page d-flex flex-column min-vh-100">
      <HomeNavbar />
      <main id="main-content">
        <HomeHero />
        <PopularCoursesCarousel />
      </main>
      <HomeFooter />
    </div>
  );
}

export default HomePage;
