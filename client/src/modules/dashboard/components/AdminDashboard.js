import AdminAnalyticsSection from './AdminAnalyticsSection';
import AdminContactMessagesPanel from './AdminContactMessagesPanel';
import AdminUserPanel from './AdminUserPanel';
import RoleDashboardShell from './RoleDashboardShell';
import {
  ADMIN_DASHBOARD_SECTIONS,
  DEFAULT_ADMIN_SECTION,
} from '../data/adminDashboardSections';

const SECTION_PANELS = {
  analytics: AdminAnalyticsSection,
  contact: AdminContactMessagesPanel,
  users: AdminUserPanel,
};

function AdminDashboard() {
  return (
    <RoleDashboardShell
      sections={ADMIN_DASHBOARD_SECTIONS}
      defaultSection={DEFAULT_ADMIN_SECTION}
      ariaLabel="Admin dashboard sections"
      idPrefix="admin"
    >
      {(activeSection) => {
        const ActivePanel = SECTION_PANELS[activeSection];
        return <ActivePanel />;
      }}
    </RoleDashboardShell>
  );
}

export default AdminDashboard;
