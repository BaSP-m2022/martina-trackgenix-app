class SuperAdminSAPage {
  get title() {
    return $('.table_title__1NxMn');
  }
  get idLabel() {
    return $('#id');
  }
  get firstNameLabel() {
    return $('#firstName');
  }
  get lastNameLabel() {
    return $('#lastName');
  }
  get emailLabel() {
    return $('#email');
  }
  get passwordLabel() {
    return $('#password');
  }
  get addBtn() {
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
  get deleteOptionFour() {
    return $(
      '#root > div > div > section > div > table > tbody > tr:nth-child(4) > td:nth-child(7) > button'
    );
  }
  get listedObjectOne() {
    return $('#root > div > div > section > div > table > tbody > tr:nth-child(1)');
  }
  get firstNameInput() {
    return $(
      '#root > div > div > section > div.superAdminForm_container__2maz7 > div > form > div.superAdminForm_inputContainer__bjWop > div:nth-child(1) > input'
    );
  }
  get lastNameInput() {
    return $(
      '#root > div > div > section > div.superAdminForm_container__2maz7 > div > form > div.superAdminForm_inputContainer__bjWop > div:nth-child(2) > input'
    );
  }
  get phoneInput() {
    return $(
      '#root > div > div > section > div.superAdminForm_container__2maz7 > div > form > div.superAdminForm_inputContainer__bjWop > div:nth-child(3) > input'
    );
  }
  get emailInput() {
    return $(
      '#root > div > div > section > div.superAdminForm_container__2maz7 > div > form > div.superAdminForm_inputContainer__bjWop > div:nth-child(4) > input'
    );
  }
  get passwordInput() {
    return $(
      '#root > div > div > section > div.superAdminForm_container__2maz7 > div > form > div.superAdminForm_inputContainer__bjWop > div:nth-child(5) > input'
    );
  }
  get activeInputTrue() {
    return $(
      '#root > div > div > section > div.superAdminForm_container__2maz7 > div > form > div.input_container__1hDPK > div > input[type=radio]:nth-child(2)'
    );
  }
  get activeInputFalse() {
    return $(
      '#root > div > div > section > div.superAdminForm_container__2maz7 > div > form > div.input_container__1hDPK > div > input[type=radio]:nth-child(4)'
    );
  }
  get sumbitBtn() {
    return $(
      '#root > div > div > section > div.superAdminForm_container__2maz7 > div > div > button:nth-child(1)'
    );
  }
  get resetFormBtn() {
    return $(
      '#root > div > div > section > div.superAdminForm_container__2maz7 > div > div > button:nth-child(2)'
    );
  }
  get closeBtn() {
    return $(
      '#root > div > div > section > div.superAdminForm_container__2maz7 > div > div > button:nth-child(3)'
    );
  }
  get addSuccess() {
    return $('.modal_content__c81Ni');
  }
  get successClose() {
    return $('#root > div > div > section > div.modal_shade__iOVq8 > div > button');
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

module.exports = new SuperAdminSAPage();
