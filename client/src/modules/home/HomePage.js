import DashboardContent from './components/DashboardContent';
import './home.css';

function HomePage({ user = null }) {
  return (
    <div className="home-page eduhive-app">
      <DashboardContent user={user} />
    </div>
  );
}

export default HomePage;
