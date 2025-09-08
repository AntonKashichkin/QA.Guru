import { test, expect } from '@playwright/test';
import { MainPage, SignUp, Base, Login, Article, Profile } from '../src/pages/index';
import fs from 'fs';

test.describe('All test for realworld', () => {
  let registeredUser = null;
  let articleDate = null;
  let mainPage, signUp, base, loginPage, articlePage, profilePage;

  test.beforeEach(async ({ page }) => {
    base = new Base(page);
    await base.loginToSite();
  });

  test('User registration', async ({ page }) => {
    mainPage = new MainPage(page);
    signUp = new SignUp(page);

    await mainPage.clickOnSignUpButton();
    registeredUser = await signUp.fillRegistrationForm();
    await expect(signUp.getUserNameElement(registeredUser.name)).toBeVisible();

    fs.writeFileSync('user.json', JSON.stringify(registeredUser));
  });

  test('User authorization', async ({ page }) => {
    const user = JSON.parse(fs.readFileSync('user.json', 'utf8'));
    mainPage = new MainPage(page);
    loginPage = new Login(page);

    await mainPage.clickOnLoginButton();
    await loginPage.fillLoginForm(user.email, user.password);
    await expect(loginPage.getUserNameElement(registeredUser.name)).toBeVisible();
  });

  test('Create new article - positiv', async ({ page }) => {
    const user = JSON.parse(fs.readFileSync('user.json', 'utf8'));
    mainPage = new MainPage(page);
    loginPage = new Login(page);
    articlePage = new Article(page);

    await mainPage.clickOnLoginButton();
    await loginPage.fillLoginForm(user.email, user.password);
    await mainPage.clickOnNewArticle();
    articleDate = await articlePage.fillArticleForm();
    await expect(articlePage.getArticleTextElement(articleDate.text)).toBeVisible();
  });

  test('Create new article - negativ', async ({ page }) => {
    const user = JSON.parse(fs.readFileSync('user.json', 'utf8'));
    mainPage = new MainPage(page);
    loginPage = new Login(page);
    articlePage = new Article(page);

    await mainPage.clickOnLoginButton();
    await loginPage.fillLoginForm(user.email, user.password);
    await mainPage.clickOnNewArticle();
    await articlePage.fillArticleForm(articleDate);
    await expect(articlePage.getErrorMessage()).toBeVisible();
  });

  test('Click popular tags', async ({ page }) => {
    const user = JSON.parse(fs.readFileSync('user.json', 'utf8'));
    mainPage = new MainPage(page);
    loginPage = new Login(page);
    articlePage = new Article(page);

    await mainPage.clickOnLoginButton();
    await loginPage.fillLoginForm(user.email, user.password);
    await mainPage.clickAdvertising();
    await expect(mainPage.getAdvertisingElement()).toBeVisible();
    await mainPage.clickConscendo();
    await expect(mainPage.getConscendoElement()).toBeVisible();
  });

  test('Check user profile', async ({ page }) => {
    const user = JSON.parse(fs.readFileSync('user.json', 'utf8'));
    mainPage = new MainPage(page);
    loginPage = new Login(page);
    profilePage = new Profile(page);

    await mainPage.clickOnLoginButton();
    await loginPage.fillLoginForm(user.email, user.password);
    await mainPage.profileDropdownMenu();
    await expect(profilePage.getUserNameElement(registeredUser.name)).toBeVisible();
  });

  test('Edit profile', async ({ page }) => {
    const user = JSON.parse(fs.readFileSync('user.json', 'utf8'));
    mainPage = new MainPage(page);
    loginPage = new Login(page);
    profilePage = new Profile(page);

    await mainPage.clickOnLoginButton();
    await loginPage.fillLoginForm(user.email, user.password);
    await mainPage.profileDropdownMenu();
    await profilePage.editProfile();
    await profilePage.updateProfile();
    await expect(profilePage.getBioElement()).toBeVisible();
  });
});
