export class Login {
  constructor(page) {
    this.page = page;
    this.emailLoginInput = page.getByPlaceholder('Email');
    this.passwordLoginInput = page.getByPlaceholder('Password');
    this.signUpButton = page.getByRole('button', { name: 'Login' });
  }

  async fillLoginForm(email, password) {
    await this.emailLoginInput.click();
    await this.emailLoginInput.fill(email);
    await this.passwordLoginInput.click();
    await this.passwordLoginInput.fill(password);
    await this.signUpButton.click();
  }
}
