import { expect } from '@playwright/test';
import { test } from '../src/fixture/index.js';
import fs from 'fs';

test.describe('All test for realworld', () => {
  let registeredUser = null;
  let articleDate = null;

  test.beforeEach(async ({ webApp }) => {
    await webApp.base.loginToSite();
  });

  test('User registration', async ({ webApp }) => {
    await webApp.mainPage.clickOnSignUpButton();
    registeredUser = await webApp.signUp.fillRegistrationForm();

    await expect(webApp.signUp.getUserNameElement(registeredUser.name)).toBeVisible();

    fs.writeFileSync('user.json', JSON.stringify(registeredUser));
  });

  test('User authorization', async ({ webApp }) => {
    const user = JSON.parse(fs.readFileSync('user.json', 'utf8'));

    await webApp.mainPage.clickOnLoginButton();
    await webApp.loginPage.fillLoginForm(user.email, user.password);
    await expect(webApp.loginPage.getUserNameElement(registeredUser.name)).toBeVisible();
  });

  test('Create new article - positiv', async ({ webApp }) => {
    const user = JSON.parse(fs.readFileSync('user.json', 'utf8'));

    await webApp.mainPage.clickOnLoginButton();
    await webApp.loginPage.fillLoginForm(user.email, user.password);
    await webApp.mainPage.clickOnNewArticle();
    articleDate = await webApp.articlePage.fillArticleForm();
    await expect(webApp.articlePage.getArticleTextElement(articleDate.text)).toBeVisible();
  });

  test('Create new article - negativ', async ({ webApp }) => {
    const user = JSON.parse(fs.readFileSync('user.json', 'utf8'));

    await webApp.mainPage.clickOnLoginButton();
    await webApp.loginPage.fillLoginForm(user.email, user.password);
    await webApp.mainPage.clickOnNewArticle();
    await webApp.articlePage.fillArticleForm(articleDate);
    await expect(webApp.articlePage.getErrorMessage()).toBeVisible();
  });

  test('Click popular tags', async ({ webApp }) => {
    const user = JSON.parse(fs.readFileSync('user.json', 'utf8'));

    await webApp.mainPage.clickOnLoginButton();
    await webApp.loginPage.fillLoginForm(user.email, user.password);
    await webApp.mainPage.clickAdvertising();
    await expect(webApp.mainPage.getAdvertisingElement()).toBeVisible();
    await webApp.mainPage.clickConscendo();
    await expect(webApp.mainPage.getConscendoElement()).toBeVisible();
  });

  test('Check user profile', async ({ webApp }) => {
    const user = JSON.parse(fs.readFileSync('user.json', 'utf8'));

    await webApp.mainPage.clickOnLoginButton();
    await webApp.loginPage.fillLoginForm(user.email, user.password);
    await webApp.mainPage.profileDropdownMenu();
    await expect(webApp.profilePage.getUserNameElement(registeredUser.name)).toBeVisible();
  });

  test('Edit profile', async ({ webApp }) => {
    const user = JSON.parse(fs.readFileSync('user.json', 'utf8'));

    await webApp.mainPage.clickOnLoginButton();
    await webApp.loginPage.fillLoginForm(user.email, user.password);
    await webApp.mainPage.profileDropdownMenu();
    await webApp.profilePage.editProfile();
    await webApp.profilePage.updateProfile();
    await expect(webApp.profilePage.getBioElement()).toBeVisible();
  });
});
