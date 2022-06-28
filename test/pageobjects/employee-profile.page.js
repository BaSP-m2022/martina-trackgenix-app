const EmployeeHomePage = require('./employee-home.page');

class EmployeeProfilePage extends EmployeeHomePage {
  get ProfileHead() {
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
