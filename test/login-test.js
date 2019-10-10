const electron = require("electron");
const Application = require("spectron").Application;
const assert = require("assert");
const describe = require("mocha").describe;
const afterEach = require("mocha").afterEach;
const it = require("mocha").it;
const beforeEach = require("mocha").beforeEach;
const globals = require("./global-setup");

var appPath = "./dist_electron/bundled/background.js";

describe("Login", function() {
  globals;
  // Runs before each test starts, starts the application
  beforeEach(function() {
    this.app = new Application({
      path: electron,
      args: [appPath],
      startTimeout: 10000,
      waitTimeout: 10000
    });
    this.timeout(10000);
    return this.app.start();
  });

  beforeEach(function() {
    if (!this.app.client.isExisting("#Forum")) {
      this.app.client.element("#Menu").click();
    }
    return this.app.client
      .element("#Forum")
      .click()
      .waitUntilTextExists("h1", "Forums", 10000);
  });

  //   Runs after each test completes, stops the application
  afterEach(function() {
    if (this.app && this.app.isRunning()) {
      this.timeout(10000);
      return this.app.stop();
    }
  });

  it("Enter Correct Details", function() {
    this.timeout(10000);
    return this.app.client
      .element('//*[@id="Login"]')
      .click()
      .setValue('//*[@id="username-login"]', "Mathews65")
      .setValue('//*[@id="password-login"]', "password")
      .click('//*[@id="button-login"]')
      .element('//*[@id="new-post"]/div/div/h3')
      .isVisible()
      .then(function(visible) {
        assert.equal(visible, true);
      });
  });

  it("Enter incorrect usename Details", function() {
    this.timeout(10000);
    return this.app.client
      .element('//*[@id="Login"]')
      .click()
      .setValue('//*[@id="username-login"]', "test")
      .setValue('//*[@id="password-login"]', "password")
      .click('//*[@id="button-login"]')
      .element('//*[@id="error-login"]')
      .isVisible()
      .then(function(visible) {
        assert.equal(visible, true);
      });
  });

  it("Enter incorrect password Details", function() {
    this.timeout(10000);
    return this.app.client
      .element('//*[@id="Login"]')
      .click()
      .setValue('//*[@id="username-login"]', "Mathews65")
      .setValue('//*[@id="password-login"]', "wrong123")
      .click('//*[@id="button-login"]')
      .element('//*[@id="error-login"]')
      .isVisible()
      .then(function(visible) {
        assert.equal(visible, true);
      });
  });

  it("Enter no Details", function() {
    this.timeout(10000);
    return this.app.client
      .element('//*[@id="Login"]')
      .click()
      .setValue('//*[@id="username-login"]', "")
      .setValue('//*[@id="password-login"]', "")
      .click('//*[@id="button-login"]')
      .element('//*[@id="error-login"]')
      .isVisible()
      .then(function(visible) {
        assert.equal(visible, true);
      });
  });

  it("logout", function() {
    this.timeout(10000);
    let test = this.app.client
      .click('//*[@id="Login"]')
      .setValue('//*[@id="username-login"]', "Mathews65")
      .setValue('//*[@id="password-login"]', "password")
      .click('//*[@id="button-login"]')
      .waitUntilTextExists(
        '//*[@id="new-post"]/div/div/h3',
        "Got Something To Add?"
      )
      .click('//*[@id="Logout"]')
      .isVisible('//*[@id="new-post"]/div/div/h3');
    return test.then(function(visible) {
      assert.equal(visible, false);
    });
  });
});
