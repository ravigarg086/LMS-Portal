import {
  EVENT_TYPE_LABELS,
  formatEventDate,
  formatEventTimeRange,
  getEventsForDay,
} from '../utils/calendarFormatters';

function CalendarAgendaList({ events, selectedDate, onSelectEvent }) {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
  );

  const selectedDayEvents = selectedDate ? getEventsForDay(sortedEvents, selectedDate) : [];

  if (sortedEvents.length === 0) {
    return (
      <section className="calendar-agenda eduhive-card" aria-labelledby="calendar-agenda-heading">
        <h3 id="calendar-agenda-heading" className="calendar-agenda__title">
          Upcoming events
        </h3>
        <p className="calendar-agenda__empty mb-0">No events scheduled this month. Add one to get started.</p>
      </section>
    );
  }

  return (
    <section className="calendar-agenda eduhive-card" aria-labelledby="calendar-agenda-heading">
      <h3 id="calendar-agenda-heading" className="calendar-agenda__title">
        {selectedDate
          ? selectedDate.toLocaleDateString(undefined, {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })
          : 'Upcoming events'}
      </h3>

      <ul className="calendar-agenda__list list-unstyled mb-0">
        {(selectedDate ? selectedDayEvents : sortedEvents).map((event) => (
          <li key={event.id} className="calendar-agenda__item">
            <button
              type="button"
              className={`calendar-agenda__event calendar-agenda__event--${event.eventType}`}
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
        ))}
      </ul>

      {selectedDate && selectedDayEvents.length === 0 && (
        <p className="calendar-agenda__empty mb-0">No events on this day.</p>
      )}
    </section>
  );
}

export default CalendarAgendaList;
