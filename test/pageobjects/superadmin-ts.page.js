const SuperAdminHomePage = require('./superadmin-home.page');

class SuperAdminTSPage extends SuperAdminHomePage {
  get title() {
    return $('.table_title__1NxMn');
  }
  get idLabel() {
    return $('#id');
  }
  get employeeLabel() {
    return $('#employee');
  }
  get hoursWorkedLabel() {
    return $('#hs_worked');
  }
  get projectLabel() {
    return $('#project');
  }
  get taskLabel() {
    return $('#task');
  }
  get dateLabel() {
    return $('#timesheetDate');
  }
  get editLabel() {
    return $('#edit');
  }
  get deleteLabel() {
    return $('#delete');
  }
  get addBtn() {
    return $('#root > div > div > section > button');
  }
}

module.exports = new SuperAdminTSPage();
