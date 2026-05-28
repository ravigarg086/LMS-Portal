import { CHART_COLORS, PORTAL_FONT_FAMILY } from '../../../shared/theme/themeConstants';

export const STATUS_COLORS = {
  enrolled: { light: CHART_COLORS.light.enrolled, dark: CHART_COLORS.dark.enrolled },
  inProgress: { light: CHART_COLORS.light.inProgress, dark: CHART_COLORS.dark.inProgress },
  completed: { light: CHART_COLORS.light.completed, dark: CHART_COLORS.dark.completed },
};

export const TRACK_COLOR = {
  light: CHART_COLORS.light.track,
  dark: CHART_COLORS.dark.track,
};

export function getChartTheme(isDark) {
  const palette = isDark ? CHART_COLORS.dark : CHART_COLORS.light;

  return {
    textColor: palette.text,
    headingColor: palette.heading,
    axisLineColor: palette.axisLine,
    tooltipBg: palette.tooltipBg,
    tooltipBorder: palette.tooltipBorder,
    fontFamily: PORTAL_FONT_FAMILY,
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
