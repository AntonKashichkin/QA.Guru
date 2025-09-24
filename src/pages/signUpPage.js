import { Helpers } from '../helpers/helpers.js';
import { test } from '@playwright/test';

export class SignUp {
  constructor(page) {
    this.page = page;
    this.helpers = new Helpers(page);
    this.user = this.helpers.user;

    this.nameInput = page.getByPlaceholder('Your Name');
    this.emailInput = page.getByPlaceholder('Email');
    this.passwordInput = page.getByPlaceholder('Password');
    this.signUpButton = page.getByRole('button', { name: 'Sign up' });
  }

  async fillRegistrationForm() {
    return test.step('Fill registration form', async (step) => {
      await this.nameInput.click();
      await this.nameInput.fill(this.user.name);
      await this.emailInput.click();
      await this.emailInput.fill(this.user.email);
      await this.passwordInput.click();
      await this.passwordInput.fill(this.user.password);
      await this.signUpButton.click();
      return this.user;
    });
  }

  getUserNameElement(name) {
      return this.page.getByText(name);
    };
}
