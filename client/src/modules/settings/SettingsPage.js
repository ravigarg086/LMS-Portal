import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RevealUp from '../home/components/RevealUp';
import DashboardShell from '../../shared/layout/DashboardShell';
import LucideIcon from '../home/components/LucideIcon';
import ProfileModal from '../home/components/ProfileModal';
import ChangePasswordModal from '../home/components/ChangePasswordModal';
import { useAuth } from '../../shared/auth/AuthContext';
import { useTheme } from '../../shared/theme/ThemeProvider';
import { THEMES } from '../home/constants';
import { USER_ROLES } from '../../shared/constants/roles';
import SettingsCard from './components/SettingsCard';
import SettingsToggle from './components/SettingsToggle';
import { useSettings } from './hooks/useSettings';
import './settings.css';

function SettingsPage() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const isAdmin = user?.role === USER_ROLES.ADMIN;
  const {
    userSettings,
    platformSettings,
    loading,
    saving,
    error,
    success,
    saveUserSettings,
    savePlatformSettings,
    patchUserSettings,
    patchPlatformSettings,
  } = useSettings(isAdmin);

  const [profileOpen, setProfileOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [platformErrors, setPlatformErrors] = useState({});

  useEffect(() => {
    if (!loading && userSettings?.theme) {
      setTheme(userSettings.theme);
    }
  }, [loading, userSettings?.theme, setTheme]);

  const handleSaveUser = async () => {
    if (!userSettings) {
      return;
    }

    await saveUserSettings(userSettings);
  };

  const handleSavePlatform = async () => {
    if (!platformSettings) {
      return;
    }

    const nextErrors = {};
    if (!platformSettings.portalName?.trim()) {
      nextErrors.portalName = 'Portal name is required.';
    }
    if (!platformSettings.supportEmail?.trim()) {
      nextErrors.supportEmail = 'Support email is required.';
    }

    setPlatformErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      return;
    }

    await savePlatformSettings(platformSettings);
  };

  const handleThemeChange = (nextTheme) => {
    setTheme(nextTheme);
    patchUserSettings({ theme: nextTheme });
  };

  return (
    <DashboardShell activeId="settings" pageClassName="settings-page" mainClassName="settings-page__main">
      <RevealUp className="settings-page__content">
        <header className="settings-page__hero">
          <div>
            <p className="settings-page__eyebrow">Portal preferences</p>
            <h1 className="settings-page__title">Settings</h1>
            <p className="settings-page__subtitle">
              Manage appearance, notifications, privacy, and {isAdmin ? 'platform configuration' : 'your learning experience'}.
            </p>
          </div>
        </header>

        {loading && (
          <div className="settings-page__loading" role="status" aria-live="polite">
            <span className="spinner-border spinner-border-sm" aria-hidden="true" />
            <span>Loading your settings…</span>
          </div>
        )}

        {!loading && error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {!loading && success && (
          <div className="alert alert-success" role="status">
            {success}
          </div>
        )}

        {!loading && userSettings && (
          <div className="settings-page__grid">
            <SettingsCard
              title="Appearance"
              description="Choose how the portal looks on your devices."
              icon="sun"
            >
              <div className="settings-theme-toggle" role="group" aria-label="Theme preference">
                <button
                  type="button"
                  className={`settings-theme-toggle__btn${theme === THEMES.light ? ' settings-theme-toggle__btn--active' : ''}`}
                  aria-pressed={theme === THEMES.light}
                  onClick={() => handleThemeChange(THEMES.light)}
                >
                  <LucideIcon name="sun" size={18} />
                  Light
                </button>
                <button
                  type="button"
                  className={`settings-theme-toggle__btn${theme === THEMES.dark ? ' settings-theme-toggle__btn--active' : ''}`}
                  aria-pressed={theme === THEMES.dark}
                  onClick={() => handleThemeChange(THEMES.dark)}
                >
                  <LucideIcon name="moon" size={18} />
                  Dark
                </button>
              </div>
              <SettingsToggle
                id="settings-compact-layout"
                label="Compact dashboard layout"
                description="Reduce spacing on dashboard cards for more content on screen."
                checked={userSettings.dashboard.compactLayout}
                onChange={(checked) => patchUserSettings({ dashboard: { compactLayout: checked } })}
              />
              <SettingsToggle
                id="settings-welcome-banner"
                label="Show welcome banner"
                description="Display the personalized welcome panel on your dashboard."
                checked={userSettings.dashboard.showWelcomeBanner}
                onChange={(checked) => patchUserSettings({ dashboard: { showWelcomeBanner: checked } })}
              />
            </SettingsCard>

            <SettingsCard
              title="Notifications"
              description="Control email and in-app alerts for portal activity."
              icon="bell"
            >
              <SettingsToggle
                id="settings-email-assignments"
                label="Assignment reminders"
                description="Get notified about upcoming assignment deadlines."
                checked={userSettings.notifications.emailAssignments}
                onChange={(checked) => patchUserSettings({ notifications: { emailAssignments: checked } })}
              />
              <SettingsToggle
                id="settings-email-courses"
                label="Course updates"
                description="Receive alerts when enrolled courses are updated."
                checked={userSettings.notifications.emailCourseUpdates}
                onChange={(checked) => patchUserSettings({ notifications: { emailCourseUpdates: checked } })}
              />
              <SettingsToggle
                id="settings-email-announcements"
                label="Announcements"
                description="Stay informed about LMS news and campus announcements."
                checked={userSettings.notifications.emailAnnouncements}
                onChange={(checked) => patchUserSettings({ notifications: { emailAnnouncements: checked } })}
              />
              <SettingsToggle
                id="settings-in-app-alerts"
                label="In-app alerts"
                description="Show notification badges and alerts inside the portal."
                checked={userSettings.notifications.inAppAlerts}
                onChange={(checked) => patchUserSettings({ notifications: { inAppAlerts: checked } })}
              />
            </SettingsCard>

            <SettingsCard
              title="Privacy"
              description="Manage what other users can see about your activity."
              icon="shield"
            >
              <SettingsToggle
                id="settings-profile-mentors"
                label="Visible to mentors"
                description="Allow assigned mentors to view your profile summary."
                checked={userSettings.privacy.showProfileToMentors}
                onChange={(checked) => patchUserSettings({ privacy: { showProfileToMentors: checked } })}
              />
              <SettingsToggle
                id="settings-progress-public"
                label="Share progress publicly"
                description="Show course completion stats on leaderboards and peer views."
                checked={userSettings.privacy.showProgressPublicly}
                onChange={(checked) => patchUserSettings({ privacy: { showProgressPublicly: checked } })}
              />
            </SettingsCard>

            {user?.role === USER_ROLES.STUDENT && (
              <SettingsCard
                title="Student preferences"
                description="Fine-tune reminders and progress reporting."
                icon="graduation-cap"
              >
                <SettingsToggle
                  id="settings-student-reminders"
                  label="Assignment due-date reminders"
                  description="Send extra reminders 24 hours before assignments are due."
                  checked={userSettings.student.assignmentReminders}
                  onChange={(checked) => patchUserSettings({ student: { assignmentReminders: checked } })}
                />
                <SettingsToggle
                  id="settings-student-weekly"
                  label="Weekly progress email"
                  description="Receive a summary of your learning progress each week."
                  checked={userSettings.student.weeklyProgressEmail}
                  onChange={(checked) => patchUserSettings({ student: { weeklyProgressEmail: checked } })}
                />
              </SettingsCard>
            )}

            {user?.role === USER_ROLES.FACULTY && (
              <SettingsCard
                title="Faculty preferences"
                description="Configure grading alerts and student list defaults."
                icon="users"
              >
                <SettingsToggle
                  id="settings-faculty-grading"
                  label="Grading notifications"
                  description="Alert when students submit assignments for review."
                  checked={userSettings.faculty.gradingNotifications}
                  onChange={(checked) => patchUserSettings({ faculty: { gradingNotifications: checked } })}
                />
                <div className="settings-field">
                  <label className="form-label" htmlFor="settings-faculty-view">
                    Default student list view
                  </label>
                  <select
                    id="settings-faculty-view"
                    className="form-select settings-field__select"
                    value={userSettings.faculty.defaultStudentView}
                    onChange={(event) =>
                      patchUserSettings({ faculty: { defaultStudentView: event.target.value } })
                    }
                  >
                    <option value="list">List view</option>
                    <option value="grid">Grid view</option>
                  </select>
                </div>
              </SettingsCard>
            )}

            <SettingsCard
              title="Account"
              description="Update profile details and security options."
              icon="user"
            >
              <div className="settings-account-actions">
                <button type="button" className="btn btn-outline-primary settings-account-actions__btn" onClick={() => setProfileOpen(true)}>
                  <LucideIcon name="user" size={18} />
                  Edit profile
                </button>
                <button type="button" className="btn btn-outline-primary settings-account-actions__btn" onClick={() => setPasswordOpen(true)}>
                  <LucideIcon name="lock" size={18} />
                  Change password
                </button>
                <Link to={user?.role ? `/dashboard/${user.role}` : '/'} className="btn btn-link settings-account-actions__link">
                  Back to dashboard
                </Link>
              </div>
            </SettingsCard>

            {isAdmin && platformSettings && (
              <SettingsCard
                title="Platform configuration"
                description="Admin-only settings that apply across the entire LMS portal."
                icon="settings"
              >
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label" htmlFor="settings-portal-name">
                      Portal name
                    </label>
                    <input
                      id="settings-portal-name"
                      type="text"
                      className={`form-control${platformErrors.portalName ? ' is-invalid' : ''}`}
                      value={platformSettings.portalName}
                      onChange={(event) => {
                        setPlatformErrors((current) => ({ ...current, portalName: '' }));
                        patchPlatformSettings({ portalName: event.target.value });
                      }}
                    />
                    {platformErrors.portalName && (
                      <div className="invalid-feedback d-block">{platformErrors.portalName}</div>
                    )}
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label" htmlFor="settings-support-email">
                      Support email
                    </label>
                    <input
                      id="settings-support-email"
                      type="email"
                      className={`form-control${platformErrors.supportEmail ? ' is-invalid' : ''}`}
                      value={platformSettings.supportEmail}
                      onChange={(event) => {
                        setPlatformErrors((current) => ({ ...current, supportEmail: '' }));
                        patchPlatformSettings({ supportEmail: event.target.value });
                      }}
                    />
                    {platformErrors.supportEmail && (
                      <div className="invalid-feedback d-block">{platformErrors.supportEmail}</div>
                    )}
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label" htmlFor="settings-timezone">
                      Default timezone
                    </label>
                    <select
                      id="settings-timezone"
                      className="form-select"
                      value={platformSettings.defaultTimezone}
                      onChange={(event) => patchPlatformSettings({ defaultTimezone: event.target.value })}
                    >
                      <option value="America/Chicago">America/Chicago (CST)</option>
                      <option value="America/New_York">America/New_York (EST)</option>
                      <option value="America/Los_Angeles">America/Los_Angeles (PST)</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                </div>
                <SettingsToggle
                  id="settings-registration-enabled"
                  label="Open registration"
                  description="Allow new users to sign up through the registration page."
                  checked={platformSettings.registrationEnabled}
                  onChange={(checked) => patchPlatformSettings({ registrationEnabled: checked })}
                />
                <SettingsToggle
                  id="settings-maintenance-mode"
                  label="Maintenance mode"
                  description="Show a maintenance notice and restrict non-admin access."
                  checked={platformSettings.maintenanceMode}
                  onChange={(checked) => patchPlatformSettings({ maintenanceMode: checked })}
                />
                <div className="settings-page__actions settings-page__actions--inline">
                  <button
                    type="button"
                    className="btn btn-primary settings-page__save-btn"
                    onClick={handleSavePlatform}
                    disabled={saving}
                  >
                    {saving ? 'Saving…' : 'Save platform settings'}
                  </button>
                </div>
              </SettingsCard>
            )}

            <div className="settings-page__actions">
              <button
                type="button"
                className="btn btn-primary settings-page__save-btn"
                onClick={handleSaveUser}
                disabled={saving}
              >
                {saving ? 'Saving…' : 'Save personal settings'}
              </button>
            </div>
          </div>
        )}
      </RevealUp>

      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} user={user} />
      <ChangePasswordModal open={passwordOpen} onClose={() => setPasswordOpen(false)} />
    </DashboardShell>
  );
}

export default SettingsPage;
