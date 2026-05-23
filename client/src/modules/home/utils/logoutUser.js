import { SECTION_IDS } from '../constants';
import { scrollToSection } from './scrollToSection';

const SESSION_KEY = 'lms-portal-session';

/**
 * Ends the current session and routes to the Sign In section.
 * Session data is cleared from sessionStorage only (never localStorage).
 */
export function logoutUser() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* storage unavailable */
  }

  scrollToSection(`#${SECTION_IDS.signIn}`);
}
