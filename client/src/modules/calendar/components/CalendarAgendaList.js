import {
  EVENT_TYPE_LABELS,
  formatEventDate,
  formatEventTimeRange,
  formatMonthYear,
  isSameDay,
} from '../utils/calendarFormatters';

function CalendarAgendaList({ events, monthDate, selectedDate, onSelectEvent }) {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
  );

  if (sortedEvents.length === 0) {
    return (
      <section className="calendar-agenda eduhive-card" aria-labelledby="calendar-agenda-heading">
        <h3 id="calendar-agenda-heading" className="calendar-agenda__title">
          {formatMonthYear(monthDate)}
        </h3>
        <p className="calendar-agenda__empty mb-0">No events scheduled this month. Add one to get started.</p>
      </section>
    );
  }

  return (
    <section className="calendar-agenda eduhive-card" aria-labelledby="calendar-agenda-heading">
      <h3 id="calendar-agenda-heading" className="calendar-agenda__title">
        {formatMonthYear(monthDate)}
      </h3>
      {selectedDate && (
        <p className="calendar-agenda__subtitle mb-2">
          Selected:{' '}
          {selectedDate.toLocaleDateString(undefined, {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      )}

      <ul className="calendar-agenda__list list-unstyled mb-0">
        {sortedEvents.map((event) => {
          const isSelectedDay = selectedDate && isSameDay(new Date(event.startAt), selectedDate);

          return (
            <li key={event.id} className="calendar-agenda__item">
              <button
                type="button"
                className={[
                  'calendar-agenda__event',
                  `calendar-agenda__event--${event.eventType}`,
                  isSelectedDay ? 'calendar-agenda__event--selected-day' : '',
                ].filter(Boolean).join(' ')}
                onClick={() => onSelectEvent(event)}
              >
                <span className="calendar-agenda__event-title">{event.title}</span>
                <span className="calendar-agenda__event-meta">
                  {formatEventDate(event.startAt, event.allDay)}
                  {!event.allDay && ` · ${formatEventTimeRange(event)}`}
                </span>
                <span className="calendar-agenda__event-type">{EVENT_TYPE_LABELS[event.eventType]}</span>
                {event.location && (
                  <span className="calendar-agenda__event-location">{event.location}</span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default CalendarAgendaList;
