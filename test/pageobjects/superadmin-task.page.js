const SuperAdminHomePage = require('./superadmin-home.page');

class SuperAdminTSPage extends SuperAdminHomePage {
  get title() {
    return $('.table_title__1NxMn');
  }
  get idLabel() {
    return $('#id');
  }
  get descriptionLabel() {
    return $('#description');
  }
  get addBtn() {
    return $('#root > div > div > section > button');
  }
}

module.exports = new SuperAdminTSPage();
