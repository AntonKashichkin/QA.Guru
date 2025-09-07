export class Base {
  constructor(page) {
    this.page = page;
  }
  async loginToSite() {
    await this.page.goto(`https://realworld.qa.guru/#/`);
  }
}
