import { SECTION_IDS } from '../constants';

/**
 * PRD navigation hierarchy — Home view header links only.
 * Hash anchors reserved for future route modules; no cross-view wiring in Phase A.
 */
export const homeNavItems = [
  { type: 'link', label: 'Home', href: `#${SECTION_IDS.home}` },
  { type: 'courses', label: 'Course' },
  { type: 'link', label: 'Registration', href: `#${SECTION_IDS.registration}` },
  { type: 'link', label: 'FAQ', href: `#${SECTION_IDS.faq}` },
  { type: 'link', label: 'External Data', href: `#${SECTION_IDS.externalData}` },
  { type: 'link', label: 'Subscription', href: `#${SECTION_IDS.subscription}` },
  { type: 'link', label: 'Sign In', href: `#${SECTION_IDS.signIn}`, emphasis: true },
];
