/* eslint-disable no-unused-vars */
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
  it('espero que el input tengan su titulo', async () => {
    await expect(SignupEmployee.firtName).toHaveText('First Name');
    await expect(SignupEmployee.lastName).toHaveText('Last Name');
    await expect(SignupEmployee.phone).toHaveText('Phone');
    await expect(SignupEmployee.email).toHaveText('Email');
    await expect(SignupEmployee.password).toHaveText('Password');
  });
  it('Wait for footer', async () => {
    await expect(HomePage.footer).toBeDisplayed();
  });
});
