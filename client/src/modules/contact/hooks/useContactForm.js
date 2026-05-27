import { useState } from 'react';
import { submitContactMessage } from '../../../shared/api/contactApi';
import { validateContactForm } from '../utils/validateContactForm';

const INITIAL_FORM = {
  fullName: '',
  email: '',
  designation: '',
  location: '',
  phone: '',
  subject: '',
  message: '',
};

export function useContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) {
        return current;
      }
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');
    setSuccessMessage('');

    const nextErrors = validateContactForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitContactMessage(form);
      setSuccessMessage(response.message || 'Thank you — we received your inquiry.');
      setForm(INITIAL_FORM);
    } catch (error) {
      setSubmitError(error.message || 'Unable to send your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    errors,
    submitError,
    successMessage,
    isSubmitting,
    updateField,
    handleSubmit,
  };
}
