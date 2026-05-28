import { useMemo, useState } from 'react';
import LucideIcon from '../../home/components/LucideIcon';
import { useContactMessages } from '../hooks/useContactMessages';
import {
  CONTACT_MESSAGE_COLUMNS,
  CONTACT_MESSAGE_SEARCH_FIELDS,
} from '../data/tableColumns';
import { useTableFilters } from '../../../shared/hooks/useTableFilters';
import { useTablePagination } from '../../../shared/hooks/useTablePagination';
import ColumnFilterControl from '../../../shared/components/ColumnFilterControl';
import TableToolbar from '../../../shared/components/TableToolbar';
import TablePagination from '../../../shared/components/TablePagination';
import ContactMessageEditForm from './ContactMessageEditForm';
import '../admin-contact-messages.css';

const DESIGNATION_LABELS = {
  student: 'Student',
  faculty: 'Faculty',
  admin: 'Admin',
};

function formatSubmittedAt(value) {
  if (!value) {
    return '—';
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function DesignationBadge({ designation }) {
  const label = DESIGNATION_LABELS[designation] || designation;

  return (
    <span className={`admin-contact-badge admin-contact-badge--${designation}`}>
      {label}
    </span>
  );
}

function ContactMessageActions({ message, onEdit, onDelete, submitting, editingId }) {
  const isEditing = editingId === message.id;

  return (
    <div className="admin-contact-actions">
      <button
        type="button"
        className="btn btn-link btn-sm p-0 admin-contact-actions__btn"
        onClick={() => onEdit(message)}
        disabled={submitting}
        aria-pressed={isEditing}
      >
        Edit
      </button>
      <button
        type="button"
        className="btn btn-link btn-sm p-0 text-danger admin-contact-actions__btn"
        onClick={() => onDelete(message)}
        disabled={submitting}
      >
        Delete
      </button>
    </div>
  );
}

function ContactMessageCard({ message, onEdit, onDelete, submitting, editingId }) {
  return (
    <article className="admin-contact-card">
      <div className="admin-contact-card__top">
        <div>
          <h4 className="admin-contact-card__name">{message.fullName}</h4>
          <p className="admin-contact-card__date mb-0">{formatSubmittedAt(message.createdAt)}</p>
        </div>
        <DesignationBadge designation={message.designation} />
      </div>

      <p className="admin-contact-card__subject">{message.subject}</p>

      <dl className="admin-contact-card__details">
        <div>
          <dt>Email</dt>
          <dd>{message.email}</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>{message.location}</dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd>{message.phone}</dd>
        </div>
      </dl>

      <p className="admin-contact-card__message">{message.message}</p>

      <ContactMessageActions
        message={message}
        onEdit={onEdit}
        onDelete={onDelete}
        submitting={submitting}
        editingId={editingId}
      />
    </article>
  );
}

function AdminContactMessagesPanel() {
  const {
    messages,
    loading,
    error,
    actionError,
    submitting,
    reload,
    updateMessage,
    deleteMessage,
    setActionError,
  } = useContactMessages(true);
  const [editingMessage, setEditingMessage] = useState(null);
  const columns = useMemo(() => CONTACT_MESSAGE_COLUMNS, []);
  const {
    globalSearch,
    setGlobalSearch,
    columnFilters,
    setColumnFilter,
    filteredItems,
    uniqueColumnValues,
    clearFilters,
    hasActiveFilters,
  } = useTableFilters(messages, {
    columns,
    searchableFields: CONTACT_MESSAGE_SEARCH_FIELDS,
  });

  const {
    paginatedItems,
    page,
    setPage,
    pageSize,
    setPageSize,
    pageSizes,
    totalPages,
    startIndex,
    endIndex,
  } = useTablePagination(filteredItems);

  const handleEdit = (message) => {
    setActionError('');
    setEditingMessage(message);
  };

  const handleCancelEdit = () => {
    setActionError('');
    setEditingMessage(null);
  };

  const handleSave = async (payload) => {
    if (!editingMessage) {
      return;
    }

    try {
      await updateMessage(editingMessage.id, payload);
      setEditingMessage(null);
    } catch {
      /* actionError set in hook */
    }
  };

  const handleDelete = async (message) => {
    const confirmed = window.confirm(
      `Delete the message from ${message.fullName}? This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    setActionError('');

    try {
      await deleteMessage(message.id);
      if (editingMessage?.id === message.id) {
        setEditingMessage(null);
      }
    } catch {
      /* actionError set in hook */
    }
  };

  return (
    <article
      className="eduhive-card role-panel role-panel--admin admin-contact-panel"
      aria-labelledby="admin-contact-messages-heading"
    >
      <div className="admin-contact-panel__header">
        <div>
          <span className="st-label">Inbox</span>
          <h3 id="admin-contact-messages-heading" className="admin-contact-panel__title">
            Contact Messages
          </h3>
          <p className="admin-contact-panel__meta">
            Review, edit, and delete Contact Us submissions stored in MySQL.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={reload}
          disabled={loading || submitting}
          aria-label="Refresh contact messages"
        >
          <LucideIcon name="trending-up" size={16} />
        </button>
      </div>

      {loading && (
        <div className="admin-contact-panel__loading" aria-live="polite">
          Loading contact messages...
        </div>
      )}

      {!loading && error && (
        <p className="text-danger small mb-0" role="alert">
          {error}
        </p>
      )}

      {!loading && actionError && (
        <p className="text-danger small mb-3" role="alert">
          {actionError}
        </p>
      )}

      {!loading && !error && messages.length === 0 && (
        <div className="admin-contact-panel__empty">
          <p className="mb-0">No contact messages yet.</p>
        </div>
      )}

      {!loading && !error && messages.length > 0 && (
        <>
          <TableToolbar
            searchId="admin-contact-search"
            searchLabel="Search messages"
            searchValue={globalSearch}
            onSearchChange={setGlobalSearch}
            searchPlaceholder="Search name, email, subject, location..."
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearFilters}
          />

          <div className="portal-table-column-filters portal-table-column-filters--mobile">
            {columns.map((column) => (
              <div key={column.key} className="portal-table-column-filters__item">
                <label htmlFor={`contact-filter-mobile-${column.key}`} className="form-label">
                  {column.label}
                </label>
                <ColumnFilterControl
                  column={column}
                  value={columnFilters[column.key]}
                  onChange={setColumnFilter}
                  options={uniqueColumnValues[column.key] || []}
                  idPrefix="contact-filter-mobile"
                />
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="alert alert-light portal-table-empty" role="status">
              No contact messages match your filters.
            </div>
          )}

          {filteredItems.length > 0 && (
            <>
              <div className="table-responsive d-none d-md-block portal-table-wrap">
                <table className="table table-sm align-middle mb-0 admin-contact-panel__table portal-table">
                  <thead>
                    <tr>
                      <th scope="col">Submitted</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Role</th>
                      <th scope="col">Location</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Subject</th>
                      <th scope="col">Message</th>
                      <th scope="col">Actions</th>
                    </tr>
                    <tr className="portal-table__filter-row">
                      {columns.map((column) => (
                        <th key={`${column.key}-filter`} scope="col" className="portal-table__filter-cell">
                          <ColumnFilterControl
                            column={column}
                            value={columnFilters[column.key]}
                            onChange={setColumnFilter}
                            options={uniqueColumnValues[column.key] || []}
                            idPrefix="contact-filter"
                          />
                        </th>
                      ))}
                      <th scope="col" aria-hidden="true" />
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedItems.map((message) => (
                      <tr key={message.id}>
                        <td>{formatSubmittedAt(message.createdAt)}</td>
                        <td>{message.fullName}</td>
                        <td>{message.email}</td>
                        <td>
                          <DesignationBadge designation={message.designation} />
                        </td>
                        <td>{message.location}</td>
                        <td>{message.phone}</td>
                        <td>{message.subject}</td>
                        <td>
                          <p className="admin-contact-panel__message">{message.message}</p>
                        </td>
                        <td>
                          <ContactMessageActions
                            message={message}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            submitting={submitting}
                            editingId={editingMessage?.id}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="d-md-none">
                {paginatedItems.map((message) => (
                  <ContactMessageCard
                    key={message.id}
                    message={message}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    submitting={submitting}
                    editingId={editingMessage?.id}
                  />
                ))}
              </div>

              <TablePagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
                pageSize={pageSize}
                pageSizes={pageSizes}
                onPageSizeChange={setPageSize}
                pageSizeId="admin-contact-page-size"
                filteredCount={filteredItems.length}
                totalCount={messages.length}
                startIndex={startIndex}
                endIndex={endIndex}
                entityLabel="messages"
                ariaLabel="Contact messages pagination"
              />
            </>
          )}
        </>
      )}

      {editingMessage && (
        <div className="role-panel__editor mt-4">
          <h4 className="h6 mb-3">Edit message from {editingMessage.fullName}</h4>
          <ContactMessageEditForm
            key={editingMessage.id}
            message={editingMessage}
            formId={`admin-contact-edit-${editingMessage.id}`}
            onSubmit={handleSave}
            onCancel={handleCancelEdit}
            submitting={submitting}
            error={actionError}
          />
        </div>
      )}
    </article>
  );
}

export default AdminContactMessagesPanel;
