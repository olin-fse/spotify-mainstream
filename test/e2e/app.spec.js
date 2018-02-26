const chai = require('chai');
const chaiWebdriver = require('chai-webdriverio').default;
chai.use(chaiWebdriver(browser));
const expect = chai.expect;

describe('spotify-mainstream!', function() {
  beforeEach(function () {
    browser.url('http://localhost:3000');
  });

  it('renders app', async function() {
    expect('.App').to.be.visible();
  });
});