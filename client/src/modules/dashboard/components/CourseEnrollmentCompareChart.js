import { useMemo, useState } from 'react';
import Highcharts from 'highcharts';
import { useTheme } from '../../home/context/ThemeProvider';
import ChartPanel from './ChartPanel';
import { STATUS_COLORS, baseChartOptions, getChartTheme } from '../utils/chartTheme';

const STATUS_SERIES = [
  { key: 'enrolled', label: 'Enrolled' },
  { key: 'inProgress', label: 'In Progress' },
  { key: 'completed', label: 'Completed' },
];

function CourseEnrollmentCompareChart({ analytics, usingDemo = false }) {
  const { isDark } = useTheme();
  const [selectedCourseIds, setSelectedCourseIds] = useState([]);

  const courses = useMemo(() => analytics?.courses ?? [], [analytics?.courses]);

  const visibleCourses = useMemo(() => {
    if (selectedCourseIds.length === 0) {
      return courses;
    }
    return courses.filter((course) => selectedCourseIds.includes(course.id));
  }, [courses, selectedCourseIds]);

  const chartOptions = useMemo(() => {
    const theme = getChartTheme(isDark);
    const base = baseChartOptions(isDark, 340);

    return {
      ...base,
      chart: { ...base.chart, type: 'column' },
      xAxis: {
        categories: visibleCourses.map((course) => course.name),
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
      tooltip: {
        ...base.tooltip,
        shared: true,
        headerFormat: '<span style="font-size: 12px; font-weight: 600">{point.key}</span><br/>',
        pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>',
      },
      plotOptions: {
        column: {
          borderRadius: 4,
          borderWidth: 0,
          groupPadding: 0.12,
          pointPadding: 0.04,
        },
      },
      series: STATUS_SERIES.map((status) => ({
        name: status.label,
        color: isDark ? STATUS_COLORS[status.key].dark : STATUS_COLORS[status.key].light,
        data: visibleCourses.map((course) => course[status.key] ?? 0),
      })),
    };
  }, [isDark, visibleCourses]);

  const toggleCourse = (courseId) => {
    setSelectedCourseIds((current) => {
      if (current.includes(courseId)) {
        return current.filter((id) => id !== courseId);
      }
      if (current.length >= 2) {
        return [current[1], courseId];
      }
      return [...current, courseId];
    });
  };

  const chartLabel = selectedCourseIds.length === 2
    ? `Comparing ${visibleCourses.map((course) => course.name).join(' vs ')}`
    : 'Enrollment status by course program';

  return (
    <article className="eduhive-card role-panel h-100">
      <div className="stat-card__header">
        <div>
          <h3 className="stat-card__title mb-1">Course Enrollment Comparison</h3>
          <p className="role-panel__desc mb-0">{chartLabel}</p>
        </div>
        <span className="ui-label">{analytics?.summary?.totalStudents ?? 0} students</span>
      </div>

      {usingDemo && (
        <p className="admin-dashboard__notice mb-3">Showing demo enrollment data for chart preview.</p>
      )}

      <div className="compare-chart__filters" role="group" aria-label="Select courses to compare">
        {courses.map((course) => {
          const isActive = selectedCourseIds.includes(course.id);
          return (
            <button
              key={course.id}
              type="button"
              className={`compare-chart__filter${isActive ? ' compare-chart__filter--active' : ''}`}
              aria-pressed={isActive}
              onClick={() => toggleCourse(course.id)}
            >
              {course.name}
            </button>
          );
        })}
        {selectedCourseIds.length > 0 && (
          <button
            type="button"
            className="compare-chart__filter compare-chart__filter--clear"
            onClick={() => setSelectedCourseIds([])}
          >
            Show all
          </button>
        )}
      </div>

      {visibleCourses.length > 0 ? (
        <ChartPanel
          highcharts={Highcharts}
          options={chartOptions}
          ariaLabel="Grouped bar chart comparing course enrollment by status"
        />
      ) : (
        <p className="role-panel__desc mb-0">No enrollment data available for the selected courses.</p>
      )}
    </article>
  );
}

export default CourseEnrollmentCompareChart;
