(function initTheme() {
  try {
    var theme = localStorage.getItem('lms-portal-theme');
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', '#0F1218');
    }
  } catch (e) {
    /* ignore */
  }
})();
