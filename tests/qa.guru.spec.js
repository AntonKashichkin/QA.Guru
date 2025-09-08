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
    await expect(page.getByRole('button', { name: 'Your Feed' })).toBeVisible();
    fs.writeFileSync('user.json', JSON.stringify(registeredUser));
  });

  test('User authorization', async ({ page }) => {
    const user = JSON.parse(fs.readFileSync('user.json', 'utf8'));
    mainPage = new MainPage(page);
    loginPage = new Login(page);

    await mainPage.clickOnLoginButton();
    await loginPage.fillLoginForm(user.email, user.password);
    await expect(page.getByRole('button', { name: 'Your Feed' })).toBeVisible();
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
    await expect(page.getByRole('button', { name: ' Edit Article' }).first()).toBeVisible();
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
    await expect(page.getByText('Title already exists..')).toBeVisible();
  });

  test('Click popular tags', async ({ page }) => {
    const user = JSON.parse(fs.readFileSync('user.json', 'utf8'));
    mainPage = new MainPage(page);
    loginPage = new Login(page);
    articlePage = new Article(page);

    await mainPage.clickOnLoginButton();
    await loginPage.fillLoginForm(user.email, user.password);
    await mainPage.clickAdvertising();
    await expect(page.getByRole('button', { name: ' реклама' })).toBeVisible();
    await mainPage.clickConscendo();
    await expect(page.getByRole('button', { name: ' conscendo' })).toBeVisible();
  });

  test('Check user profile', async ({ page }) => {
    const user = JSON.parse(fs.readFileSync('user.json', 'utf8'));
    mainPage = new MainPage(page);
    loginPage = new Login(page);

    await mainPage.clickOnLoginButton();
    await loginPage.fillLoginForm(user.email, user.password);
    await mainPage.profileDropdownMenu();
    await expect(page.getByRole('link', { name: ' Edit Profile Settings' })).toBeVisible();
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
    await expect(page.getByText('I am QA.GURU student')).toBeVisible();
  });
});
