---
description: Implement External Data page with Axios, JSONPlaceholder user table, and search filters
globs: client/src/modules/external-data/**/*
alwaysApply: false
---

# Technical Skills: External Data (JSONPlaceholder)

## 1. Axios Service Layer
Fetch directly from JSONPlaceholder first; fall back to the LMS API proxy when needed.

```js
const jsonPlaceholderClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 15000,
  headers: { Accept: 'application/json' },
});

export async function fetchExternalUsers() {
  const { data } = await jsonPlaceholderClient.get('/users');
  return { users: data.map(mapExternalUser), source: 'jsonplaceholder' };
}
```

Map API records to table rows (city from `address.city`, company from `company.name`).

## 2. React Data Hook
Use a small hook for fetch lifecycle:

```js
export function useExternalUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    fetchExternalUsers()
      .then(({ users, source }) => { if (active) { setUsers(users); setSource(source); } })
      .catch((err) => { if (active) setError(err.message || 'Unable to load external users.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return { users, loading, error, source };
}
```

## 3. Global & Column Search
- Global omnibox above the table; fuzzy match across all text fields (tokenized `includes`).
- Per-column filters in a second header row (desktop) or mobile filter grid.
- Text columns: partial match inputs. Categorical columns (`city`, `company`): `<select>` with unique values.
- Combined logic: global match **AND** every active column filter.
- Zero results: show `No users found matching your criteria.` in a Bootstrap alert.

## 4. Responsive Table UI
- Wrap with `div.table-responsive` inside an `eduhive-card`.
- Bootstrap classes: `table table-sm table-striped align-middle`.
- Columns: ID, Name, Username, Email, City, Phone, Company.
- Use `text-overflow: ellipsis` on cells; reserve table min-height to avoid layout shift.

## 5. Routing & Navigation
- Route: `/external-data` → `ExternalDataPage`
- Sidebar item: `{ id: 'external-data', href: '/external-data', ... }`

## 6. Tests
Mock Axios — return an array for `GET /users`:

```js
axios.create.mockImplementation(() => ({
  get: jest.fn((url) =>
    url === '/users'
      ? Promise.resolve({ data: [sampleUser] })
      : Promise.resolve({ data: { users: [sampleUser], source: 'jsonplaceholder' } }),
  ),
}));
```

Assert table rows render and global search can produce the empty-state message.
