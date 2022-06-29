const SuperAdminHomePage = require('../pageobjects/superadmin-home.page');
const SuperAdminAdminPage = require('../pageobjects/superadmin-admin.page');
const SuperAdminSAPage = require('../pageobjects/superadmin-sa.page');
const SuperAdminEmployeePage = require('../pageobjects/superadmin-employee.page');
const HomePage = require('../pageobjects/home.page');

describe('We enter the SuperAdmin section and check the admins, employees and superadmins sections', () => {
  beforeAll('Open browser', () => {
    browser.url('https://martina-trackgenix-b9dsg8a3w-basp-m2022.vercel.app/home');
  });
  it('Header objects should display correctly', async () => {
    await expect(HomePage.titleHead).toBeDisplayed();
  });
  it('Header objects should be clickable', async () => {
    await expect(HomePage.facebookIconHead).toBeClickable();
    await expect(HomePage.twitterIconHead).toBeClickable();
    await expect(HomePage.instagramIconHead).toBeClickable();
  });
  it('Header objects should be linked correctly', async () => {
    await expect(HomePage.faceLinkHead).toHaveLink('https://www.facebook.com/radiumrocket');
    await expect(HomePage.twitLinkHead).toHaveLink('https://twitter.com/radiumrocket');
    await expect(HomePage.instaLinkHead).toHaveLink('https://www.instagram.com/radium.rocket/');
  });
  it('Main objects should display correctly', async () => {
    await expect(HomePage.homeBtn).toBeDisplayed();
  });
  it('Main objects should be clickable', async () => {
    await expect(HomePage.employeeBtn).toBeClickable();
    await expect(HomePage.superAdminBtn).toBeClickable();
    await expect(HomePage.registerBtn).toBeClickable();
  });
  it('Main objects should be linked correctly', async () => {
    await expect(HomePage.employeeLink).toHaveLink('/employee');
    await expect(HomePage.superAdminLink).toHaveLink('/super-admin');
    await expect(HomePage.registerLink).toHaveLink('/employee/sign-up');
  });
  it('Clicking the *SuperAdmin* button should lead to the Superadmin Homepage', async () => {
    await HomePage.superAdminBtn.click();
    await expect(SuperAdminHomePage.welcomeContent).toBeDisplayed();
    await expect(SuperAdminHomePage.copyrightText).toBeDisplayed();
    await expect(SuperAdminHomePage.taskFooter).toBeClickable();
  });
  it('Clicking the *Admins* button should lead to the Employee Profile page', async () => {
    await SuperAdminHomePage.adminsHead.click();
    await expect(SuperAdminAdminPage.title).toBeDisplayed();
    await expect(SuperAdminAdminPage.idLabel).toBeDisplayed();
    await expect(SuperAdminAdminPage.firstNameLabel).toBeDisplayed();
    await expect(SuperAdminAdminPage.lastNameLabel).toBeDisplayed();
    await expect(SuperAdminAdminPage.phoneLabel).toBeDisplayed();
    await expect(SuperAdminAdminPage.emailLabel).toBeDisplayed();
    await expect(SuperAdminAdminPage.dateLabel).toBeDisplayed();
    await expect(SuperAdminAdminPage.previousBtn).toBeClickable();
    await expect(SuperAdminAdminPage.nextBtn).toBeClickable();
  });
  it('Clicking the *Add New Admin* button should display a modal that lets the user fill a new admin', async () => {
    await SuperAdminAdminPage.addAdminBtn.click();
    await SuperAdminAdminPage.completeFormT(
      'Lucas',
      'Lauriente',
      '151555487',
      'lucascapo@hotmail.com',
      '1234abcdefg'
    );
    await expect(SuperAdminAdminPage.addSuccess).toBeDisplayed();
    await SuperAdminAdminPage.successClose.click();
  });
  it('User should be able to edit or delete an admin', async () => {
    await SuperAdminAdminPage.editOptionOne.click();
    await SuperAdminAdminPage.completeFormT(
      'María',
      'Laura',
      '151555557',
      'lauraeme@hotmail.com',
      '12ssd654g'
    );
    await expect(SuperAdminAdminPage.addSuccess).toBeDisplayed();
    await SuperAdminAdminPage.successClose.click();
    await expect(SuperAdminAdminPage.deleteOptionFive).toBeDisplayed();
  });
  it('Clicking the *SuperAdmins* button should lead the user to the superadmins list', async () => {
    await SuperAdminAdminPage.superAdminsHead.click();
    await expect(SuperAdminSAPage.title).toBeDisplayed();
    await expect(SuperAdminSAPage.idLabel).toBeDisplayed();
    await expect(SuperAdminSAPage.firstNameLabel).toBeDisplayed();
    await expect(SuperAdminSAPage.lastNameLabel).toBeDisplayed();
    await expect(SuperAdminSAPage.phoneLabel).toBeDisplayed();
    await expect(SuperAdminSAPage.emailLabel).toBeDisplayed();
    await expect(SuperAdminSAPage.dateLabel).toBeDisplayed();
  });
  it('Clicking the *Add New SuperAdmin* button should display a modal that lets the user fill a new admin', async () => {
    await SuperAdminSAPage.addAdminBtn.click();
    await SuperAdminSAPage.completeFormT(
      'Maura',
      'Isles',
      '151555487',
      'draisles@gmail.com',
      '1234abcdefg'
    );
    await expect(SuperAdminSAPage.addSuccess).toBeDisplayed();
    await SuperAdminSAPage.successClose.click();
  });
  it('User should be able to edit or delete a superadmin', async () => {
    await SuperAdminSAPage.editOptionOne.click();
    await SuperAdminSAPage.completeFormT(
      'Federico',
      'Ruan',
      '188772637',
      'feferuru@hotmail.com',
      '1587899sdwd'
    );
    await expect(SuperAdminSAPage.addSuccess).toBeDisplayed();
    await SuperAdminSAPage.successClose.click();
    await expect(SuperAdminSAPage.deleteOptionFour).toBeDisplayed();
  });
  it('Clicking the *Employees* button should lead the user to the employees list', async () => {
    await SuperAdminSAPage.superAdminsHead.click();
    await expect(SuperAdminEmployeePage.title).toBeDisplayed();
    await expect(SuperAdminEmployeePage.idLabel).toBeDisplayed();
    await expect(SuperAdminEmployeePage.firstNameLabel).toBeDisplayed();
    await expect(SuperAdminEmployeePage.lastNameLabel).toBeDisplayed();
    await expect(SuperAdminEmployeePage.phoneLabel).toBeDisplayed();
    await expect(SuperAdminEmployeePage.emailLabel).toBeDisplayed();
    await expect(SuperAdminEmployeePage.dateLabel).toBeDisplayed();
  });
  it('Clicking the *Add New Employee* button should display a modal that lets the user fill a new admin', async () => {
    await SuperAdminEmployeePage.addAdminBtn.click();
    await SuperAdminEmployeePage.completeFormT(
      'Jane',
      'Rizzoli',
      '151555487',
      'drrizolli@gmail.com',
      '1234abcdefg'
    );
    await expect(SuperAdminEmployeePage.addSuccess).toBeDisplayed();
    await SuperAdminEmployeePage.successClose.click();
  });
  it('User should be able to edit or delete an employee', async () => {
    await SuperAdminEmployeePage.editOptionOne.click();
    await SuperAdminEmployeePage.completeFormT(
      'Federico',
      'Ruan',
      '188772637',
      'feferuru@hotmail.com',
      '1587899sdwd'
    );
    await expect(SuperAdminEmployeePage.addSuccess).toBeDisplayed();
    await SuperAdminEmployeePage.successClose.click();
    await expect(SuperAdminEmployeePage.deleteOptionFour).toBeDisplayed();
  });
});
