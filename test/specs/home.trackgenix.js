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
  /* it('Wait for nav: logo, trackgenix, rutes', async () => {
    await expect(HomePage.nav).toBeDisplayed();
    await expect(HomePage.navTitle).toHaveText('TrackGENIX');
    await expect(HomePage.navRutes).toBeDisplayed();
    await expect(HomePage.navFirstRute).toHaveText('Login');
    await expect(HomePage.navSecondRute).toHaveText('Sign Up');
  });
  it('Nav btns to be clickable', async () => {
    await expect(HomePage.navTitle).toBeClickable();
    await expect(HomePage.navFirstRute).toBeClickable();
    await expect(HomePage.navSecondRute).toBeClickable();
  }); */
  it('Wait for bodyHome: Wellcome', async () => {
    await expect(HomePage.containerHome).toBeDisplayed();
    await expect(HomePage.wellcome).toBeDisplayed();
    //logo:
    /* await expect(HomePage.logoTrackgenix).toHaveAttrContaining('src', '/static/media/logoTrackgenix.22b0790b.png'); */
  });
  it('Wait for footer', async () => {
    await expect(HomePage.footer).toBeDisplayed();
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
