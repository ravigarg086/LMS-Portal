import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LucideIcon from './LucideIcon';
import ChangePasswordModal from './ChangePasswordModal';
import ProfileModal from './ProfileModal';
import { useAuth } from '../../../shared/auth/AuthContext';
import { getUserAvatarUrl } from '../../../shared/utils/userAvatar';

function ProfileMenu({ user }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const displayName = user?.fullName || 'User';
  const displayRole = user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : '';
  const avatarUrl = getUserAvatarUrl(user);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [open]);

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    navigate('/');
  };

  const handleViewProfile = () => {
    setOpen(false);
    setProfileOpen(true);
  };

  const handleChangePassword = () => {
    setOpen(false);
    setPasswordOpen(true);
  };

  return (
    <>
      <div className="profile-menu" ref={menuRef}>
        <button
          type="button"
          className="profile-menu__trigger"
          aria-expanded={open}
          aria-haspopup="menu"
          aria-label={`Account menu for ${displayName}`}
          onClick={() => setOpen((current) => !current)}
        >
          <img src={avatarUrl} alt="" className="profile-menu__avatar" />
          <span className="profile-menu__text">
            <span className="profile-menu__name">{displayName}</span>
            <span className="profile-menu__role">{displayRole}</span>
          </span>
          <LucideIcon name="chevron-down" size={16} className="profile-menu__chevron" />
        </button>

        {open && (
          <div className="profile-menu__dropdown" role="menu">
            <div className="profile-menu__dropdown-header">
              <strong>{displayName}</strong>
              <span>{user?.email}</span>
            </div>
            <button
              type="button"
              className="profile-menu__item"
              role="menuitem"
              onClick={handleViewProfile}
            >
              <LucideIcon name="user" size={18} />
              My profile
            </button>
            <button
              type="button"
              className="profile-menu__item"
              role="menuitem"
              onClick={handleChangePassword}
            >
              <LucideIcon name="settings" size={18} />
              Change password
            </button>
            <button
              type="button"
              className="profile-menu__item profile-menu__item--danger"
              role="menuitem"
              onClick={handleLogout}
            >
              <LucideIcon name="log-out" size={18} />
              Sign out
            </button>
          </div>
        )}
      </div>

      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} user={user} />
      <ChangePasswordModal open={passwordOpen} onClose={() => setPasswordOpen(false)} />
    </>
  );
}

export default ProfileMenu;
