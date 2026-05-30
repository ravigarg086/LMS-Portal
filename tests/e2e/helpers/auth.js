/**
 * Shared Playwright helpers for sign-in flows.
 */

async function clearSession(page) {
  await page.context().clearCookies();
  await page.goto('/');
  await page.evaluate(() => {
    sessionStorage.clear();
    localStorage.clear();
  });
}

async function openSignIn(page) {
  await page.goto('/signin');
  await page.getByRole('heading', { name: 'Sign In' }).waitFor();
}

async function selectPersona(page, roleLabel) {
  await page.getByRole('tab', { name: roleLabel, exact: true }).click();
}

async function fillSignInForm(page, { email, password }) {
  await page.getByLabel('User ID or Email').fill(email);
  await page.getByLabel('Password').fill(password);
}

async function submitSignIn(page) {
  await page.getByRole('button', { name: 'Sign In', exact: true }).click();
}

async function signInAs(page, user) {
  await clearSession(page);
  await openSignIn(page);
  await selectPersona(page, user.roleLabel);
  await fillSignInForm(page, { email: user.email, password: user.password });
  await submitSignIn(page);
}

async function expectDashboard(page, user) {
  await page.waitForURL(`**${user.dashboardPath}`, { timeout: 15000 });
  await page.getByText(user.headerLabel, { exact: true }).waitFor();
  await page.getByRole('heading', { name: user.welcomePattern }).waitFor();
}

module.exports = {
  clearSession,
  openSignIn,
  selectPersona,
  fillSignInForm,
  submitSignIn,
  signInAs,
  expectDashboard,
};
