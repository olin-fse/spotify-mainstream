const chai = require('chai');
const chaiWebdriver = require('chai-webdriverio').default;
chai.use(chaiWebdriver(browser));
const expect = chai.expect;

const port = process.env.PORT || 'http://localhost:3000';

let email;
let password;

if (!process.env.spotify_test_email) {
  let keys = require('../../config/api_keys.secret.json');
  email = keys.spotify_test_email;
  password = keys.spotify_test_password;
} else {
  email = process.env.spotify_test_email;
  password = process.env.spotify_test_password;
}

describe('spotify-mainstream!', function() {
  beforeEach(function () {
    browser.url(port);
    browser.setViewportSize({
      width: 1024,
      height: 1024
    });
  });

  it('should resize the current viewport', async function () {
    var windowSize = browser.windowHandleSize();
    console.log(windowSize.value);
  });

  it('renders app without crashing', async function() {
    console.log(browser.getSource());
    expect('.App').to.be.visible();
  });

  it('login flow with spotify auth works correctly and playlist can be created', async function() {
    browser.click('.login-user');
    browser.click('a=Log in to Spotify');
    browser.setValue('input[name="username"]', email);
    browser.setValue('input[name="password"]', password);
    browser.click('button=Log In');
    browser.pause(2000);
    expect(browser.getText('.welcome-message')).to.equal('Hello, Test!');
    browser.click('li=Keenan Zucker');
    browser.click('button=Create a Playlist with these friends!');
    browser.waitForText('.tracklist', 1000);
    expect('.track').to.have.count(3);
  })
});