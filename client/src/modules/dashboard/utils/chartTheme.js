export const STATUS_COLORS = {
  enrolled: { light: '#2563eb', dark: '#60a5fa' },
  inProgress: { light: '#0d9488', dark: '#2dd4bf' },
  completed: { light: '#475569', dark: '#94a3b8' },
};

export const TRACK_COLOR = { light: '#4f46e5', dark: '#818cf8' };

export function getChartTheme(isDark) {
  return {
    textColor: isDark ? 'rgba(241, 245, 249, 0.72)' : 'rgba(71, 85, 105, 0.9)',
    headingColor: isDark ? '#f1f5f9' : '#0f172a',
    axisLineColor: isDark ? 'rgba(148, 163, 184, 0.2)' : 'rgba(148, 163, 184, 0.35)',
    tooltipBg: isDark ? '#1e293b' : '#ffffff',
    tooltipBorder: isDark ? 'rgba(148, 163, 184, 0.2)' : '#e2e8f0',
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
  };
}

export function baseChartOptions(isDark, height = 320) {
  const theme = getChartTheme(isDark);

  return {
    chart: {
      backgroundColor: 'transparent',
      height,
      style: { fontFamily: theme.fontFamily },
    },
    title: { text: undefined },
    credits: { enabled: false },
    legend: {
      itemStyle: { color: theme.textColor, fontWeight: '700' },
      itemHoverStyle: { color: theme.headingColor },
    },
    tooltip: {
      backgroundColor: theme.tooltipBg,
      borderColor: theme.tooltipBorder,
      borderRadius: 8,
      style: { color: theme.headingColor },
    },
  };
}
