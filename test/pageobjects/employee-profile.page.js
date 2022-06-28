class EmployeeProfilePage {
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
  get profileHeadTwo() {
    return $('#root > div > div > section > div > h2');
  }
  get firstNameLabel() {
    return $('#root > div > div > section > div > form > div:nth-child(1) > div > label');
  }
  get lastNameLabel() {
    return $('#root > div > div > section > div > form > div:nth-child(2) > div > label');
  }
  get phoneLabel() {
    return $('#root > div > div > section > div > form > div:nth-child(3) > div > label');
  }
  get emailLabel() {
    return $('#root > div > div > section > div > form > div:nth-child(4) > div > label');
  }
  get passwordLabel() {
    return $('#root > div > div > section > div > form > div:nth-child(5) > div > label');
  }
  get activeLabel() {
    return $('#root > div > div > section > div > form > div:nth-child(6) > div > label');
  }
  get activeLabelTrue() {
    return $(
      '#root > div > div > section > div > form > div:nth-child(6) > div > div > label:nth-child(1)'
    );
  }
  get activeLabelFalse() {
    return $(
      '#root > div > div > section > div > form > div:nth-child(6) > div > div > label:nth-child(3)'
    );
  }
  get firstNameFieldset() {
    return $('#root > div > div > section > div > form > div:nth-child(1) > div > input');
  }
  get lastNameFieldset() {
    return $('#root > div > div > section > div > form > div:nth-child(2) > div > input');
  }
  get phoneFieldset() {
    return $('#root > div > div > section > div > form > div:nth-child(3) > div > input');
  }
  get emailFieldset() {
    return $('#root > div > div > section > div > form > div:nth-child(4) > div > input');
  }
  get passwordFieldset() {
    return $('#root > div > div > section > div > form > div:nth-child(5) > div > input');
  }
  get activeCheckboxTrue() {
    return $(
      '#root > div > div > section > div > form > div:nth-child(6) > div > div > input[type=radio]:nth-child(2)'
    );
  }
  get activeCheckboxFalse() {
    return $(
      '#root > div > div > section > div > form > div:nth-child(6) > div > div > input[type=radio]:nth-child(4)'
    );
  }
  get submitBtn() {
    return $('#root > div > div > section > div > div > button:nth-child(1)');
  }
  get closeBtn() {
    return $('#root > div > div > section > div > div > button:nth-child(2)');
  }
  get resetBtn() {
    return $('#root > div > div > section > div > div > button:nth-child(3)');
  }
  get wrongFirstName() {
    return $('#root > div > div > section > div > form > div:nth-child(1) > div > p');
  }
  get wrongLastName() {
    return $('#root > div > div > section > div > form > div:nth-child(2) > div > p');
  }
  get wrongPhone() {
    return $('#root > div > div > section > div > form > div:nth-child(3) > div > p');
  }
  get wrongEmail() {
    return $('#root > div > div > section > div > form > div:nth-child(4) > div > p');
  }
  get wrongPassword() {
    return $('#root > div > div > section > div > form > div:nth-child(5) > div > p');
  }
  get wrongActive() {
    return $('#root > div > div > section > div > form > div:nth-child(6) > div > p');
  }

  async setFirstName(name) {
    await this.firstNameFieldset.setValue(name);
  }
  async setLastName(lastName) {
    await this.lastNameFieldset.setValue(lastName);
  }
  async setPhone(phone) {
    await this.phoneFieldset.setValue(phone);
  }
  async setEmail(email) {
    await this.emailFieldset.setValue(email);
  }
  async setPassword(password) {
    await this.passwordFieldset.setValue(password);
  }
  async setActiveTrue() {
    await this.activeCheckboxTrue.click();
  }
  async setActiveFalse() {
    await this.activeCheckboxFalse.click();
  }

  async completeFormT(name, lastName, phone, email, password) {
    await this.firstNameFieldset.setValue(name);
    await this.lastNameFieldset.setValue(lastName);
    await this.phoneFieldset.setValue(phone);
    await this.emailFieldset.setValue(email);
    await this.passwordFieldset.setValue(password);
    await this.activeCheckboxTrue.click();
  }

  async completeFormF(name, lastName, phone, email, password) {
    await this.firstNameFieldset.setValue(name);
    await this.lastNameFieldset.setValue(lastName);
    await this.phoneFieldset.setValue(phone);
    await this.emailFieldset.setValue(email);
    await this.passwordFieldset.setValue(password);
    await this.activeCheckboxFalse.click();
  }
}

module.exports = new EmployeeProfilePage();
