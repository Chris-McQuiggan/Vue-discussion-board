const electron = require("electron");
const Application = require("spectron").Application;
const assert = require("assert");
const describe = require("mocha").describe;
const afterEach = require("mocha").afterEach;
const it = require("mocha").it;
const beforeEach = require("mocha").beforeEach;
const globals = require("./global-setup");

var appPath = "./dist_electron/bundled/background.js";

describe("Application launch", function() {
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

  // Runs after each test completes, stops the application
  afterEach(function() {
    if (this.app && this.app.isRunning()) {
      this.timeout(10000);
      return this.app.stop();
    }
  });

  // Tests that there is exactly one application window open
  it("shows an initial window", function() {
    return this.app.client.getWindowCount().then(function(count) {
      assert.equal(count, 1);
    });
  });

  //Tests that the app loads
  it("page loads", function() {
    assert.equal(this.app.isRunning(), true);
  });
});
