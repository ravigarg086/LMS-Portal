import { useEffect, useState } from 'react';
import EditFormModal from '../../../shared/components/EditFormModal';
import { EVENT_TYPE_OPTIONS, formValuesToPayload } from '../utils/calendarFormatters';

const EMPTY_FORM = {
  title: '',
  description: '',
  eventType: 'class',
  startDate: '',
  startTime: '09:00',
  endDate: '',
  endTime: '10:00',
  allDay: false,
  location: '',
};

function CalendarEventModal({
  open,
  mode,
  initialValues,
  submitting,
  onClose,
  onSubmit,
  onDelete,
}) {
  const [values, setValues] = useState(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (open) {
      setValues(initialValues || EMPTY_FORM);
      setFieldErrors({});
    }
  }, [open, initialValues]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValues((prev) => {
      const next = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };

      if (name === 'startDate') {
        next.endDate = value;
      }

      return next;
    });
  };

  const validate = () => {
    const errors = {};
    if (!values.title.trim()) {
      errors.title = 'Title is required.';
    }
    if (!values.startDate) {
      errors.startDate = 'Start date is required.';
    }
    if (!values.allDay && !values.startTime) {
      errors.startTime = 'Start time is required.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    await onSubmit(formValuesToPayload(values));
  };

  const handleDelete = () => {
    if (window.confirm('Delete this event? This action cannot be undone.')) {
      onDelete?.();
    }
  };

  return (
    <EditFormModal
      open={open}
      onClose={onClose}
      title={mode === 'edit' ? 'Edit Event' : 'Add Event'}
      subtitle="Calendar"
      wide
    >
      <form className="calendar-event-form" onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="calendar-event-title" className="form-label">
            Title
          </label>
          <input
            id="calendar-event-title"
            name="title"
            type="text"
            className={`form-control${fieldErrors.title ? ' is-invalid' : ''}`}
            value={values.title}
            onChange={handleChange}
            maxLength={200}
            required
          />
          {fieldErrors.title && <div className="invalid-feedback">{fieldErrors.title}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="calendar-event-type" className="form-label">
            Event type
          </label>
          <select
            id="calendar-event-type"
            name="eventType"
            className="form-select"
            value={values.eventType}
            onChange={handleChange}
          >
            {EVENT_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="calendar-event-description" className="form-label">
            Description
          </label>
          <textarea
            id="calendar-event-description"
            name="description"
            className="form-control"
            rows={3}
            value={values.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-check mb-3">
          <input
            id="calendar-event-all-day"
            name="allDay"
            type="checkbox"
            className="form-check-input"
            checked={values.allDay}
            onChange={handleChange}
          />
          <label htmlFor="calendar-event-all-day" className="form-check-label">
            All-day event
          </label>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-12 col-md-6">
            <label htmlFor="calendar-event-start-date" className="form-label">
              Start date
            </label>
            <input
              id="calendar-event-start-date"
              name="startDate"
              type="date"
              className={`form-control${fieldErrors.startDate ? ' is-invalid' : ''}`}
              value={values.startDate}
              onChange={handleChange}
              required
            />
            {fieldErrors.startDate && <div className="invalid-feedback">{fieldErrors.startDate}</div>}
          </div>
          {!values.allDay && (
            <div className="col-12 col-md-6">
              <label htmlFor="calendar-event-start-time" className="form-label">
                Start time
              </label>
              <input
                id="calendar-event-start-time"
                name="startTime"
                type="time"
                className={`form-control${fieldErrors.startTime ? ' is-invalid' : ''}`}
                value={values.startTime}
                onChange={handleChange}
              />
              {fieldErrors.startTime && <div className="invalid-feedback">{fieldErrors.startTime}</div>}
            </div>
          )}
        </div>

        <div className="row g-3 mb-3">
          <div className="col-12 col-md-6">
            <label htmlFor="calendar-event-end-date" className="form-label">
              End date
            </label>
            <input
              id="calendar-event-end-date"
              name="endDate"
              type="date"
              className="form-control"
              value={values.endDate}
              onChange={handleChange}
            />
          </div>
          {!values.allDay && (
            <div className="col-12 col-md-6">
              <label htmlFor="calendar-event-end-time" className="form-label">
                End time
              </label>
              <input
                id="calendar-event-end-time"
                name="endTime"
                type="time"
                className="form-control"
                value={values.endTime}
                onChange={handleChange}
              />
            </div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="calendar-event-location" className="form-label">
            Location
          </label>
          <input
            id="calendar-event-location"
            name="location"
            type="text"
            className="form-control"
            value={values.location}
            onChange={handleChange}
            maxLength={255}
          />
        </div>

        <div className="d-flex flex-wrap gap-2 justify-content-between">
          <div className="d-flex flex-wrap gap-2">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Saving...' : mode === 'edit' ? 'Save changes' : 'Create event'}
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={onClose} disabled={submitting}>
              Cancel
            </button>
          </div>
          {mode === 'edit' && (
            <button type="button" className="btn btn-outline-danger" onClick={handleDelete} disabled={submitting}>
              Delete
            </button>
          )}
        </div>
      </form>
    </EditFormModal>
  );
}

export default CalendarEventModal;
