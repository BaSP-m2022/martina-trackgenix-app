const SuperAdminHomePage = require('./superadmin-home.page');

class SuperAdminSAPage extends SuperAdminHomePage {
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
}

module.exports = new SuperAdminSAPage();
