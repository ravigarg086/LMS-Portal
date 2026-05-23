import { NAVBAR_COLLAPSE_ID } from '../constants';

export function closeMobileNav() {
  const collapseEl = document.getElementById(NAVBAR_COLLAPSE_ID);
  if (!collapseEl?.classList.contains('show')) {
    return;
  }

  const { Collapse } = window.bootstrap ?? {};
  if (Collapse) {
    Collapse.getOrCreateInstance(collapseEl).hide();
    return;
  }

  collapseEl.classList.remove('show');
}
