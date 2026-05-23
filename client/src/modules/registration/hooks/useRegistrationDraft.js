import { useEffect, useState } from 'react';
import { REGISTRATION_DRAFT_KEY, USER_ROLES } from '../../../shared/constants/roles';

const DEFAULT_FORM = {
  role: USER_ROLES.STUDENT,
  fullName: '',
  email: '',
  password: '',
  academicTrack: '',
  graduationYear: '',
  department: '',
  employeeId: '',
  accessLevel: '',
  inviteKey: '',
};

function readDraft() {
  try {
    const raw = sessionStorage.getItem(REGISTRATION_DRAFT_KEY);
    return raw ? { ...DEFAULT_FORM, ...JSON.parse(raw) } : DEFAULT_FORM;
  } catch {
    return DEFAULT_FORM;
  }
}

export function useRegistrationDraft() {
  const [form, setForm] = useState(readDraft);

  useEffect(() => {
    try {
      sessionStorage.setItem(REGISTRATION_DRAFT_KEY, JSON.stringify(form));
    } catch {
      /* ignore */
    }
  }, [form]);

  const updateField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const setRole = (role) => {
    setForm((prev) => ({ ...prev, role }));
  };

  const clearDraft = () => {
    try {
      sessionStorage.removeItem(REGISTRATION_DRAFT_KEY);
    } catch {
      /* ignore */
    }
    setForm(DEFAULT_FORM);
  };

  return { form, updateField, setRole, clearDraft };
}
