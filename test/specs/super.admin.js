/* eslint-disable no-undef */
const HomePage = require('../pageobjects/home.page');
const Login = require('../pageobjects/login');
/* const SuperAdmin = require('../pageobjects/superAdmin'); */

describe('Test Super Admin', () => {
  beforeAll('Open browser', () => {
    browser.url('https://martina-trackgenix-app.vercel.app/auth/login');
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
  it('Wait for nav: logo, trackgenix, rutes', async () => {
    await expect(HomePage.nav).toBeDisplayed();
    //logo:
    /* await expect(HomePage.nav).toHaveAttrContaining('src', '/static/media/logoGreen.e4507c32.png'); */
    await expect(HomePage.navTitle).toHaveText('TrackGENIX');
    await expect(HomePage.navRutes).toBeDisplayed();
    await expect(HomePage.navFirstRute).toHaveText('Login');
    await expect(HomePage.navSecondRute).toHaveText('Sign Up');
  });
  it('Nav btns to be clickable', async () => {
    await expect(HomePage.navTitle).toBeClickable();
    await expect(HomePage.navFirstRute).toBeClickable();
    await expect(HomePage.navSecondRute).toBeClickable();
  });
  it('Wait for bodyHome: title, input and btns', async () => {
    await expect(Login.form).toBeDisplayed();
    await expect(Login.formTitle).toHaveText('Login');
    await expect(Login.firstInput).toBeDisplayed();
    await expect(Login.emailInputTitle).toHaveText('Email');
    await expect(Login.secondInput).toBeDisplayed();
    await expect(Login.passwordInputTitle).toHaveText('Password');
  });
  it('btnLogin and btnClose to be displayed and clickable', async () => {
    await expect(Login.btnLogin).toBeDisplayed();
    await expect(Login.btnLogin).toBeClickable();
    await expect(Login.btnClose).toBeDisplayed();
    await expect(Login.btnLogin).toBeClickable();
  });
  it('Display error message when input is empty', async () => {
    await Login.register('', '');
    await expect(Login.errorMsgEmail).toBeDisplayed();
    await expect(Login.errorMsgPassword).toBeDisplayed();
    await expect(Login.errorMsgEmail).toHaveText('This field is required');
    await expect(Login.errorMsgPassword).toHaveText('This field is required');
  });
  it('Display error message when inputs email and password are invalid', async () => {
    await Login.register('aaaaaa', 'a1');
    await expect(Login.errorMsgEmail).toBeDisplayed();
    await expect(Login.errorMsgPassword).toBeDisplayed();
    await expect(Login.errorMsgEmail).toHaveText('The email is invalid');
    await expect(Login.errorMsgPassword).toHaveText('Password is too short');
    await Login.register('luchito @gmail.com', 'aaaaaaa');
    await expect(Login.errorMsgEmail).toHaveText('The email is invalid');
    await expect(Login.errorMsgPassword).toHaveText('Password must contain letters and numbers');
    await Login.register('luchitogmail.com', '222222222');
    await expect(Login.errorMsgEmail).toHaveText('The email is invalid');
    await expect(Login.errorMsgPassword).toHaveText('Password must contain letters and numbers');
    await Login.register('luchito@gmail', '****////');
    await expect(Login.errorMsgEmail).toHaveText('The email is invalid');
    await expect(Login.errorMsgPassword).toHaveText('Password must contain letters and numbers');
  });
});
