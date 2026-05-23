import { useMemo } from 'react';
import Highcharts from 'highcharts';
import { useTheme } from '../../home/context/ThemeProvider';
import ChartPanel from './ChartPanel';
import { TRACK_COLOR, baseChartOptions, getChartTheme } from '../utils/chartTheme';

function TrackEnrollmentChart({ analytics }) {
  const { isDark } = useTheme();
  const tracks = useMemo(() => analytics?.tracks ?? [], [analytics?.tracks]);

  const chartOptions = useMemo(() => {
    const theme = getChartTheme(isDark);
    const base = baseChartOptions(isDark, 300);
    const color = isDark ? TRACK_COLOR.dark : TRACK_COLOR.light;

    return {
      ...base,
      chart: { ...base.chart, type: 'bar' },
      xAxis: {
        categories: tracks.map((track) => track.name),
        lineColor: theme.axisLineColor,
        tickColor: theme.axisLineColor,
        labels: { style: { color: theme.textColor, fontSize: '12px' } },
      },
      yAxis: {
        min: 0,
        allowDecimals: false,
        title: { text: 'Students', style: { color: theme.textColor, fontSize: '12px' } },
        gridLineColor: theme.axisLineColor,
        labels: { style: { color: theme.textColor, fontSize: '12px' } },
      },
      legend: { enabled: false },
      tooltip: {
        ...base.tooltip,
        pointFormat: '<span style="color:{point.color}">\u25CF</span> {point.category}: <b>{point.y}</b> students',
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderWidth: 0,
          color,
        },
      },
      series: [{ name: 'Students', data: tracks.map((track) => track.count) }],
    };
  }, [isDark, tracks]);

  return (
    <article className="eduhive-card role-panel">
      <div className="stat-card__header mb-2">
        <div>
          <h3 className="stat-card__title mb-1">Students by Academic Track</h3>
          <p className="role-panel__desc mb-0">Enrollment spread across degree tracks</p>
        </div>
      </div>
      <ChartPanel
        highcharts={Highcharts}
        options={chartOptions}
        ariaLabel="Horizontal bar chart of students per academic track"
      />
    </article>
  );
}

export default TrackEnrollmentChart;
