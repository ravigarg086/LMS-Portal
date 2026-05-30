export const EVENT_TYPE_OPTIONS = [
  { value: 'class', label: 'Class' },
  { value: 'assignment', label: 'Assignment' },
  { value: 'exam', label: 'Exam' },
  { value: 'personal', label: 'Personal' },
  { value: 'other', label: 'Other' },
];

export const EVENT_TYPE_LABELS = Object.fromEntries(
  EVENT_TYPE_OPTIONS.map((option) => [option.value, option.label]),
);

export function getMonthStart(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getMonthEnd(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

export function addMonths(date, count) {
  return new Date(date.getFullYear(), date.getMonth() + count, 1);
}

export function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate()
  );
}

export function formatMonthYear(date) {
  return date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
}

export function formatEventDate(isoString, allDay = false) {
  const date = new Date(isoString);
  if (allDay) {
    return date.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  }

  return date.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function formatEventTimeRange(event) {
  if (event.allDay) {
    return 'All day';
  }

  const start = new Date(event.startAt);
  const end = event.endAt ? new Date(event.endAt) : null;
  const startTime = start.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });

  if (!end) {
    return startTime;
  }

  const endTime = end.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  return `${startTime} – ${endTime}`;
}

export function toDateInputValue(isoString) {
  const date = new Date(isoString);
  return toDateInputValueFromDate(date);
}

export function toDateInputValueFromDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Default date when opening the create-event form for the current calendar view. */
export function getCreateDefaultDate(selectedDate, monthDate) {
  const today = new Date();

  if (
    today.getFullYear() === monthDate.getFullYear()
    && today.getMonth() === monthDate.getMonth()
  ) {
    return today;
  }

  if (
    selectedDate.getFullYear() === monthDate.getFullYear()
    && selectedDate.getMonth() === monthDate.getMonth()
  ) {
    return selectedDate;
  }

  return getMonthStart(monthDate);
}

export function getMonthDateFromIso(isoString) {
  const date = new Date(isoString);
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getDayFromIso(isoString) {
  const date = new Date(isoString);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function toTimeInputValue(isoString) {
  const date = new Date(isoString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function combineDateAndTime(dateValue, timeValue, allDay = false) {
  if (!dateValue) {
    return null;
  }

  if (allDay) {
    return new Date(`${dateValue}T00:00:00`).toISOString();
  }

  const time = timeValue || '09:00';
  return new Date(`${dateValue}T${time}:00`).toISOString();
}

export function buildCalendarGrid(monthDate) {
  const monthStart = getMonthStart(monthDate);
  const monthEnd = getMonthEnd(monthDate);
  const gridStart = new Date(monthStart);
  gridStart.setDate(gridStart.getDate() - gridStart.getDay());

  const days = [];
  const cursor = new Date(gridStart);

  while (cursor <= monthEnd || cursor.getDay() !== 0 || days.length < 42) {
    days.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);

    if (days.length >= 42 && cursor.getDay() === 0) {
      break;
    }
  }

  return days;
}

export function getEventsForDay(events, day) {
  return events.filter((event) => isSameDay(new Date(event.startAt), day));
}

export function getDefaultFormValues(selectedDate = new Date()) {
  const dateValue = toDateInputValueFromDate(selectedDate);
  return {
    title: '',
    description: '',
    eventType: 'class',
    startDate: dateValue,
    startTime: '09:00',
    endDate: dateValue,
    endTime: '10:00',
    allDay: false,
    location: '',
  };
}

export function eventToFormValues(event) {
  return {
    title: event.title,
    description: event.description || '',
    eventType: event.eventType,
    startDate: toDateInputValue(event.startAt),
    startTime: toTimeInputValue(event.startAt),
    endDate: event.endAt ? toDateInputValue(event.endAt) : toDateInputValue(event.startAt),
    endTime: event.endAt ? toTimeInputValue(event.endAt) : toTimeInputValue(event.startAt),
    allDay: Boolean(event.allDay),
    location: event.location || '',
  };
}

export function formValuesToPayload(values) {
  const startAt = combineDateAndTime(values.startDate, values.startTime, values.allDay);
  let endAt = combineDateAndTime(values.endDate, values.endTime, values.allDay);

  if (values.allDay && endAt) {
    const endDate = new Date(endAt);
    endDate.setHours(23, 59, 59, 999);
    endAt = endDate.toISOString();
  }

  return {
    title: values.title.trim(),
    description: values.description.trim(),
    eventType: values.eventType,
    startAt,
    endAt,
    allDay: values.allDay,
    location: values.location.trim(),
  };
}
