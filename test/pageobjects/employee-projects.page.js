class EmployeeProjectsPage {
  get titleHead() {
    return $('.header_brand__2s1Vi');
  }
  get facebookIconHead() {
    return $('#root > div > header > div > div:nth-child(2) > a:nth-child(1) > img');
  }
  get twitterIconHead() {
    return $('#root > div > header > div > div:nth-child(2) > a:nth-child(2) > img');
  }
  get instagramIconHead() {
    return $('#root > div > header > div > div:nth-child(2) > a:nth-child(3) > img');
  }
  get faceLinkHead() {
    return $('#root > div > header > div > div:nth-child(2) > a:nth-child(1)');
  }
  get twitLinkHead() {
    return $('#root > div > header > div > div:nth-child(2) > a:nth-child(2)');
  }
  get instaLinkHead() {
    return $('#root > div > header > div > div:nth-child(2) > a:nth-child(3)');
  }
  get facebookIconFoot() {
    return $(
      '#root > div > div > footer > div.footer_license__1FrkS > div:nth-child(2) > a:nth-child(1) > img'
    );
  }
  get twitterIconFoot() {
    return $(
      '#root > div > div > footer > div.footer_license__1FrkS > div:nth-child(2) > a:nth-child(2) > img'
    );
  }
  get instagramIconFoot() {
    return $(
      '#root > div > div > footer > div.footer_license__1FrkS > div:nth-child(2) > a:nth-child(3) > img'
    );
  }
  get faceLinkFoot() {
    return $(
      '#root > div > div > footer > div.footer_license__1FrkS > div:nth-child(2) > a:nth-child(1)'
    );
  }
  get twitLinkFoot() {
    return $(
      '#root > div > div > footer > div.footer_license__1FrkS > div:nth-child(2) > a:nth-child(2)'
    );
  }
  get instaLinkFoot() {
    return $(
      '#root > div > div > footer > div.footer_license__1FrkS > div:nth-child(2) > a:nth-child(3)'
    );
  }
  get trackgenixTitle() {
    return $('.navBar_appName__3ZPgE');
  }
  get trackgenixLink() {
    return $('.navBar_homeContainer__3-GFA');
  }
  get trackgenixFooter() {
    return $('.footer_appName__3fg74');
  }
  get profileHead() {
    return $('#root > div > div > nav > ul > li:nth-child(1) > a');
  }
  get projectsHead() {
    return $('#root > div > div > nav > ul > li:nth-child(2) > a');
  }
  get timeSheetsHead() {
    return $('#root > div > div > nav > ul > li:nth-child(3) > a');
  }
  get profileFooter() {
    return $('#root > div > div > footer > div.footer_main__21Zzn > ul > li:nth-child(1) > a');
  }
  get projectsFooter() {
    return $('#root > div > div > footer > div.footer_main__21Zzn > ul > li:nth-child(2) > a');
  }
  get timeSheetsFooter() {
    return $('#root > div > div > footer > div.footer_main__21Zzn > ul > li:nth-child(3) > a');
  }
  get copyrightText() {
    return $('.footer_copyright__1FoOh');
  }
  get myProjectsTitle() {
    return $('.table_title__1NxMn');
  }
  get idLabel() {
    return $('#root > div > div > section > div > table > thead > tr > th:nth-child(1)');
  }
  get roleLabel() {
    return $('#root > div > div > section > div > table > thead > tr > th:nth-child(2)');
  }
  get projectNameLabel() {
    return $('#root > div > div > section > div > table > thead > tr > th:nth-child(3)');
  }
  get clientLabel() {
    return $('#root > div > div > section > div > table > thead > tr > th:nth-child(4)');
  }
  get startDateLabel() {
    return $('#root > div > div > section > div > table > thead > tr > th:nth-child(5)');
  }
  get finishDateLabel() {
    return $('#root > div > div > section > div > table > thead > tr > th:nth-child(6)');
  }
  get pageIndex() {
    return $('.table_page__28tC0');
  }
  get previousBtn() {
    return $(
      '#root > div > div > section > div > div.table_buttons__2zGNi > div:nth-child(1) > button'
    );
  }
  get nextBtn() {
    return $(
      '#root > div > div > section > div > div.table_buttons__2zGNi > div:nth-child(2) > button'
    );
  }
}

module.exports = new EmployeeProjectsPage();
