import { SECTION_IDS } from '../constants';

/**
 * PRD navigation hierarchy — Home view header links only.
 * Hash anchors reserved for future route modules; no cross-view wiring in Phase A.
 */
export const homeNavItems = [
  { label: 'Home', href: `#${SECTION_IDS.home}` },
  { label: 'Course', href: `#${SECTION_IDS.course}` },
  { label: 'Registration', href: `#${SECTION_IDS.registration}` },
  { label: 'FAQ', href: `#${SECTION_IDS.faq}` },
  { label: 'External Data', href: `#${SECTION_IDS.externalData}` },
  { label: 'Subscription', href: `#${SECTION_IDS.subscription}` },
  { label: 'Sign In', href: `#${SECTION_IDS.signIn}`, emphasis: true },
];
