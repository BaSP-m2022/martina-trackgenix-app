/* eslint-disable no-undef */
class login {
  get form() {
    return $('#root > div > section > div');
  }
  get formTitle() {
    return $('#root > div > section > div > h2');
  }
  get firstInput() {
    return $('#root > div > section > div > form > div:nth-child(1) > div > input');
  }
  get emailInputTitle() {
    return $('#root > div > section > div > form > div:nth-child(1) > div > label');
  }
  get secondInput() {
    return $('#root > div > section > div > form > div:nth-child(2) > div > input');
  }
  get passwordInputTitle() {
    return $('#root > div > section > div > form > div:nth-child(2) > div > label');
  }
  get btnLogin() {
    return $('#root > div > section > div > div > button:nth-child(2)');
  }
  get btnClose() {
    return $('#root > div > section > div > div > button:nth-child(1)');
  }
  get errorMsgEmail() {
    return $('#root > div > section > div > form > div:nth-child(1) > div > p');
  }
  get errorMsgPassword() {
    return $('#root > div > section > div > form > div:nth-child(2) > div > p');
  }
  async setEmail(email) {
    await this.firstInput.setValue(email);
  }
  async setPassword(password) {
    await this.secondInput.setValue(password);
  }
  async register(email, password) {
    await this.setEmail(email);
    await this.setPassword(password);
    await this.btnLogin.click();
    browser.pause(3000);
  }
}

module.exports = new login();
