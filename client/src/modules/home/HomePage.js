import DashboardContent from './components/DashboardContent';
import './home.css';
import './super-travel.css';

function HomePage({ user = null }) {
  return (
    <div className="home-page eduhive-app">
      <DashboardContent user={user} />
    </div>
  );
}

export default HomePage;
