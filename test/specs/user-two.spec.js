const HomePage = require('../pageobjects/home.page');
const RegisterPage = require('../pageobjects/register.page');

describe('We register as empty user, following the steps to a successfull registration', () => {
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
  it('Clicking the *Register* button should lead us to the Register Page', async () => {
    await HomePage.registerBtn.click();
    await expect(RegisterPage.titleHead).toBeDisplayed();
    await expect(RegisterPage.title).toBeDisplayed();
    await expect(RegisterPage.copyrightText).toBeDisplayed();
    await expect(RegisterPage.firstNameLabel).toBeDisplayed();
    await expect(RegisterPage.lastNameLabel).toBeDisplayed();
    await expect(RegisterPage.phoneLabel).toBeDisplayed();
    await expect(RegisterPage.emailLabel).toBeDisplayed();
    await expect(RegisterPage.passwordLabel).toBeDisplayed();
    await expect(RegisterPage.activeLabel).toBeDisplayed();
    await expect(RegisterPage.facebookIconHead).toBeClickable();
    await expect(RegisterPage.twitterIconHead).toBeClickable();
    await expect(RegisterPage.instagramIconHead).toBeClickable();
    await expect(RegisterPage.trackgenixTitle).toBeClickable();
    await expect(RegisterPage.trackgenixFooter).toBeClickable();
  });
  it('Filling the fieldsets in a wrong way and pressing the *Submit* button should let the user register properly', async () => {
    await RegisterPage.completeFormT('', '', '', 'wronggmail.com', '1015');
    await RegisterPage.submitBtn.click();
    await expect(RegisterPage.firstNameInput).toHaveClass('input_errorRed__1jLFP');
    await expect(RegisterPage.lastNameInput).toHaveClass('input_errorRed__1jLFP');
    await expect(RegisterPage.phoneInput).toHaveClass('input_errorRed__1jLFP');
    await expect(RegisterPage.emailInput).toHaveClass('input_errorRed__1jLFP');
    await expect(RegisterPage.passwordInput).toHaveClass('input_errorRed__1jLFP');
  });
  it('Clicking the *Reset Form* should empty all the fieldsets', async () => {
    await RegisterPage.resetBtn.click();
    await expect(RegisterPage.firstNameInput).toHaveValue('');
    await expect(RegisterPage.lastNameInput).toHaveValue('');
    await expect(RegisterPage.phoneInput).toHaveValue('');
    await expect(RegisterPage.emailInput).toHaveValue('');
    await expect(RegisterPage.passwordInput).toHaveValue('');
  });
});
