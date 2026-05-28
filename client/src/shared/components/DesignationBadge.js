import { ROLE_LABELS } from '../constants/roles';

function DesignationBadge({ designation, className = '' }) {
  const label = ROLE_LABELS[designation] || designation;
  const roleClass = designation ? `role-badge--${designation}` : '';

  return (
    <span className={`role-badge ${roleClass}${className ? ` ${className}` : ''}`}>
      {label}
    </span>
  );
}

export default DesignationBadge;
