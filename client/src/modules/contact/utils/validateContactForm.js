import { validateEmail, validateRequired } from '../../../shared/utils/validation';
import { CONTACT_DESIGNATIONS } from '../data/contactInfo';

const PHONE_REGEX = /^[+]?[\d\s().-]{10,}$/;

function validatePhone(phone) {
  const trimmed = String(phone || '').trim();
  if (!trimmed) {
    return 'Phone number is required.';
  }
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length < 10) {
    return 'Enter a valid phone number (at least 10 digits).';
  }
  if (!PHONE_REGEX.test(trimmed)) {
    return 'Enter a valid phone number.';
  }
  return '';
}

function validateDesignation(designation) {
  const value = String(designation || '').trim();
  if (!value) {
    return 'Designation is required.';
  }
  const allowed = CONTACT_DESIGNATIONS.map((option) => option.value);
  if (!allowed.includes(value)) {
    return 'Select a valid designation.';
  }
  return '';
}

export function validateContactForm({ fullName, email, designation, location, phone, subject, message }) {
  const errors = {};

  const fullNameError = validateRequired(fullName, 'Full name');
  const emailError = validateEmail(email);
  const designationError = validateDesignation(designation);
  const locationError = validateRequired(location, 'Location');
  const phoneError = validatePhone(phone);
  const subjectError = validateRequired(subject, 'Subject');

  if (fullNameError) errors.fullName = fullNameError;
  if (emailError) errors.email = emailError;
  if (designationError) errors.designation = designationError;
  if (locationError) errors.location = locationError;
  if (phoneError) errors.phone = phoneError;
  if (subjectError) errors.subject = subjectError;

  const trimmedMessage = String(message || '').trim();
  if (!trimmedMessage) {
    errors.message = 'Message is required.';
  } else if (trimmedMessage.length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }

  return errors;
}
