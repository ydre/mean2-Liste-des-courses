import { CoursesAppPage } from './app.po';

describe('courses-app App', function() {
  let page: CoursesAppPage;

  beforeEach(() => {
    page = new CoursesAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
