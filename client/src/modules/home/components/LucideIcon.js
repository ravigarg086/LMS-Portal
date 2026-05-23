const ICONS = {
  'layout-dashboard':
    'M3 3h8v8H3V3zm10 0h8v5h-8V3zM3 13h8v8H3v-8zm10 3h8v5h-8v-5z',
  'book-open': 'M4 5a2 2 0 012-2h11v14H6a2 2 0 00-2 2V5zm2 0v12h9V5H6z',
  'file-text': 'M6 3h7l5 5v13H6V3zm7 1.5V9h4.5',
  'bar-chart-2': 'M5 19V9h3v10H5zm5 0V5h3v14h-3zm5 0v-7h3v7h-3z',
  calendar: 'M7 4V2h2v2h6V2h2v2h3v16H4V4h3zm-1 4v10h12V8H6z',
  'help-circle': 'M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2a3 3 0 115.9-.9c0 1.4-1.8 1.8-2.2 2.6V13z',
  settings:
    'M12 8a4 4 0 110 8 4 4 0 010-8zm8.5 4a7.5 7.5 0 01-.2 1.7l2 1.5-2 3.5-2.4-1a7.6 7.6 0 01-2.9 1.7L14 22h-4l-.9-2.6a7.6 7.6 0 01-2.9-1.7l-2.4 1-2-3.5 2-1.5A7.5 7.5 0 013.5 12c0-.6.1-1.2.2-1.7l-2-1.5 2-3.5 2.4 1a7.6 7.6 0 012.9-1.7L10 2h4l.9 2.6a7.6 7.6 0 012.9 1.7l2.4-1 2 3.5-2 1.5c.1.5.2 1.1.2 1.7z',
  'log-out': 'M10 4H6v16h4M14 12H4m0 0l3-3m-3 3l3 3',
  'check-circle': 'M12 2a10 10 0 100 20 10 10 0 000-20zm-1 14l-5-5 1.4-1.4L11 13.2l6.6-6.6L19 8l-8 8z',
  'trending-up': 'M3 17l6-6 4 4 7-9 2 2-9 11-4-4-6 6H3v-2z',
  plus: 'M12 5v14M5 12h14',
  search: 'M11 4a7 7 0 015.3 11.7l3 3-1.4 1.4-3-3A7 7 0 1111 4zm0 2a5 5 0 100 10 5 5 0 000-10z',
  bell: 'M12 22a2.5 2.5 0 002.4-2H9.6A2.5 2.5 0 0012 22zm7-5V11a7 7 0 10-14 0v6l-2 2v1h18v-1l-2-2z',
  clock: 'M12 2a10 10 0 100 20 10 10 0 000-20zm1 5h-2v6l5 3 .9-1.5-3.9-2.3V7z',
  book: 'M4 5a2 2 0 012-2h12v14H6a2 2 0 00-2 2V5zm2 0v12h10V5H6z',
  'arrow-right': 'M5 12h14M13 5l7 7-7 7',
  'message-square': 'M4 5h16v11H8l-4 4V5z',
  sun: 'M12 4V2m0 20v-2M4 12H2m20 0h-2M5 5l1.5 1.5M18.5 5L17 6.5M5 19l1.5-1.5M18.5 19 17 17.5M12 8a4 4 0 100 8 4 4 0 000-8z',
  moon: 'M21 14.5A8.5 8.5 0 1112.5 6a6.5 6.5 0 009 8.5z',
  'graduation-cap': 'M12 3 2 8l10 5 10-5-10-5zm0 8.5L6 8v6.5l6 3 6-3V8l-6 3.5zM4 19v-2l8 4 8-4v2L12 23 4 19z',
  menu: 'M4 7h16M4 12h16M4 17h16',
  x: 'M6 6l12 12M18 6L6 18',
};

function LucideIcon({ name, size = 20, className = '' }) {
  const path = ICONS[name];
  if (!path) return null;

  return (
    <svg
      className={`eduhive-icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

export default LucideIcon;
