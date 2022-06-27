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
    return $('form > div:nth-child(1) > div > input');
  }
  get InputLastName() {
    return $('form > div:nth-child(2) > div > input');
  }
  get InputPhone() {
    return $('form > div:nth-child(3) > div > input');
  }
  get InputEmail() {
    return $('form > div:nth-child(3) > div > input');
  }
  get InputPassword() {
    return $('form > div:nth-child(4) > div > input');
  }
}
module.exports = new signupEmployee();
