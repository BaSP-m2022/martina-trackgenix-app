class SuperAdminEmployeePage {
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
  get emailLabel() {
    return $('#root > div > div > section > div > table > thead > tr > th:nth-child(4)');
  }
  get passwordLabel() {
    return $('#root > div > div > section > div > table > thead > tr > th:nth-child(5)');
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
      '#root > div > div > section > div.employeeForm_container__RUHtZ > form > div:nth-child(2) > input'
    );
  }
  get lastNameInput() {
    return $(
      '#root > div > div > section > div.employeeForm_container__RUHtZ > form > div:nth-child(3) > input'
    );
  }
  get phoneInput() {
    return $(
      '#root > div > div > section > div.employeeForm_container__RUHtZ > form > div:nth-child(4) > input'
    );
  }
  get emailInput() {
    return $(
      '#root > div > div > section > div.employeeForm_container__RUHtZ > form > div:nth-child(5) > input'
    );
  }
  get passwordInput() {
    return $(
      '#root > div > div > section > div.employeeForm_container__RUHtZ > form > div:nth-child(6) > input'
    );
  }
  get activeInputTrue() {
    return $(
      '#root > div > div > section > div.employeeForm_container__RUHtZ > form > div:nth-child(7) > div > input[type=radio]:nth-child(2)'
    );
  }
  get activeInputFalse() {
    return $(
      '#root > div > div > section > div.employeeForm_container__RUHtZ > form > div:nth-child(7) > div > input[type=radio]:nth-child(4)'
    );
  }
  get sumbitBtn() {
    return $(
      '#root > div > div > section > div.employeeForm_container__RUHtZ > div > button:nth-child(1)'
    );
  }
  get resetFormBtn() {
    return $(
      '#root > div > div > section > div.employeeForm_container__RUHtZ > div > button:nth-child(2)'
    );
  }
  get closeBtn() {
    return $(
      '#root > div > div > section > div.employeeForm_container__RUHtZ > div > button:nth-child(3)'
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

module.exports = new SuperAdminEmployeePage();
