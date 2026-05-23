import HomeNavbar from './components/HomeNavbar';
import HomeHero from './components/HomeHero';
import PopularCoursesCarousel from './components/PopularCoursesCarousel';
import './home.css';

function HomePage() {
  return (
    <div className="home-page d-flex flex-column min-vh-100">
      <HomeNavbar />
      <main>
        <HomeHero />
        <PopularCoursesCarousel />
      </main>
      <footer className="mt-auto py-3 bg-dark text-white text-center">
        <div className="container">
          <small>&copy; {new Date().getFullYear()} LMS Portal. All rights reserved.</small>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
