const chai = require('chai');
const chaiWebdriver = require('chai-webdriverio').default;
chai.use(chaiWebdriver(browser));
const expect = chai.expect;
// TODO --> deal with thsi

const dotenv = require("dotenv");
const { error } = dotenv.config();

if (error) {
  throw error
} 

const email = process.env.spotify_test_email;
const password = process.env.spotify_test_password;

describe('spotify-mainstream!', function() {
  beforeEach(function () {
    browser.url('http://localhost:3000');
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
    browser.click('li=Keenan Zucker');
    browser.click('button=Create a Playlist with these friends!');
    browser.waitForText('.tracklist', 1000);
    expect('.track').to.have.count(3);
  })
});