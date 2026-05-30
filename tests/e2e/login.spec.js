// @ts-check
const { test, expect } = require('@playwright/test');
const { ALL_PERSONAS, TEST_USERS } = require('./fixtures/users');
const {
  clearSession,
  openSignIn,
  selectPersona,
  fillSignInForm,
  submitSignIn,
  signInAs,
  expectDashboard,
} = require('./helpers/auth');

test.describe('Login — all personas', () => {
  test.beforeEach(async ({ page }) => {
    await clearSession(page);
  });

  for (const user of ALL_PERSONAS) {
    test(`${user.roleLabel} can sign in and reach ${user.dashboardPath}`, async ({ page }) => {
      await signInAs(page, user);
      await expectDashboard(page, user);
      await expect(page).toHaveURL(new RegExp(`${user.dashboardPath.replace('/', '\\/')}$`));
    });
  }

  test('Student demo quick-fill signs in successfully', async ({ page }) => {
    await openSignIn(page);
    await selectPersona(page, TEST_USERS.student.roleLabel);
    await page.getByText('Try demo accounts').click();
    await page.getByRole('button', { name: 'Use Student demo' }).click();
    await submitSignIn(page);
    await expectDashboard(page, TEST_USERS.student);
  });

  test('rejects invalid credentials', async ({ page }) => {
    await openSignIn(page);
    await selectPersona(page, TEST_USERS.student.roleLabel);
    await fillSignInForm(page, {
      email: TEST_USERS.student.email,
      password: 'wrong-password-123',
    });
    await submitSignIn(page);

    await expect(page).toHaveURL(/\/signin$/);
    await expect(page.getByRole('alert')).toContainText(/invalid|incorrect|failed|sign in/i);
  });

  test('rejects student credentials on Admin tab', async ({ page }) => {
    await openSignIn(page);
    await selectPersona(page, TEST_USERS.admin.roleLabel);
    await fillSignInForm(page, {
      email: TEST_USERS.student.email,
      password: TEST_USERS.student.password,
    });
    await submitSignIn(page);

    await expect(page).toHaveURL(/\/signin$/);
    await expect(page.getByRole('alert')).toBeVisible();
  });

  test('authenticated user is redirected away from sign-in page', async ({ page }) => {
    await signInAs(page, TEST_USERS.faculty);
    await expectDashboard(page, TEST_USERS.faculty);

    await page.goto('/signin');
    await expect(page).toHaveURL(new RegExp(`${TEST_USERS.faculty.dashboardPath.replace('/', '\\/')}$`));
  });
});
