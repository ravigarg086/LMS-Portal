const fs = require('fs');
const path = require('path');
const https = require('https');

const JSONPLACEHOLDER_URL = 'https://jsonplaceholder.typicode.com/users';
const FALLBACK_PATH = path.join(__dirname, '../../data/jsonplaceholder-users.json');
const FETCH_TIMEOUT_MS = 2500;

function readFallbackUsers() {
  const raw = fs.readFileSync(FALLBACK_PATH, 'utf8');
  const users = JSON.parse(raw);
  return Array.isArray(users) ? users : [];
}

function fetchJsonPlaceholderUsers() {
  return new Promise((resolve, reject) => {
    const request = https.get(
      JSONPLACEHOLDER_URL,
      { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) },
      (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`JSONPlaceholder responded with status ${response.statusCode}`));
          response.resume();
          return;
        }

        let body = '';
        response.setEncoding('utf8');
        response.on('data', (chunk) => {
          body += chunk;
        });
        response.on('end', () => {
          try {
            const users = JSON.parse(body);
            resolve(Array.isArray(users) ? users : []);
          } catch (error) {
            reject(error);
          }
        });
      },
    );

    request.on('error', reject);
  });
}

async function getExternalUsers() {
  try {
    const users = await fetchJsonPlaceholderUsers();
    if (users.length === 0) {
      throw new Error('JSONPlaceholder returned no users');
    }
    return { users, source: 'jsonplaceholder' };
  } catch (error) {
    return { users: readFallbackUsers(), source: 'cached' };
  }
}

module.exports = { getExternalUsers };
