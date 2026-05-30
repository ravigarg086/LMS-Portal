import { useEffect, useMemo, useState } from 'react';
import RevealUp from '../home/components/RevealUp';
import DashboardShell from '../../shared/layout/DashboardShell';
import { useCalendar } from './hooks/useCalendar';
import CalendarToolbar from './components/CalendarToolbar';
import CalendarMonthGrid from './components/CalendarMonthGrid';
import CalendarAgendaList from './components/CalendarAgendaList';
import CalendarEventModal from './components/CalendarEventModal';
import {
  addMonths,
  eventToFormValues,
  getDefaultFormValues,
} from './utils/calendarFormatters';
import './calendar.css';

function CalendarPage() {
  const [monthDate, setMonthDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [view, setView] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767.98px)').matches
      ? 'list'
      : 'month'
  ));
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [editingEvent, setEditingEvent] = useState(null);

  const {
    events,
    loading,
    submitting,
    error,
    success,
    createEvent,
    updateEvent,
    removeEvent,
    clearFeedback,
  } = useCalendar(monthDate);

  const modalInitialValues = useMemo(() => {
    if (modalMode === 'edit' && editingEvent) {
      return eventToFormValues(editingEvent);
    }

    return getDefaultFormValues(selectedDate || new Date());
  }, [modalMode, editingEvent, selectedDate]);

  useEffect(() => {
    if (!success) {
      return undefined;
    }

    const timer = window.setTimeout(() => clearFeedback(), 4000);
    return () => window.clearTimeout(timer);
  }, [success, clearFeedback]);

  const openCreateModal = (date = selectedDate || new Date()) => {
    setSelectedDate(date);
    setEditingEvent(null);
    setModalMode('create');
    setModalOpen(true);
    clearFeedback();
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setModalMode('edit');
    setModalOpen(true);
    clearFeedback();
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingEvent(null);
  };

  const handleSubmit = async (payload) => {
    try {
      if (modalMode === 'edit' && editingEvent) {
        await updateEvent(editingEvent.id, payload);
      } else {
        await createEvent(payload);
      }
      closeModal();
    } catch {
      // Error feedback is handled in useCalendar; keep the modal open for correction.
    }
  };

  const handleDelete = async () => {
    if (!editingEvent) {
      return;
    }

    try {
      await removeEvent(editingEvent.id);
      closeModal();
    } catch {
      // Error feedback is handled in useCalendar.
    }
  };

  return (
    <DashboardShell activeId="calendar" pageClassName="calendar-page" mainClassName="calendar-page__main">
      <RevealUp className="calendar-page__content">
        <header className="calendar-page__header">
          <span className="st-label">Portal</span>
          <h1 id="calendar-heading" className="calendar-page__title">
            Calendar
          </h1>
          <p className="calendar-page__lead mb-0">
            View classes, assignments, exams, and personal events. Add or edit items to stay on track.
          </p>
        </header>

        {error && (
          <div className="alert alert-danger calendar-page__alert" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success calendar-page__alert" role="status">
            {success}
          </div>
        )}

        <CalendarToolbar
          monthDate={monthDate}
          view={view}
          onViewChange={setView}
          onPreviousMonth={() => setMonthDate((prev) => addMonths(prev, -1))}
          onNextMonth={() => setMonthDate((prev) => addMonths(prev, 1))}
          onToday={() => {
            const today = new Date();
            setMonthDate(today);
            setSelectedDate(today);
          }}
          onAddEvent={() => openCreateModal()}
        />

        {loading ? (
          <p className="calendar-page__loading mb-0">Loading calendar events...</p>
        ) : (
          <div className={`calendar-page__layout calendar-page__layout--${view}`}>
            {view === 'month' && (
              <CalendarMonthGrid
                monthDate={monthDate}
                events={events}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                onSelectEvent={openEditModal}
              />
            )}

            <CalendarAgendaList
              events={events}
              selectedDate={view === 'month' ? selectedDate : null}
              onSelectEvent={openEditModal}
            />
          </div>
        )}

        <CalendarEventModal
          open={modalOpen}
          mode={modalMode}
          initialValues={modalInitialValues}
          submitting={submitting}
          onClose={closeModal}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
        />
      </RevealUp>
    </DashboardShell>
  );
}

export default CalendarPage;
