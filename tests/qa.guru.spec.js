import { test, expect } from '@playwright/test';
import { MainPage, SignUp, Base, Login, Article, Profile } from '../src/pages/index';

test.describe.serial('All test for realworld', () => {
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
    await expect(page.getByText(registeredUser.name)).toBeVisible();
    await expect(page.getByRole('navigation')).toContainText(registeredUser.name);
  });

  test('User authorization', async ({ page }) => {
    mainPage = new MainPage(page);
    loginPage = new Login(page);

    await mainPage.clickOnLoginButton();
    await loginPage.fillLoginForm(registeredUser.email, registeredUser.password);
    await expect(page.getByText(registeredUser.name)).toBeVisible();
    await expect(page.getByRole('navigation')).toContainText(registeredUser.name);
  });

  test('Create new article - positiv', async ({ page }) => {
    mainPage = new MainPage(page);
    loginPage = new Login(page);
    articlePage = new Article(page);

    await mainPage.clickOnLoginButton();
    await loginPage.fillLoginForm(registeredUser.email, registeredUser.password);
    await mainPage.clickOnNewArticle();
    articleDate = await articlePage.fillArticleForm();
    await expect(page.getByText(articleDate.text)).toBeVisible();
  });

  test('Create new article - negativ', async ({ page }) => {
    mainPage = new MainPage(page);
    loginPage = new Login(page);
    articlePage = new Article(page);

    await mainPage.clickOnLoginButton();
    await loginPage.fillLoginForm(registeredUser.email, registeredUser.password);
    await mainPage.clickOnNewArticle();
    await articlePage.fillArticleForm(articleDate);
    await expect(page.getByText('Title already exists..')).toBeVisible();
  });

  test('Click popular tags', async ({ page }) => {
    mainPage = new MainPage(page);
    loginPage = new Login(page);
    articlePage = new Article(page);

    await mainPage.clickOnLoginButton();
    await loginPage.fillLoginForm(registeredUser.email, registeredUser.password);
    await mainPage.clickAdvertising();
    await expect(page.getByRole('button', { name: ' реклама' })).toBeVisible();
    await mainPage.clickConscendo();
    await expect(page.getByRole('button', { name: ' conscendo' })).toBeVisible();
  });

  test('Check user profile', async ({ page }) => {
    mainPage = new MainPage(page);
    loginPage = new Login(page);

    await mainPage.clickOnLoginButton();
    await loginPage.fillLoginForm(registeredUser.email, registeredUser.password);
    await mainPage.profileDropdownMenu();
    await expect(page.getByText(registeredUser.name).nth(1)).toBeVisible();
  });

  test('Edit profile', async ({ page }) => {
    mainPage = new MainPage(page);
    loginPage = new Login(page);
    profilePage = new Profile(page);

    await mainPage.clickOnLoginButton();
    await loginPage.fillLoginForm(registeredUser.email, registeredUser.password);
    await mainPage.profileDropdownMenu();
    await profilePage.editProfile();
    await profilePage.updateProfile();
    await expect(page.getByText('I am QA.GURU student')).toBeVisible();
  });
});
