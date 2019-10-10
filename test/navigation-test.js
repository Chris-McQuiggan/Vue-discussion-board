const electron = require("electron");
const Application = require("spectron").Application;
const assert = require("assert");
const describe = require("mocha").describe;
const afterEach = require("mocha").afterEach;
const it = require("mocha").it;
const beforeEach = require("mocha").beforeEach;
const globals = require("./global-setup");

var appPath = "./dist_electron/bundled/background.js";

describe("Navigation", function() {
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
  });

  //   Runs after each test completes, stops the application
  afterEach(function() {
    if (this.app && this.app.isRunning()) {
      this.timeout(10000);
      return this.app.stop();
    }
  });

  // Tests that can navigate to home
  it("navigates to Home", function() {
    return this.app.client
      .click("#Home")
      .waitUntilTextExists("h1", "Welcome to the dicussion board", 10000)
      .isExisting('//*[@id="home-page"]/h1')
      .then(function(exists) {
        assert.equal(exists, true);
      });
  });

  // Tests that can navigate to All Posts
  it("navigates to All Posts", function() {
    return this.app.client
      .click("#Forum")
      .waitUntilTextExists("h1", "Forums", 10000)
      .isExisting('//*[@id="all-posts"]/div/div/div[1]/div[2]/h1')
      .then(function(exists) {
        assert.equal(exists, true);
      });
  });

  // Tests that can navigate to Topic 1
  it("navigates to Topic 1", function() {
    return this.app.client
      .click("#Forum")
      .waitUntilTextExists("h1", "Forums", 10000)
      .click('//*[@id="0"]')
      .isVisible('//*[@id="Topic1"]')
      .then(function(visible) {
        assert.equal(visible, true);
      });
  });

  // Tests that can navigate to Topic 2
  it("navigates to Topic 2", function() {
    return this.app.client
      .click("#Forum")
      .waitUntilTextExists("h1", "Forums", 10000)
      .click('//*[@id="1"]')
      .element('//*[@id="Topic2"]')
      .isVisible()
      .then(function(visible) {
        assert.equal(visible, true);
      });
  });

  // Tests that can navigate to Topic 3
  it("navigates to Topic 3", function() {
    return this.app.client
      .click("#Forum")
      .waitUntilTextExists("h1", "Forums", 10000)
      .click('//*[@id="2"]')
      .element('//*[@id="Topic3"]')
      .isVisible()
      .then(function(visible) {
        assert.equal(visible, true);
      });
  });

  // Tests that can navigate to Topic 4
  it("navigates to Topic 4", function() {
    return this.app.client
      .click("#Forum")
      .waitUntilTextExists("h1", "Forums", 10000)
      .click('//*[@id="3"]')
      .element('//*[@id="Topic4"]')
      .isVisible()
      .then(function(visible) {
        assert.equal(visible, true);
      });
  });
});
