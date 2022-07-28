/* eslint-disable no-undef */
class superAdmin {
  get listAdmin() {
    return $('#root > div > section > div');
  }
  get listTitle() {
    return $('#root > div > section > div > h2');
  }
  get table() {
    return $('#root > div > section > div > table');
  }
  get titleTable() {
    return $('#root > div > section > div > table > thead > tr');
  }
  get firstNameColumn() {
    return $('#root > div > section > div > table > thead > tr > th:nth-child(1)');
  }
  get lastNameColumn() {
    return $('#root > div > section > div > table > thead > tr > th:nth-child(2)');
  }
  get phoneColumn() {
    return $('#root > div > section > div > table > thead > tr > th:nth-child(3)');
  }
  get emailColumn() {
    return $('#root > div > section > div > table > thead > tr > th:nth-child(4)');
  }
  get adminUser() {
    return $('#root > div > section > div > table > tbody > tr:nth-child(1)');
  }
}
module.exports = new superAdmin();
