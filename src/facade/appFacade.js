import { MainPage, SignUp, Base, Login, Article, Profile } from './index.js';

export class App {
  constructor(page) {
    this.page = page;
    this.base = new Base(page);
    this.mainPage = new MainPage(page);
    this.signUp = new SignUp(page);
    this.loginPage = new Login(page);
    this.articlePage = new Article(page);
    this.profilePage = new Profile(page);
  }
}
