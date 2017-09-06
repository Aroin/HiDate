import { HiDatePage } from './app.po';

describe('hi-date App', () => {
  let page: HiDatePage;

  beforeEach(() => {
    page = new HiDatePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
