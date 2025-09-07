import { faker } from '@faker-js/faker';

export class Article {
  constructor(page) {
    this.page = page;
    this.articleTitle = page.getByPlaceholder('Article Title');
    this.articleAbout = page.getByPlaceholder("What's this article about?");
    this.articleText = page.getByPlaceholder('Write your article (in markdown)');
    this.articleTags = page.getByPlaceholder('Enter tags');
    this.publishArticleButton = page.getByRole('button', { name: 'Publish Article' });

    this.article = {
      title: faker.word.adjective({ length: { min: 5, max: 7 }, strategy: 'fail' }),
      about: faker.word.adjective({ length: { min: 5, max: 7 }, strategy: 'fail' }),
      text: faker.word.adjective({ length: { min: 5, max: 7 }, strategy: 'fail' }),
      tags: faker.word.adjective({ length: { min: 5, max: 7 }, strategy: 'fail' }),
    };
  }

  async fillArticleForm(article = this.article) {
    await this.articleTitle.click();
    await this.articleTitle.fill(article.title);
    await this.articleAbout.click();
    await this.articleAbout.fill(article.about);
    await this.articleText.click();
    await this.articleText.fill(article.text);
    await this.articleTags.click();
    await this.articleTags.fill(article.tags);
    await this.publishArticleButton.click();
    return this.article;
  }

 
}
