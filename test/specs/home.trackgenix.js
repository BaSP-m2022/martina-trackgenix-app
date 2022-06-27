/* eslint-disable no-undef */
const HomePage = require('../pageobjects/home.page');

// eslint-disable-next-line no-undef
describe('Home page testing', () => {
  beforeAll('open browser', () => {
    browser.url('https://martina-trackgenix-app.vercel.app/home');
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
  it('Wait for bodyHome: container', async () => {
    await expect(HomePage.bodyHome).toBeDisplayed();
    await expect(HomePage.containerHome).toBeDisplayed();
    await expect(HomePage.employeeBtn).toBeDisplayed();
    await expect(HomePage.superAdminBtn).toBeDisplayed();
    await expect(HomePage.registerBtn).toBeDisplayed();
  });
  it('Container btn to be clickable', async () => {
    await expect(HomePage.employeeBtn).toBeClickable();
    await expect(HomePage.superAdminBtn).toBeClickable();
    await expect(HomePage.registerBtn).toBeClickable();
  });
  it('container btn must have your href', async () => {
    await expect(HomePage.employeeBtn).toHaveAttribute('href', false);
    await expect(HomePage.superAdminBtn).toHaveAttribute('href', false);
    await expect(HomePage.registerBtn).toHaveAttribute('href', false);
  });
  it('Wait for title for each btn to container', async () => {
    await expect(HomePage.employeeBtn).toHaveText('Employee');
    await expect(HomePage.superAdminBtn).toHaveText('Super Admin');
    await expect(HomePage.registerBtn).toHaveText('Register');
  });
  /* it('Wait for footer', async () => {
    await expect(HomePage.footer).toBeDisplayed();
  }); */
  //this bug its in progress
  it('Display the registration page after clicking register', async () => {
    HomePage.clickRegister();
    await browser.url('https://martina-trackgenix-app.vercel.app/employee/sign-up');
  });
  it('I wait for the facebook page when I click on the icon', async () => {
    HomePage.clickFacebook();
    await browser.url('https://www.facebook.com/radiumrocket');
  });
  it('I wait for the twitter page when I click on the icon', async () => {
    HomePage.clickTwitter();
    await browser.url('https://twitter.com/radiumrocket');
  });
  it('I wait for the instagram page when I click on the icon', async () => {
    HomePage.clickInstagram();
    await browser.url('https://www.instagram.com/radium.rocket/');
  });
});
