import { useMemo } from 'react';
import Highcharts from 'highcharts';
import { useTheme } from '../../home/context/ThemeProvider';
import ChartPanel from './ChartPanel';
import { STATUS_COLORS, baseChartOptions, getChartTheme } from '../utils/chartTheme';

const STATUS_LABELS = {
  enrolled: 'Enrolled',
  inProgress: 'In Progress',
  completed: 'Completed',
};

function StudentProgressDistributionChart({ analytics }) {
  const { isDark } = useTheme();
  const breakdown = useMemo(
    () => analytics?.statusBreakdown ?? { enrolled: 0, inProgress: 0, completed: 0 },
    [analytics?.statusBreakdown],
  );

  const chartOptions = useMemo(() => {
    const theme = getChartTheme(isDark);
    const base = baseChartOptions(isDark, 340);

    const seriesData = Object.entries(breakdown).map(([key, value]) => ({
      name: STATUS_LABELS[key],
      y: value,
      color: isDark ? STATUS_COLORS[key].dark : STATUS_COLORS[key].light,
    }));

    return {
      ...base,
      chart: { ...base.chart, type: 'pie' },
      plotOptions: {
        pie: {
          innerSize: '55%',
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.y}',
            style: { color: theme.textColor, fontSize: '11px', fontWeight: '500', textOutline: 'none' },
          },
        },
      },
      tooltip: {
        ...base.tooltip,
        pointFormat: '<span style="color:{point.color}">\u25CF</span> {point.name}: <b>{point.y}</b> ({point.percentage:.1f}%)',
      },
      series: [{ name: 'Students', data: seriesData }],
    };
  }, [breakdown, isDark]);

  return (
    <article className="eduhive-card role-panel h-100">
      <div className="stat-card__header mb-2">
        <div>
          <h3 className="stat-card__title mb-1">Progress Distribution</h3>
          <p className="role-panel__desc mb-0">Students by completion stage platform-wide</p>
        </div>
      </div>
      <ChartPanel
        highcharts={Highcharts}
        options={chartOptions}
        ariaLabel="Donut chart showing student progress distribution"
      />
    </article>
  );
}

export default StudentProgressDistributionChart;
