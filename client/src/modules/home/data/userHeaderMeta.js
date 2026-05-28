import { USER_ROLES } from '../../../shared/constants/roles';

export const USER_HEADER_COPY = {
  [USER_ROLES.STUDENT]: {
    label: 'Student Dashboard',
    description: 'Track assignments, course progress, and learning activity.',
  },
  [USER_ROLES.FACULTY]: {
    label: 'Faculty Portal',
    description: 'Manage student profiles and monitor class progress analytics.',
  },
  [USER_ROLES.ADMIN]: {
    label: 'Admin Control Panel',
    description: 'Manage users, review contact messages, and monitor platform health.',
  },
};

export function getUserHeaderMeta(user) {
  if (!user) {
    return [];
  }

  if (user.role === USER_ROLES.STUDENT) {
    return [
      { label: 'Track', value: user.academicTrack },
      { label: 'Graduation', value: user.graduationYear },
    ].filter((item) => item.value);
  }

  if (user.role === USER_ROLES.FACULTY) {
    return [
      { label: 'Department', value: user.department },
      { label: 'Employee ID', value: user.employeeId },
    ].filter((item) => item.value);
  }

  if (user.role === USER_ROLES.ADMIN) {
    return [{ label: 'Access', value: user.accessLevel }].filter((item) => item.value);
  }

  return [];
}
