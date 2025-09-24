import { test } from '@playwright/test';

export class Profile {
  constructor(page) {
    this.page = page;
    this.editProfileButton = page.getByRole('link', { name: 'Edit Profile Settings' });
    this.bioInput = page.getByPlaceholder('Short bio about you');
    this.UpdateButtom = page.getByRole('button', { name: 'Update Settings' });
    this.getBioElement = page.getByText('I am QA.GURU student');
  }

  async editProfile() {
    return test.step('Edit profile', async (step) => {
      await this.editProfileButton.click();
    });
  }

  async updateProfile() {
    return test.step('Upfate profile', async (step) => {
      await this.bioInput.fill('I am QA.GURU student');
      await this.UpdateButtom.click();
    });
  }

  getUserNameElement(name) {
    return this.page.getByText(name).nth(1);
  }
}
