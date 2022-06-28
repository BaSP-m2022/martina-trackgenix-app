const SuperAdminAdminPage = require('./superadmin-admin.page');

class SuperAdminEmployeePage extends SuperAdminAdminPage {
  get addEmployeeBtn() {
    return $('#root > div > div > section > button');
  }
}

module.exports = new SuperAdminEmployeePage();
