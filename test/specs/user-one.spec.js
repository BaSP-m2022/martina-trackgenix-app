const HomePage = require('../pageobjects/home.page');
const RegisterPage = require('../pageobjects/register.page');

describe('We register with UserOne, following the steps to a successfull registration'),
  () => {
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
      await expect(HomePage.employeeLink).toHaveLink(
        'https://martina-trackgenix-b9dsg8a3w-basp-m2022.vercel.app/employee'
      );
      await expect(HomePage.superAdminLink).toHaveLink(
        'https://martina-trackgenix-b9dsg8a3w-basp-m2022.vercel.app/super-admin'
      );
      await expect(HomePage.registerLink).toHaveLink(
        'https://martina-trackgenix-b9dsg8a3w-basp-m2022.vercel.app/employee/sign-up'
      );
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
    it('Filling the fieldsets correctly and pressing the *Submit* button should let the user register properly', async () => {
      await RegisterPage.completeFormT(
        'Cristian',
        'Alcober',
        '3415906587',
        'cristianalc@gmail.com',
        'Babana1015'
      );
      await RegisterPage.submitBtn.click();
      await expect(RegisterPage.firstNameInput).not.toHaveClass('input_errorRed__1jLFP');
      await expect(RegisterPage.lastNameInput).not.toHaveClass('input_errorRed__1jLFP');
      await expect(RegisterPage.phoneInput).not.toHaveClass('input_errorRed__1jLFP');
      await expect(RegisterPage.emailInput).not.toHaveClass('input_errorRed__1jLFP');
      await expect(RegisterPage.passwordInput).not.toHaveClass('input_errorRed__1jLFP');
    });
  };
