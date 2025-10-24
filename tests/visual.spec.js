import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    // arrange или настройка, предусловие
    await page.goto('https://realworld.qa.guru/');
    await expect(page.locator('.navbar-brand')).toBeVisible();
    await expect(page).toHaveScreenshot('homepage.png', {fullPage: true, animations: 'disabled', mask: [
        page.locator('.counter'),
        page.locator('.date'),
    ]});

const pageContent = await page.locator('body').innerText();
    await expect(pageContent).toMatchSnapshot('realWorldHome.txt');
});

test('Скриншотный с моком данных', async ({ page }) => {

    await page.route('**/tags', async (route) => {
        const json = {tags: ['пятничка']};
        await route.fulfill({json});
    });
    // arrange или настройка, предусловие
    await page.goto('https://realworld.qa.guru/');


    await expect(page.locator('.navbar-brand')).toBeVisible();
    await expect(page).toHaveScreenshot('homepageWithMockData.png', {fullPage: true, animations: 'disabled', mask: [
        page.locator('.counter'),
        page.locator('.date'),
    ]});
});


test('Скриншотный с моком данных c добавлением', async ({ page }) => {

    await page.route('**/tags', async (route) => {
        const response = await route.fetch();
        const json = await response.json();
        json.tags.unshift('Конста');
        await route.fulfill({json});
    });
    // arrange или настройка, предусловие
    await page.goto('https://realworld.qa.guru/');
    await expect(page.locator('.tag-pill').nth(0)).toBeVisible();
    await expect(page).toHaveScreenshot('homepageWithMockDataAdd.png', {fullPage: true, animations: 'disabled', mask: [
        page.locator('.counter'),
        page.locator('.date'),
    ]});
});
