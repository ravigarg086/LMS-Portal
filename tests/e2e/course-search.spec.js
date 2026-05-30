// @ts-check
const { test, expect } = require('@playwright/test');
const { TEST_USERS } = require('./fixtures/users');
const { clearSession, signInAs } = require('./helpers/auth');

test.describe('Course search', () => {
  test.beforeEach(async ({ page }) => {
    await clearSession(page);
  });

  test('student can search courses after login', async ({ page }) => {
    await signInAs(page, TEST_USERS.student);

    const searchInput = page.getByLabel('Search courses');
    await searchInput.fill('java');
    await expect(page.getByRole('listbox', { name: 'Course search results' })).toBeVisible();
    await expect(page.getByRole('alert')).not.toBeVisible();
    await expect(page.getByText('Full Stack MERN Development')).toBeVisible();
  });
});
