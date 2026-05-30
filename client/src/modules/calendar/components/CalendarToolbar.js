import LucideIcon from '../../home/components/LucideIcon';
import { formatMonthYear } from '../utils/calendarFormatters';

function CalendarToolbar({
  monthDate,
  view,
  onViewChange,
  onPreviousMonth,
  onNextMonth,
  onToday,
  onAddEvent,
}) {
  return (
    <div className="calendar-toolbar">
      <div className="calendar-toolbar__nav">
        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onPreviousMonth} aria-label="Previous month">
          <LucideIcon name="arrow-right" size={16} className="calendar-toolbar__icon--prev" />
        </button>
        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onToday}>
          Today
        </button>
        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onNextMonth} aria-label="Next month">
          <LucideIcon name="arrow-right" size={16} />
        </button>
        <h2 className="calendar-toolbar__month mb-0">{formatMonthYear(monthDate)}</h2>
      </div>

      <div className="calendar-toolbar__actions">
        <div className="btn-group calendar-toolbar__view-toggle" role="group" aria-label="Calendar view">
          <button
            type="button"
            className={`btn btn-sm ${view === 'month' ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => onViewChange('month')}
          >
            Month
          </button>
          <button
            type="button"
            className={`btn btn-sm ${view === 'list' ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => onViewChange('list')}
          >
            List
          </button>
        </div>
        <button type="button" className="btn btn-primary btn-sm" onClick={onAddEvent}>
          <LucideIcon name="plus" size={16} />
          Add event
        </button>
      </div>
    </div>
  );
}

export default CalendarToolbar;
