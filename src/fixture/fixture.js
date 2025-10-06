import { test as base } from '@playwright/test';
import { App } from '../facade/appFacade.js';
import { Api } from '../services/index.js';

/**
 * Declare the custom Playwright fixture typings for JS with @ts-check.
 * @typedef {import('../facade/appFacade.js').App} AppType
 * @typedef {import('../services/index.js').Api} ApiType
 * @typedef {import('@playwright/test').TestType<{ webApp: AppType, api: ApiType }, {}>} TestWithWebApp
 */

/** @type {TestWithWebApp} */

export const test = base.extend({
  webApp: async ({ page }, use) => {
    const app = new App(page);
    await use(app);
  },


    api: async ({ request }, use) => {
    let api = new Api(request);
    await use(api);
  },
});
