const HomePage = require('./home.page');

class SuperAdminHomePage extends HomePage {
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
  get copyrightText() {
    return $('.footer_copyright__1FoOh');
  }
  get welcomeContent() {
    return $('#root > div > div > section > div > h2');
  }
  get adminsHead() {
    return $('#root > div > div > nav > ul > li:nth-child(1) > a');
  }
  get superAdminsHead() {
    return $('#root > div > div > nav > ul > li:nth-child(2) > a');
  }
  get employeesHead() {
    return $('#root > div > div > nav > ul > li:nth-child(3) > a');
  }
  get projectsHead() {
    return $('#root > div > div > nav > ul > li:nth-child(4) > a');
  }
  get timesheetsHead() {
    return $('#root > div > div > nav > ul > li:nth-child(5) > a');
  }
  get tasksHead() {
    return $('#root > div > div > nav > ul > li:nth-child(6) > a');
  }
  get adminsFooter() {
    return $('#root > div > div > footer > div.footer_main__21Zzn > ul > li:nth-child(1) > a');
  }
  get superAdminsFooter() {
    return $('#root > div > div > footer > div.footer_main__21Zzn > ul > li:nth-child(2) > a');
  }
  get employeesFooter() {
    return $('#root > div > div > footer > div.footer_main__21Zzn > ul > li:nth-child(3) > a');
  }
  get projectsFooter() {
    return $('#root > div > div > footer > div.footer_main__21Zzn > ul > li:nth-child(4) > a');
  }
  get timesheetsFooter() {
    return $('#root > div > div > footer > div.footer_main__21Zzn > ul > li:nth-child(5) > a');
  }
  get taskFooter() {
    return $('#root > div > div > footer > div.footer_main__21Zzn > ul > li:nth-child(6) > a');
  }
}

module.exports = new SuperAdminHomePage();
