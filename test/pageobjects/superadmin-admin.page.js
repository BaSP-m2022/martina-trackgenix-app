class SuperAdminAdminPage {
  get title() {
    return $('.table_title__1NxMn');
  }
  get idLabel() {
    return $('#root > div > div > section > div > table > thead > tr > th:nth-child(1)');
  }
  get firstNameLabel() {
    return $('#root > div > div > section > div > table > thead > tr > th:nth-child(2)');
  }
  get lastNameLabel() {
    return $('#root > div > div > section > div > table > thead > tr > th:nth-child(3)');
  }
  get phoneLabel() {
    return $('#root > div > div > section > div > table > thead > tr > th:nth-child(4)');
  }
  get emailLabel() {
    return $('#root > div > div > section > div > table > thead > tr > th:nth-child(5)');
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
  get addAdminBtn() {
    return $('#root > div > div > section > button');
  }
  get editOptionOne() {
    return $(
      '#root > div > div > section > div > table > tbody > tr:nth-child(1) > td:nth-child(6) > button'
    );
  }
  get editOptionTwo() {
    return $(
      '#root > div > div > section > div > table > tbody > tr:nth-child(2) > td:nth-child(6) > button'
    );
  }
  get editOptionThree() {
    return $(
      '#root > div > div > section > div > table > tbody > tr:nth-child(3) > td:nth-child(6) > button'
    );
  }
  get deleteOptionFour() {
    return $(
      '#root > div > div > section > div > table > tbody > tr:nth-child(4) > td:nth-child(7) > button'
    );
  }
  get deleteOptionFive() {
    return $(
      '#root > div > div > section > div > table > tbody > tr:nth-child(6) > td:nth-child(7) > button'
    );
  }
  get listedObjectOne() {
    return $('#root > div > div > section > div > table > tbody > tr:nth-child(1)');
  }
  get firstNameInput() {
    return $(
      '#root > div > div > section > div.adminForm_container__1obQ5 > form > div:nth-child(2) > input'
    );
  }
  get lastNameInput() {
    return $(
      '#root > div > div > section > div.adminForm_container__1obQ5 > form > div:nth-child(3) > input'
    );
  }
  get phoneInput() {
    return $(
      '#root > div > div > section > div.adminForm_container__1obQ5 > form > div:nth-child(4) > input'
    );
  }
  get emailInput() {
    return $(
      '#root > div > div > section > div.adminForm_container__1obQ5 > form > div:nth-child(5) > input'
    );
  }
  get passwordInput() {
    return $(
      '#root > div > div > section > div.adminForm_container__1obQ5 > form > div:nth-child(6) > input'
    );
  }
  get activeInputTrue() {
    return $(
      '#root > div > div > section > div.adminForm_container__1obQ5 > form > div:nth-child(7) > div > input[type=radio]:nth-child(2)'
    );
  }
  get activeInputFalse() {
    return $(
      '#root > div > div > section > div.adminForm_container__1obQ5 > form > div:nth-child(7) > div > input[type=radio]:nth-child(4)'
    );
  }
  get sumbitBtn() {
    return $(
      '#root > div > div > section > div.form_container__3l8hg > div > div > button:nth-child(1)'
    );
  }
  get resetFormBtn() {
    return $(
      '#root > div > div > section > div.form_container__3l8hg > div > div > button:nth-child(2)'
    );
  }
  get closeBtn() {
    return $(
      '#root > div > div > section > div.form_container__3l8hg > div > div > button:nth-child(3)'
    );
  }
  get addSuccess() {
    return $('.modal_content__c81Ni');
  }
  get successClose() {
    return $('#root > div > div > section > div.modal_shade__iOVq8 > div > button');
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
  get copyrightText() {
    return $('.footer_copyright__1FoOh');
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

  async completeFormT(name, lastName, phone, email, password) {
    await this.firstNameInput.setValue(name);
    await this.lastNameInput.setValue(lastName);
    await this.phoneInput.setValue(phone);
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
    await this.activeInputTrue.click();
  }

  async completeFormF(name, lastName, phone, email, password) {
    await this.firstNameInput.setValue(name);
    await this.lastNameInput.setValue(lastName);
    await this.phoneInput.setValue(phone);
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
    await this.activeInputFalse.click();
  }
}

module.exports = new SuperAdminAdminPage();
