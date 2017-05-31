import { QuotingPage } from './app.po';

describe('quoting App', () => {
  let page: QuotingPage;

  beforeEach(() => {
    page = new QuotingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
