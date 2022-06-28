const SuperAdminHomePage = require('./superadmin-home.page');

class SuperAdminProjectsPage extends SuperAdminHomePage {
  get projectsTitle() {
    return $('.table_title__1NxMn');
  }
  get idLabel() {
    return $('#root > div > div > section > div > table > thead > tr > th:nth-child(1)');
  }
  get roleLabel() {
    return $('#root > div > div > section > div > table > thead > tr > th:nth-child(2)');
  }
  get projectNameLabel() {
    return $('#root > div > div > section > div > table > thead > tr > th:nth-child(3)');
  }
  get clientLabel() {
    return $('#root > div > div > section > div > table > thead > tr > th:nth-child(4)');
  }
  get startDateLabel() {
    return $('#root > div > div > section > div > table > thead > tr > th:nth-child(5)');
  }
  get finishDateLabel() {
    return $('#root > div > div > section > div > table > thead > tr > th:nth-child(6)');
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
}

module.exports = new SuperAdminProjectsPage();
