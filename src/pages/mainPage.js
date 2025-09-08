export class MainPage {
  constructor(page) {
    this.page = page;
    this.signUp = page.getByRole('link', { name: 'Sign up' });
    this.login = page.getByRole('link', { name: 'Login' });
    this.newArticle = page.getByRole('link', { name: 'New Article' });
    this.advertisingTag = page.getByRole('button', { name: 'реклама' });
    this.conscendoTag = page.getByRole('button', { name: 'conscendo' });
    this.dropdownMenu = page.locator('.nav-link.dropdown-toggle');
    this.profileButton = page.getByRole('link', { name: 'Profile' });
  }

  async clickOnSignUpButton() {
    await this.signUp.click();
  }

  async clickOnLoginButton() {
    await this.login.click();
  }

  async clickOnNewArticle() {
    await this.newArticle.click();
  }

  async clickAdvertising() {
    await this.advertisingTag.click();
  }
  async clickConscendo() {
    await this.conscendoTag.click();
  }

  async profileDropdownMenu() {
    await this.dropdownMenu.click();
    await this.profileButton.click();
  }

  getAdvertisingElement() {
    return this.page.getByRole('button', { name: ' реклама' });
  }

  getConscendoElement() {
    return this.page.getByRole('button', { name: ' conscendo' });
  }
}
