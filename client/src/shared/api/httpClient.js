const API_BASE = process.env.REACT_APP_API_URL || '/api';

function getHttpErrorMessage(status, data) {
  if (data?.message) {
    return data.message;
  }

  if (status === 404) {
    return 'Contact service is unavailable. Restart the LMS server and try again.';
  }

  if (status === 503) {
    return 'Contact service is temporarily unavailable. Check MySQL and try again.';
  }

  if (status >= 500) {
    return 'Server error while saving your message. Please try again.';
  }

  return 'Request failed.';
}

async function readResponseBody(response) {
  if (typeof response.text === 'function') {
    const raw = await response.text();
    if (!raw) {
      return {};
    }

    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }

  if (typeof response.json === 'function') {
    return response.json().catch(() => ({}));
  }

  return {};
}

async function parseResponse(response) {
  const data = await readResponseBody(response);

  if (!response.ok) {
    const error = new Error(getHttpErrorMessage(response.status, data));
    error.status = response.status;
    error.errors = data.errors;
    throw error;
  }

  return data;
}

export async function apiRequest(path, options = {}) {
  let response;

  try {
    response = await fetch(`${API_BASE}${path}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });
  } catch {
    throw new Error('Unable to reach the LMS server. Start the API on port 5000 and try again.');
  }

  return parseResponse(response);
}
