(function initTheme() {
  try {
    var theme = localStorage.getItem('lms-portal-theme');
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', '#1A1A1A');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
    }
  } catch (e) {
    /* ignore */
  }
})();
