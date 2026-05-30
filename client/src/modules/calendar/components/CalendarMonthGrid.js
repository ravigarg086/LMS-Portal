import {
  buildCalendarGrid,
  getEventsForDay,
  isSameDay,
} from '../utils/calendarFormatters';

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function CalendarMonthGrid({
  monthDate,
  events,
  selectedDate,
  onSelectDate,
  onSelectEvent,
}) {
  const days = buildCalendarGrid(monthDate);
  const today = new Date();

  return (
    <div className="calendar-month" aria-label="Month view">
      <div className="calendar-month__weekdays" aria-hidden="true">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label} className="calendar-month__weekday">
            {label}
          </div>
        ))}
      </div>

      <div className="calendar-month__grid">
        {days.map((day) => {
          const dayEvents = getEventsForDay(events, day);
          const isCurrentMonth = day.getMonth() === monthDate.getMonth();
          const isToday = isSameDay(day, today);
          const isSelected = selectedDate && isSameDay(day, selectedDate);

          return (
            <button
              key={day.toISOString()}
              type="button"
              className={[
                'calendar-month__day',
                !isCurrentMonth ? 'calendar-month__day--muted' : '',
                isToday ? 'calendar-month__day--today' : '',
                isSelected ? 'calendar-month__day--selected' : '',
              ].filter(Boolean).join(' ')}
              onClick={() => onSelectDate(day)}
              aria-label={day.toLocaleDateString(undefined, {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
              aria-pressed={Boolean(isSelected)}
            >
              <span className="calendar-month__date">{day.getDate()}</span>
              <span className="calendar-month__events">
                {dayEvents.slice(0, 3).map((event) => (
                  <span
                    key={event.id}
                    className={`calendar-month__event calendar-month__event--${event.eventType}`}
                    onClick={(clickEvent) => {
                      clickEvent.stopPropagation();
                      onSelectEvent(event);
                    }}
                  >
                    {event.title}
                  </span>
                ))}
                {dayEvents.length > 3 && (
                  <span className="calendar-month__more">+{dayEvents.length - 3} more</span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarMonthGrid;
