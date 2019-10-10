const electron = require("electron");
const Application = require("spectron").Application;
const assert = require("assert");
const describe = require("mocha").describe;
const afterEach = require("mocha").afterEach;
const it = require("mocha").it;
const beforeEach = require("mocha").beforeEach;
const globals = require("./global-setup");

var appPath = "./dist_electron/bundled/background.js";

describe.skip("Forum Interaction Topic 4", function() {
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
    this.timeout(10000);
    if (!this.app.client.isExisting("#Forum")) {
      this.app.client.element("#Menu").click();
    }
    return this.app.client
      .element("#Forum")
      .click()
      .waitUntilTextExists("h1", "Forums", 10000)
      .element('//*[@id="Login"]')
      .click()
      .setValue('//*[@id="username-login"]', "Harry1990")
      .setValue('//*[@id="password-login"]', "password")
      .click('//*[@id="button-login"]')
      .click('//*[@id="3"]')
      .element('//*[@id="new-post"]/div/div/h3')
      .isVisible();
  });

  //   Runs after each test completes, stops the application
  afterEach(function() {
    if (this.app && this.app.isRunning()) {
      this.timeout(10000);
      return this.app.stop();
    }
  });

  it("New Post - Correct Details", function() {
    this.timeout(10000);
    return this.app.client
      .pause(1000)
      .setValue(
        '//*[@id="postText-newPost-topic4"]',
        "This is a new post on topic 4. TEST"
      )
      .setValue('//*[@id="password-newPost-topic4"]', "password")
      .click('//*[@id="button-newPost-topic4"]')
      .isVisible('//*[@id="success-newPost-topic4"]')
      .then(function(visible) {
        assert.equal(visible, true);
      });
  });

  it("New Post - Incorrect Details", function() {
    this.timeout(10000);
    return this.app.client
      .setValue(
        '//*[@id="postText-newPost-topic4"]',
        "This is a failed post for topic 4. TEST"
      )
      .setValue('//*[@id="password-newPost-topic4"]', "wrong")
      .click('//*[@id="button-newPost-topic4"]')
      .isVisible('//*[@id="error-newPost-topic4"]')
      .then(function(visible) {
        assert.equal(visible, true);
      });
  });

  it("Edit Post - Success", function() {
    this.timeout(10000);
    return this.app.client
      .click('//*[@id="topic4-edit-3"]')
      .setValue('//*[@id="topic4-postText-3"]', ". Edited Post. TEST")
      .click('//*[@id="topic4-save-3"]')
      .waitUntilTextExists(
        '//*[@id="topic4-post-3"]/div/div/div/div[2]',
        "Edited Post. TEST"
      )
      .getText('//*[@id="topic4-post-3"]/div/div/div/div[2]')
      .then(function(text) {
        assert.equal(
          text,
          "Where are all of the real people. Edited Post. TEST"
        );
      });
  });

  it("Edit Post - Cancel", function() {
    this.timeout(10000);
    return this.app.client
      .click('//*[@id="topic4-edit-3"]')
      .setValue('//*[@id="topic4-postText-3"]', "Edited Post. TEST")
      .click('//*[@id="topic4-cancel-3"]')
      .waitUntilTextExists(
        '//*[@id="topic4-post-3"]/div/div/div/div[2]',
        "Where are all of the real people"
      )
      .getText('//*[@id="topic3-post-3"]/div/div/div/div[2]')
      .then(function(text) {
        assert.equal(text, "Where are all of the real people");
      });
  });

  it("Edit Post - no Text", function() {
    this.timeout(100000);
    return (
      this.app.client
        .click('//*[@id="topic4-edit-3"]')
        .click('//*[@id="topic4-postText-3"]')
        .keys("Backspace")
        .keys("Backspace")
        .keys("Backspace")
        .keys("Backspace")
        .keys("Backspace")
        .keys("Backspace")
        .keys("Backspace")
        .keys("Backspace")
        .keys("Backspace")
        .keys("Backspace")
        .keys("Backspace")
        .keys("Backspace")
        .keys("Backspace")
        .keys("Backspace")
        .keys("Backspace")
        .keys("Backspace")
        .keys("Backspace")
        .keys("Backspace")
        .keys("Backspace")
        .keys("Backspace")
        .keys("Backspace")
        .keys("Backspace")
        .keys("Backspace")
        .keys("Backspace")
        .keys("Backspace")
        .keys("Backspace")
        .keys("Backspace")
        .keys("Backspace")
        .keys("Backspace")
        .keys("Backspace")
        .keys("Backspace")
        .keys("Backspace")
        .keys("Backspace")
        .keys("Backspace")
        // .setValue('//*[@id="topic4-postText-3"]', "")
        .click('//*[@id="topic4-save-3"]')
        .waitUntilTextExists(
          '//*[@id="topic4-post-3"]/div/div/div/div[2]/form/div[1]/div[2]/div[2]/div[1]/div/div',
          "Posts cannot be blank."
        )
        .getText(
          '//*[@id="topic4-post-3"]/div/div/div/div[2]/form/div[1]/div[2]/div[2]/div[1]/div/div'
        )
        .then(function(text) {
          assert.equal(text, "Posts cannot be blank.");
        })
    );
  });

  it("Delete Post", function() {
    this.timeout(10000);
    return this.app.client
      .click('//*[@id="topic4-delete-3"]')
      .isExisting('//*[@id="topic4-post-3"]')
      .then(function(existing) {
        assert.equal(existing, false);
      });
  });
});
