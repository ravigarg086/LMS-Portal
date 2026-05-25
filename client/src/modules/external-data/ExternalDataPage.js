import RevealUp from '../home/components/RevealUp';
import DashboardShell from '../../shared/layout/DashboardShell';
import ExternalUsersTable from './components/ExternalUsersTable';
import './external-data.css';

function ExternalDataPage() {
  return (
    <DashboardShell
      activeId="external-data"
      pageClassName="external-data-page"
      mainClassName="external-data-page__main"
    >
      <RevealUp>
        <ExternalUsersTable />
      </RevealUp>
    </DashboardShell>
  );
}

export default ExternalDataPage;
