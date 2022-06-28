class HomePage {
  get homeBtn() {
    return $('#root > div > section > div > h2');
  }
  get employeeBtn() {
    return $('#root > div > section > div > a:nth-child(2) > h2');
  }
  get employeeLink() {
    return $('#root > div > section > div > a:nth-child(2)');
  }
  get superAdminBtn() {
    return $('#root > div > section > div > a:nth-child(3) > h2');
  }
  get superAdminLink() {
    return $('#root > div > section > div > a:nth-child(3)');
  }
  get registerBtn() {
    return $('#root > div > section > div > a:nth-child(4) > h2');
  }
  get registerLink() {
    return $('#root > div > section > div > a:nth-child(4)');
  }
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
}

module.exports = new HomePage();
