import { faker } from '@faker-js/faker';

export class SignUp {
  constructor(page) {
    this.page = page;
    this.nameInput = page.getByPlaceholder('Your Name');
    this.emailInput = page.getByPlaceholder('Email');
    this.passwordInput = page.getByPlaceholder('Password');
    this.signUpButton = page.getByRole('button', { name: 'Sign up' });

    this.user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  }

  async fillRegistrationForm() {
    await this.nameInput.click();
    await this.nameInput.fill(this.user.name);
    await this.emailInput.click();
    await this.emailInput.fill(this.user.email);
    await this.passwordInput.click();
    await this.passwordInput.fill(this.user.password);
    await this.signUpButton.click();
    return this.user;
  }
}
