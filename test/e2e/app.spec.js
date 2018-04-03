const chai = require('chai');
const chaiWebdriver = require('chai-webdriverio').default;
chai.use(chaiWebdriver(browser));
const expect = chai.expect;

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
    browser.url('http://localhost:5000');
    browser.setViewportSize({
      width: 2000,
      height: 1800
    });
  });

  it('renders app without crashing', async function() {
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
    browser.waitForVisible('li=Test', 7000);
    browser.click('li=Test');
    browser.click('button=Create a Playlist with these friends!');
    browser.waitForText('.tracklist', 1000);
    expect('.track').to.have.count(3);
  })
});
