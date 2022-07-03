/* eslint-disable no-undef */
const HomePage = require('../pageobjects/home.page');
const SignupEmployee = require('../pageobjects/signup.employee');

describe('Sign up testing', () => {
  beforeAll('open browser', () => {
    browser.url('https://martina-trackgenix-app.vercel.app/employee/sign-up');
  }),
    it('Wait for header: title, socialRed', async () => {
      await expect(HomePage.headerHome).toBeDisplayed();
      await expect(HomePage.titleHome).toBeDisplayed();
      await expect(HomePage.titleHome).toHaveText('Radium Rocket');
      await expect(HomePage.socialRedHome).toBeDisplayed();
      await expect(HomePage.facebookSocialRed).toBeDisplayed();
      await expect(HomePage.twitterSocialRed).toBeDisplayed();
      await expect(HomePage.instagramSocialRed).toBeDisplayed();
    });
  it('SocialRed btn to be clickable', async () => {
    await expect(HomePage.facebookSocialRed).toBeClickable();
    await expect(HomePage.twitterSocialRed).toBeClickable();
    await expect(HomePage.instagramSocialRed).toBeClickable();
  });
  it('Each socialRed btn must have your image', async () => {
    await expect(HomePage.imgFacebook).toHaveAttrContaining('src', '/assets/images/facebook.svg');
    await expect(HomePage.imgTwitter).toHaveAttrContaining('src', '/assets/images/twitter.svg');
    await expect(HomePage.imgInstagram).toHaveAttrContaining('src', '/assets/images/instagram.svg');
  });
  it('Each socialRed btn must have your href', async () => {
    await expect(HomePage.facebookSocialRed).toHaveAttribute('href', false);
    await expect(HomePage.twitterSocialRed).toHaveAttribute('href', false);
    await expect(HomePage.instagramSocialRed).toHaveAttribute('href', false);
  });
  it('Wait for bodyHome: title, nav and formSignup', async () => {
    await expect(SignupEmployee.bodySignup).toBeDisplayed();
    await expect(SignupEmployee.trackgenixNav).toHaveAttribute('href', false);
    await expect(SignupEmployee.trackgenixNav).toHaveText('TrackGENIX');
    await expect(SignupEmployee.formSignup).toBeDisplayed();
  });
  it('I hope that each input has its title', async () => {
    await expect(SignupEmployee.firtName).toHaveText('First Name');
    await expect(SignupEmployee.lastName).toHaveText('Last Name');
    await expect(SignupEmployee.phone).toHaveText('Phone');
    await expect(SignupEmployee.email).toHaveText('Email');
    await expect(SignupEmployee.password).toHaveText('Password');
  });
  it('Wait for footer', async () => {
    await expect(HomePage.footer).toBeDisplayed();
  });
  it('status btn to be clickable', async () => {
    await expect(SignupEmployee.trueStatus).toBeClickable();
    await expect(SignupEmployee.falseStatus).toBeClickable();
  });
  it('Display error message when input is empty', async () => {
    await SignupEmployee.register('', '', '', '', '');
    SignupEmployee.clickTrue,
      await expect(SignupEmployee.msgNameEmpty).toHaveText('This field is required');
    await expect(SignupEmployee.msgLastnameEmpty).toHaveText('This field is required');
    await expect(SignupEmployee.msgPhoneEmpty).toHaveText('"phone" must be a number');
    await expect(SignupEmployee.msgEmailEmpty).toHaveText('This field is required');
    await expect(SignupEmployee.msgPassword).toHaveText('This field is required');
  });
  it('Display error message when input is invalid', async () => {
    await SignupEmployee.register(
      '123456',
      '123456',
      'shieley',
      'shirleyseaton@ hotmail.com',
      'asdfgsdfg'
    );
    SignupEmployee.clickTrue,
      await expect(SignupEmployee.msgNameEmpty).toHaveText('First Name must contain only letters');
    await expect(SignupEmployee.msgLastnameEmpty).toHaveText('Last Name must contain only letters');
    await expect(SignupEmployee.msgPhoneEmpty).toHaveText('"phone" must be a number');
    await expect(SignupEmployee.msgEmailEmpty).toHaveText('Invalid email');
    await expect(SignupEmployee.msgPassword).toHaveText(
      'Password must contain letters and numbers'
    );
  });
  it('Show error message when the input is short and email is misspelled', async () => {
    await SignupEmployee.register('sh', 'se', '0341', 'shirleyseatonhotmail.com', '123');
    SignupEmployee.clickTrue,
      await expect(SignupEmployee.msgNameEmpty).toHaveText('The name is too short');
    await expect(SignupEmployee.msgLastnameEmpty).toHaveText('Last name is too short');
    await expect(SignupEmployee.msgPhoneEmpty).toHaveText('Phone number must be 10 digits long');
    await expect(SignupEmployee.msgEmailEmpty).toHaveText('Invalid email');
    await expect(SignupEmployee.msgPassword).toHaveText('Password is too short');
  });
  it('Show error message when the password has only letters and the email is missing the .com', async () => {
    await SignupEmployee.register(
      'shirley',
      'seaton',
      '3413785590',
      'shirleyseaton@hotmail',
      'ssssssssss'
    );
    SignupEmployee.clickTrue,
      await expect(SignupEmployee.msgEmailEmpty).toHaveText('Invalid email');
    await expect(SignupEmployee.msgPassword).toHaveText(
      'Password must contain letters and numbers'
    );
  });
  it('Successful registration', async () => {
    SignupEmployee.clickTrue(),
      await SignupEmployee.register(
        'borrar',
        'employee',
        '3413785590',
        'borraemployee@hotmail.com',
        'borrar204'
      );
    SignupEmployee.clickConfirmRegister();
  });
  it('I find myself entering the employee profilescholartious registration', async () => {
    await browser.url('https://martina-trackgenix-app.vercel.app/employee/home');
  });
  it('I wait for the profile container', async () => {
    SignupEmployee.clickProfile();
    await expect(SignupEmployee.containerBody).toBeDisplayed();
  });
  it('I wait for the project container', async () => {
    SignupEmployee.clickProject();
    await expect(SignupEmployee.containerBody).toBeDisplayed();
  });
  it('I wait for the timeSheet container', async () => {
    SignupEmployee.clickProfile();
    await expect(SignupEmployee.containerBody).toBeDisplayed();
  });
  it('Delete Employee', async () => {
    await SignupEmployee.clickHomeTrackgenix();
    await browser.url('https://martina-trackgenix-app.vercel.app/home');
    await HomePage.clickSuperAdmin();
    await browser.url('https://martina-trackgenix-app.vercel.app/super-admin/home');
    await SignupEmployee.clickNavEmployee();
    await SignupEmployee.clickDeleteEmployee();
    browser.acceptAlert();
  });
});
