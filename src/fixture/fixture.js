import { test as base } from '@playwright/test';
import { App } from '../facade/appFacade.js';

/**
 * Declare the custom Playwright fixture typings for JS with @ts-check.
 * This tells TypeScript that we are extending the test with a `webApp` fixture of type `App`.
 * Without this, `base.extend` assumes no custom fixtures and flags `webApp` as unknown.
 *
 * @typedef {import('../facade/appFacade.js').App} AppType
 * @typedef {import('@playwright/test').TestType<{ webApp: AppType }, {}>} TestWithWebApp
 */

/** @type {TestWithWebApp} */

export const test = base.extend({
  webApp: async ({ page }, use) => {
    const app = new App(page);
    await use(app);
  },
});
