/* eslint-disable no-undef */
class homePage {
  get headerHome() {
    return $('#root > div > div > header');
  }
  get titleHome() {
    return $('#root > div > div > header > div > div.header_brand__2s1Vi');
  }
  get socialRedHome() {
    return $('#root > div > div > header > div > div:nth-child(2)');
  }
  get facebookSocialRed() {
    return $('#root > div > div > header > div > div:nth-child(2) > a:nth-child(1)');
  }
  get imgFacebook() {
    return $('#root > div > div > header > div > div:nth-child(2) > a:nth-child(1) > img');
  }
  get twitterSocialRed() {
    return $('#root > div > div > header > div > div:nth-child(2) > a:nth-child(2)');
  }
  get imgTwitter() {
    return $('#root > div > div > header > div > div:nth-child(2) > a:nth-child(2) > img');
  }
  get instagramSocialRed() {
    return $('#root > div > div > header > div > div:nth-child(2) > a:nth-child(3)');
  }
  get imgInstagram() {
    return $('#root > div > div > header > div > div:nth-child(2) > a:nth-child(3) > img');
  }
  get nav() {
    return $('#root > div > div > nav');
  }
  get navTitle() {
    return $('#root > div > div > nav > a > p');
  }
  get navRutes() {
    return $('#root > div > div > nav > ul');
  }
  get navFirstRute() {
    return $('#root > div > div > nav > ul > li:nth-child(1) > a');
  }
  get navSecondRute() {
    return $('#root > div > div > nav > ul > li:nth-child(2) > a');
  }
  get navThirtRute() {
    return $('#root > div > div > nav > ul > li:nth-child(3) > a');
  }
  get btnLogOut() {
    return $('#root > div > div > nav > button');
  }
  get containerHome() {
    return $('#root > div > section > div');
  }
  get wellcome() {
    return $('#root > div > section > div > h2');
  }
  get logoTrackgenix() {
    return $('#root > div > section > div > img');
  }
  get footer() {
    return $('#root > div > footer');
  }
  async clickFacebook() {
    await this.facebookSocialRed.click();
    browser.pause(3000);
  }
  async clickTwitter() {
    await this.twitterSocialRed.click();
    browser.pause(3000);
  }
  async clickInstagram() {
    await this.instagramSocialRed.click();
    browser.pause(3000);
  }
  async clickEmployee() {
    await this.employeeBtn.click();
    browser.pause(3000);
  }
  async clickSuperAdmin() {
    await this.superAdminBtn.click();
    browser.pause(3000);
  }
  async clickRegister() {
    await this.registerBtn.click();
    browser.pause(3000);
  }
  async clickAdmins() {
    await this.navFirstRute.click();
    browser.pause(3000);
  }
  async clickProjects() {
    await this.navSecondRute.click();
    browser.pause(3000);
  }
}

module.exports = new homePage();
