/* eslint-disable no-undef */
class homePage {
  get headerHome() {
    return $('#root > div > header');
  }
  get titleHome() {
    return $('.header_brand__2s1Vi');
  }
  get socialRedHome() {
    return $('#root > div > header > div > div:nth-child(2)');
  }
  get facebookSocialRed() {
    return $('#root > div > header > div > div:nth-child(2) > a:nth-child(1)');
  }
  get imgFacebook() {
    return $('div:nth-child(2) > a:nth-child(1) > img');
  }
  get twitterSocialRed() {
    return $('div:nth-child(2) > a:nth-child(2)');
  }
  get imgTwitter() {
    return $('div:nth-child(2) > a:nth-child(2) > img');
  }
  get instagramSocialRed() {
    return $('div:nth-child(2) > a:nth-child(3)');
  }
  get imgInstagram() {
    return $('div:nth-child(2) > a:nth-child(3) > img');
  }
  get bodyHome() {
    return $('#root > div > section');
  }
  get containerHome() {
    return $('#root > div > section > div');
  }
  get employeeBtn() {
    return $('#root > div > section > div > a:nth-child(2)');
  }
  get superAdminBtn() {
    return $('#root > div > section > div > a:nth-child(3)');
  }
  get registerBtn() {
    return $('#root > div > section > div > a:nth-child(4)');
  }
  get footer() {
    return $('.footer_license__1FrkS');
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
}

module.exports = new homePage();
