import { SECTION_IDS } from '../constants';

/**
 * Scroll to a page section without hash-link jitter on the dashboard anchor.
 */
export function scrollToSection(href) {
  const targetId = href.replace(/^#/, '');

  if (targetId === SECTION_IDS.home) {
    window.scrollTo({ top: 0, behavior: 'auto' });
    window.history.replaceState(null, '', `#${SECTION_IDS.home}`);
    return;
  }

  const target = document.getElementById(targetId);
  if (target) {
    target.scrollIntoView({ behavior: 'auto', block: 'start' });
    window.history.replaceState(null, '', `#${targetId}`);
  }
}

export function handleSectionNavClick(event, href) {
  event.preventDefault();
  scrollToSection(href);
}
