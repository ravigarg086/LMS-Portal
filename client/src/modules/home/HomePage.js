import DashboardContent from './components/DashboardContent';
import { ThemeProvider } from './context/ThemeProvider';
import './home.css';

function HomePage() {
  return (
    <ThemeProvider>
      <div className="home-page eduhive-app">
        <DashboardContent />
      </div>
    </ThemeProvider>
  );
}

export default HomePage;
