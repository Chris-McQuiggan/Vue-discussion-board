const electron = require("electron");
const Application = require("spectron").Application;
const assert = require("assert");
const describe = require("mocha").describe;
const afterEach = require("mocha").afterEach;
const it = require("mocha").it;
const beforeEach = require("mocha").beforeEach;
const globals = require("./global-setup");

var appPath = "./dist_electron/bundled/background.js";

describe("Registration", function() {
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
      .click('//*[@id="Register"]')
      .setValue('//*[@id="username-register"]', "test")
      .setValue('//*[@id="password-register"]', "password")
      .setValue('//*[@id="confirmPassword-register"]', "password")
      .click('//*[@id="login"]/form/div/div[2]/div/div/div/div[1]/div/div[1]')
      .click('//*[@id="button-register"]')
      .isVisible('//*[@id="created-account"]')
      .then(function(visible) {
        assert.equal(visible, true);
      })
      .click('//*[@id="close-overlay"]')
      .isVisible('//*[@id="new-post"]/div/div/h3')
      .then(function(visible) {
        assert.equal(visible, true);
      })
      .isVisible('//*[@id="Logout"]')
      .then(function(visible) {
        assert.equal(visible, true);
      });
  });

  it("Enter incorrect usename Details", function() {
    this.timeout(10000);
    return this.app.client
      .click('//*[@id="Register"]')
      .setValue('//*[@id="username-register"]', "Mathews65")
      .setValue('//*[@id="password-register"]', "password")
      .setValue('//*[@id="confirmPassword-register"]', "password")
      .click('//*[@id="login"]/form/div/div[2]/div/div/div/div[1]/div/div[1]')
      .click('//*[@id="button-register"]')
      .isVisible('//*[@id="error-nonUser-register"]/div/div')
      .then(function(visible) {
        assert.equal(visible, true);
      });
  });

  it("Enter incorrect password Details", function() {
    this.timeout(10000);
    return this.app.client
      .click('//*[@id="Register"]')
      .setValue('//*[@id="username-register"]', "test")
      .setValue('//*[@id="password-register"]', "right123")
      .setValue('//*[@id="confirmPassword-register"]', "wrong987")
      .click('//*[@id="login"]/form/div/div[2]/div/div/div/div[1]/div/div[1]')
      .click('//*[@id="button-register"]')
      .isVisible('//*[@id="error-noMatch-register"]/div/div')
      .then(function(visible) {
        assert.equal(visible, true);
      });
  });

  //   it.only("Enter no agree Details", function() {
  //     this.timeout(10000);
  //     return this.app.client
  //       .element('//*[@id="Register"]')
  //       .click()
  //       .setValue('//*[@id="username-register"]', "test")
  //       .setValue('//*[@id="password-register"]', "right123")
  //       .setValue('//*[@id="confirmPassword-register"]', "right123")
  //       .element(
  //         ".v-btn v-btn--disabled v-btn--flat v-btn--text theme--dark v-size--default"
  //       )
  //       .isVisible();
  //   });
});
