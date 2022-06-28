const HomePage = require('../pageobjects/home.page');
const EmployeeHomePage = require('../pageobjects/employee-home.page');
const EmployeeProfilePage = require('../pageobjects/employee-profile.page');
const EmployeeProjectsPage = require('../pageobjects/employee-projects.page');

describe('We enter the Employee section, try to register as Robert and check the projects section', () => {
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
  it('Clicking the *Employee* button should lead to the Employee Homepage', async () => {
    await HomePage.employeeBtn.click();
    await expect(EmployeeHomePage.welcomeContent).toBeDisplayed();
    await expect(EmployeeHomePage.copyrightText).toBeDisplayed();
    await expect(EmployeeHomePage.timeSheetsHead).toBeClickable();
  });
  it('Clicking the *Profile* button should lead to the Employee Profile page', async () => {
    await EmployeeHomePage.profileHead.click();
    await expect(EmployeeProfilePage.titleHead).toBeDisplayed();
    await expect(EmployeeProfilePage.firstNameLabel).toBeDisplayed();
    await expect(EmployeeProfilePage.closeBtn).toBeClickable();
  });
  it('User should be able to fill the form', async () => {
    await EmployeeProfilePage.completeFormF(
      'Robert',
      'Niro',
      '155445684',
      'robbie@outlook.com',
      '0123456789a'
    );
    await expect(EmployeeProfilePage.firstNameFieldset).toHaveValue('Robert');
    await expect(EmployeeProfilePage.lastNameFieldset).toHaveValue('Niro');
    await expect(EmployeeProfilePage.phoneFieldset).toHaveValue('155445684');
    await expect(EmployeeProfilePage.emailFieldset).toHaveValue('robbie@outlook.com');
    await expect(EmployeeProfilePage.passwordFieldset).toHaveValue('0123456789a');
  });
  it('If the user clicks the *Reset Form* button, the form should become empty', async () => {
    await EmployeeProfilePage.resetBtn.click();
    await EmployeeProfilePage.resetBtn.click();
    await expect(EmployeeProfilePage.firstNameFieldset).toHaveValue('');
    await expect(EmployeeProfilePage.lastNameFieldset).toHaveValue('');
    await expect(EmployeeProfilePage.phoneFieldset).toHaveValue('');
    await expect(EmployeeProfilePage.emailFieldset).toHaveValue('');
    await expect(EmployeeProfilePage.passwordFieldset).toHaveValue('');
  });
  it('Clicking the *Projects* button should lead to the Projects page of the employee', async () => {
    await EmployeeProfilePage.projectsHead.click();
    await expect(EmployeeProjectsPage.idLabel).toBeDisplayed();
    await expect(EmployeeProjectsPage.roleLabel).toBeDisplayed();
    await expect(EmployeeProjectsPage.projectNameLabel).toBeDisplayed();
    await expect(EmployeeProjectsPage.clientLabel).toBeDisplayed();
    await expect(EmployeeProjectsPage.startDateLabel).toBeDisplayed();
    await expect(EmployeeProjectsPage.finishDateLabel).toBeDisplayed();
    await expect(EmployeeProjectsPage.pageIndex).toBeDisplayed();
    await expect(EmployeeProjectsPage.nextBtn).toBeClickable();
    await expect(EmployeeProjectsPage.previousBtn).toBeClickable();
  });
  it('Clicking the *Trackgenix* header should return the user to the homepage', async () => {
    await EmployeeProjectsPage.trackgenixTitle.click();
    await expect(HomePage.homeBtn).toBeDisplayed();
  });
});
