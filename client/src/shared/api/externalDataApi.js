import { apiRequest } from './httpClient';

const JSONPLACEHOLDER_URL = 'https://jsonplaceholder.typicode.com/users';

export function mapExternalUser(user) {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    city: user.address?.city || '—',
    phone: user.phone || '—',
    company: user.company?.name || '—',
  };
}

function mapUsers(records) {
  return Array.isArray(records) ? records.map(mapExternalUser) : [];
}

async function fetchDirectFromJsonPlaceholder() {
  const response = await fetch(JSONPLACEHOLDER_URL, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error('JSONPlaceholder request failed.');
  }

  const data = await response.json();
  const records = mapUsers(data);
  if (records.length === 0) {
    throw new Error('JSONPlaceholder returned no users.');
  }

  return { users: records, source: 'jsonplaceholder' };
}

async function fetchFromProxy() {
  const data = await apiRequest('/external/users');
  const records = Array.isArray(data?.users) ? data.users : mapUsers(data);
  if (records.length === 0) {
    throw new Error('No external users returned from LMS API.');
  }

  return {
    users: records.map((user) => (user.address || user.company ? mapExternalUser(user) : user)),
    source: data?.source || 'cached',
  };
}

export async function fetchExternalUsers() {
  try {
    return await fetchDirectFromJsonPlaceholder();
  } catch (directError) {
    return fetchFromProxy();
  }
}
