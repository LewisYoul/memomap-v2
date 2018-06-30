import { MemomapPage } from './app.po';

describe('memomap App', function() {
  let page: MemomapPage;

  beforeEach(() => {
    page = new MemomapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
