const SuperAdminHomePage = require('./superadmin-home.page');

class SuperAdminAdminPage extends SuperAdminHomePage {
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
}

module.exports = new SuperAdminAdminPage();
