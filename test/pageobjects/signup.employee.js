/* eslint-disable no-undef */
class signupEmployee {
  get bodySignup() {
    return $('#root > div > div');
  }
  get navSignUp() {
    return $('#root > div > div > nav');
  }
  get trackgenixNav() {
    return $('#root > div > div > nav > a');
  }
  get navBarRutes() {
    return $('#root > div > div > nav > ul');
  }
  get formSignup() {
    return $('section > div > form > div:nth-child(1) > div');
  }
  get firtName() {
    return $('section > div > form > div:nth-child(1) > div');
  }
  get lastName() {
    return $('section > div > form > div:nth-child(2) > div');
  }
  get phone() {
    return $('section > div > form > div:nth-child(3) > div');
  }
  get email() {
    return $('section > div > form > div:nth-child(4) > div');
  }
  get password() {
    return $('section > div > form > div:nth-child(5) > div');
  }
  get InputFirtName() {
    return $('div:nth-child(1) > div > input');
  }
  get InputLastName() {
    return $('div:nth-child(2) > div > input');
  }
  get InputPhone() {
    return $('div:nth-child(3) > div > input');
  }
  get InputEmail() {
    return $('div:nth-child(4) > div > input');
  }
  get InputPassword() {
    return $('div:nth-child(5) > div > input');
  }
  get btnRegister() {
    return $('button:nth-child(1)');
  }
  get activeStatus() {
    return $('div:nth-child(6) > div > div');
  }
  get trueStatus() {
    return $('input[type=radio]:nth-child(2)');
  }
  get falseStatus() {
    return $('input[type=radio]:nth-child(4)');
  }
  get msgNameEmpty() {
    return $('div:nth-child(1) > div > p');
  }
  get msgLastnameEmpty() {
    return $('div:nth-child(2) > div > p');
  }
  get msgPhoneEmpty() {
    return $('div:nth-child(3) > div > p');
  }
  get msgEmailEmpty() {
    return $('div:nth-child(4) > div > p');
  }
  get msgPassword() {
    return $('div:nth-child(5) > div > p');
  }
  get msgErrorStatus() {
    return $('div:nth-child(6) > div > p');
  }
  get modalRegisterSuccessfully() {
    return $('#root > div > div > section > div.modal_shade__iOVq8 > div > div');
  }
  get btnConfirmRegister() {
    return $('#root > div > div > section > div.modal_shade__iOVq8 > div > div > button');
  }
  get btnXExit() {
    return $('#root > div > div > section > div.modal_shade__iOVq8 > div > button');
  }
  get btnNavEmployee() {
    return $('#root > div > div > nav > ul > li:nth-child(3) > a');
  }
  get btnDeleteLastChild() {
    return $(
      '#root > div > div > section > div > table > tbody > tr:last-child > td:nth-child(7) > button'
    );
  }
  async setFirstName(firstName) {
    await this.InputFirtName.setValue(firstName);
  }
  async setLastName(lastName) {
    await this.InputLastName.setValue(lastName);
  }
  async setPhone(phone) {
    await this.InputPhone.setValue(phone);
  }
  async setEmail(email) {
    await this.InputEmail.setValue(email);
  }
  async setPassword(password) {
    await this.InputPassword.setValue(password);
  }
  async clickTrue() {
    await this.trueStatus.click();
    browser.pause(2000);
  }
  async clickFalse() {
    await this.falseStatus.click();
    browser.pause(2000);
  }
  async register(firstName, lastName, phone, email, password) {
    await this.setFirstName(firstName);
    await this.setLastName(lastName);
    await this.setPhone(phone);
    await this.setEmail(email);
    await this.setPassword(password);
    await this.clickTrue;
    await this.btnRegister.click();
    browser.pause(4000);
  }
  async clickConfirmRegister() {
    await this.btnConfirmRegister.click();
    browser.pause(3000);
  }
  async clickNavEmployee() {
    await this.btnNavEmployee.click();
    browser.pause(2000);
  }
  async clickDeleteEmployee() {
    await this.btnDeleteLastChild.click();
    browser.pause(2000);
  }
}
module.exports = new signupEmployee();
