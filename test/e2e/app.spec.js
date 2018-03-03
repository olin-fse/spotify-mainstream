const chai = require('chai');
const chaiWebdriver = require('chai-webdriverio').default;
chai.use(chaiWebdriver(browser));
const expect = chai.expect;
const keys = require('../../config/api_keys.secret.json');
const email = process.env.spotify_test_email || keys.spotify_test_email;
const password = process.env.spotify_test_password || keys.spotify_test_password;

describe('spotify-mainstream!', function() {
  beforeEach(function () {
    browser.url('http://localhost:3000');
  });

  it('renders app without crashing', async function() {
    expect('.App').to.be.visible();
  });

  it('login flow with spotify auth works correctly with test user', async function() {
    browser.click('.login-user');
    browser.click('a=Log in to Spotify');
    browser.setValue('input[name="username"]', email);
    browser.setValue('input[name="password"]', password);
    browser.click('button=Log In');
    browser.pause(1000);
    expect(browser.getText('.welcome-message')).to.equal('Hello, Test!');
  })
});
