const HomePage = require('../pageobjects/home.page');
const EmployeeHomePage = require('../pageobjects/employee-home.page');
const EmployeeTimeSheetPage = require('../pageobjects/employee-timesheet.page');

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
  it('Clicking the *Time-Sheets* button should lead to the Employee Profile page', async () => {
    await EmployeeHomePage.timeSheetsHead.click();
    await expect(EmployeeTimeSheetPage.titleHead).toBeDisplayed();
    await expect(EmployeeTimeSheetPage.idLabel).toBeDisplayed();
    await expect(EmployeeTimeSheetPage.employeeLabel).toBeDisplayed();
    await expect(EmployeeTimeSheetPage.hoursWorkedLabel).toBeDisplayed();
    await expect(EmployeeTimeSheetPage.projectLabel).toBeDisplayed();
    await expect(EmployeeTimeSheetPage.taskLabel).toBeDisplayed();
    await expect(EmployeeTimeSheetPage.dateLabel).toBeDisplayed();
    await expect(EmployeeTimeSheetPage.previousBtn).toBeClickable();
    await expect(EmployeeTimeSheetPage.nextBtn).toBeClickable();
  });
  it('Clicking the *Add a TimeSheets* button should open the modal for the user to fill a timesheet', async () => {
    await EmployeeTimeSheetPage.addTSBtn.click();
    await expect(EmployeeTimeSheetPage.timesheetTitle).toBeDisplayed();
  });
  it('User should be able to close the modal by clicking the *Close* button', async () => {
    await EmployeeTimeSheetPage.closeBtn.click();
    await expect(EmployeeTimeSheetPage.timesheetTitle).not.toBeDisplayed();
  });
  it('User should be able to fill the form and reset it with the *Reset Form* button', async () => {
    await EmployeeTimeSheetPage.addTSBtn.click();
    await EmployeeTimeSheetPage.hoursWorkedInput.setValue('8');
    await EmployeeTimeSheetPage.resetFormBtn.click();
    await EmployeeTimeSheetPage.resetFormBtn.click();
    await expect(EmployeeTimeSheetPage.hoursWorkedInput).toHaveValue('');
  });
  it('User should not be able to submit the form without filling all the fieldsets', async () => {
    await EmployeeTimeSheetPage.resetFormBtn.click();
    await EmployeeTimeSheetPage.resetFormBtn.click();
    await EmployeeTimeSheetPage.sumbitBtn.click();
    await expect(EmployeeTimeSheetPage.projectInput).toHaveClass('input_errorRed__1jLFP');
    await expect(EmployeeTimeSheetPage.taskInput).toHaveClass('input_errorRed__1jLFP');
    await expect(EmployeeTimeSheetPage.hoursWorkedInput).toHaveClass('input_errorRed__1jLFP');
    await expect(EmployeeTimeSheetPage.dateInput).toHaveClass('input_errorRed__1jLFP');
  });
});
