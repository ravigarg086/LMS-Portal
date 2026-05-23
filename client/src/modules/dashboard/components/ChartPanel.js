import { useEffect, useRef } from 'react';
import HighchartsReact from 'highcharts-react-official';

function ChartPanel({ options, highcharts, className = '', ariaLabel }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current?.chart;
    if (!chart) {
      return undefined;
    }

    const frame = window.requestAnimationFrame(() => {
      chart.reflow();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [options]);

  return (
    <div className={`compare-chart__container ${className}`.trim()} role="img" aria-label={ariaLabel}>
      <HighchartsReact
        ref={chartRef}
        highcharts={highcharts}
        options={options}
        immutable
      />
    </div>
  );
}

export default ChartPanel;
