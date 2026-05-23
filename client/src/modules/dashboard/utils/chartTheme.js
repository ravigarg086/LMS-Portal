export const STATUS_COLORS = {
  enrolled: { light: '#e4a4bd', dark: '#e4a4bd' },
  inProgress: { light: '#c98aa6', dark: '#e4a4bd' },
  completed: { light: '#262626', dark: '#fdf8f3' },
};

export const TRACK_COLOR = { light: '#e4a4bd', dark: '#e4a4bd' };

export function getChartTheme(isDark) {
  return {
    textColor: isDark ? 'rgba(253, 248, 243, 0.72)' : 'rgba(38, 38, 38, 0.7)',
    headingColor: isDark ? '#fdf8f3' : '#262626',
    axisLineColor: isDark ? 'rgba(253, 248, 243, 0.12)' : 'rgba(38, 38, 38, 0.12)',
    tooltipBg: isDark ? '#222222' : '#fdf8f3',
    tooltipBorder: isDark ? 'rgba(253, 248, 243, 0.12)' : 'rgba(38, 38, 38, 0.08)',
    fontFamily: "'League Spartan', system-ui, sans-serif",
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
