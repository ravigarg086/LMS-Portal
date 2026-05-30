import { SECTION_IDS } from '../constants';

/** Maps sidebar nav item ids to on-page section element ids for scroll tracking. */
export const NAV_SECTION_MAP = {
  dashboard: SECTION_IDS.home,
  courses: SECTION_IDS.popularCourses,
  assignment: SECTION_IDS.assignment,
  progress: SECTION_IDS.progress,
  registration: SECTION_IDS.registration,
  'external-data': SECTION_IDS.externalData,
  subscription: SECTION_IDS.subscription,
};

export const GUEST_NAV_SECTION_MAP = {
  dashboard: 'guest-overview',
  courses: SECTION_IDS.popularCourses,
  registration: NAV_SECTION_MAP.registration,
  'external-data': NAV_SECTION_MAP['external-data'],
  subscription: NAV_SECTION_MAP.subscription,
};

export const TRACKED_SECTION_IDS = [
  SECTION_IDS.home,
  SECTION_IDS.assignment,
  SECTION_IDS.progress,
  SECTION_IDS.learningActivity,
  SECTION_IDS.popularCourses,
  'guest-overview',
  'guest-portal',
  'guest-roles',
];
