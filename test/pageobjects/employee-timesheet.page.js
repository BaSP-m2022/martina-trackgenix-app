const EmployeeProjectsPage = require('./employee-projects.page');

class EmployeeTimeSheetPage extends EmployeeProjectsPage {
  get addTSBtn() {
    return $('#root > div > div > section > button');
  }
}

module.exports = new EmployeeTimeSheetPage();
