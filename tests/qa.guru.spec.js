import { test, expect } from '@playwright/test';
import { App } from '../src/helpers/appFacade';
import fs from 'fs';

test.describe('All test for realworld', () => {
  let registeredUser = null;
  let articleDate = null;
  
  test.beforeEach(async ({ page }) => {
    let app = new App(page);
    await app.base.loginToSite();
  });

  test('User registration', async ({ page }) => {
    let app = new App(page);

    await app.mainPage.clickOnSignUpButton();
    registeredUser = await app.signUp.fillRegistrationForm();
    
    await expect(app.signUp.getUserNameElement(registeredUser.name)).toBeVisible();

    fs.writeFileSync('user.json', JSON.stringify(registeredUser));
  });

  test('User authorization', async ({ page }) => {
    const user = JSON.parse(fs.readFileSync('user.json', 'utf8'));
    let app = new App(page);

    await app.mainPage.clickOnLoginButton();
    await app.loginPage.fillLoginForm(user.email, user.password);
    await expect(app.loginPage.getUserNameElement(registeredUser.name)).toBeVisible();
  });

  test('Create new article - positiv', async ({ page }) => {
    const user = JSON.parse(fs.readFileSync('user.json', 'utf8'));
    let app = new App(page);

    await app.mainPage.clickOnLoginButton();
    await app.loginPage.fillLoginForm(user.email, user.password);
    await app.mainPage.clickOnNewArticle();
    articleDate = await app.articlePage.fillArticleForm();
    await expect(app.articlePage.getArticleTextElement(articleDate.text)).toBeVisible();
  });

  test('Create new article - negativ', async ({ page }) => {
    const user = JSON.parse(fs.readFileSync('user.json', 'utf8'));
    let app = new App(page);

    await app.mainPage.clickOnLoginButton();
    await app.loginPage.fillLoginForm(user.email, user.password);
    await app.mainPage.clickOnNewArticle();
    await app.articlePage.fillArticleForm(articleDate);
    await expect(app.articlePage.getErrorMessage()).toBeVisible();
  });

  test('Click popular tags', async ({ page }) => {
    const user = JSON.parse(fs.readFileSync('user.json', 'utf8'));
    let app = new App(page);

    await app.mainPage.clickOnLoginButton();
    await app.loginPage.fillLoginForm(user.email, user.password);
    await app.mainPage.clickAdvertising();
    await expect(app.mainPage.getAdvertisingElement()).toBeVisible();
    await app.mainPage.clickConscendo();
    await expect(app.mainPage.getConscendoElement()).toBeVisible();
  });

  test('Check user profile', async ({ page }) => {
    const user = JSON.parse(fs.readFileSync('user.json', 'utf8'));
    let app = new App(page);

    await app.mainPage.clickOnLoginButton();
    await app.loginPage.fillLoginForm(user.email, user.password);
    await app.mainPage.profileDropdownMenu();
    await expect(app.profilePage.getUserNameElement(registeredUser.name)).toBeVisible();
  });

  test('Edit profile', async ({ page }) => {
    const user = JSON.parse(fs.readFileSync('user.json', 'utf8'));
    let app = new App(page);

    await app.mainPage.clickOnLoginButton();
    await app.loginPage.fillLoginForm(user.email, user.password);
    await app.mainPage.profileDropdownMenu();
    await app.profilePage.editProfile();
    await app.profilePage.updateProfile();
    await expect(app.profilePage.getBioElement()).toBeVisible();
  });
});
