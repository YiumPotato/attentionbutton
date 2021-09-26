// eslint-disable-next-line no-unused-vars
const { Given, When, Then } = require("cypress-cucumber-preprocessor/steps");

function click_button(n = 1, fast = true) {
  // eslint-disable-next-line for-direction
  cy.get("button#press_me").as("play_button");
  if (fast) {
    for (let i = 0; i < n; i++) {
      cy.get("@play_button").click();
    }
  } else {
    for (let i = 0; i < n; i++) {
      cy.wait(2001).get("@play_button").click();
    }
  }
}
before(function () {
  cy.visit("/");
});

When("I click on the button", function () {
  click_button();
});

When("I click on the button {int} times slowly", function (n) {
  click_button(n, false);
});

When("I click on the button {int} times fast", function (n) {
  click_button(n);
});

When("I wait {int} seconds", function (n) {
  cy.wait(n * 1000);
});

let curr_game_score = 0;

Then("The game score should increase by {int}", function (n) {
  cy.get("span#game_score").contains(curr_game_score + n);
  curr_game_score += n;
});

Then(/^The button should be available$/, function () {
  cy.get("button#press_me").should("not.be.disabled");
});

Then(/^The button should be disabled$/, function () {
  // press the button multiple times fast
  cy.get("button#press_me").should("be.disabled");
});

Then("The button should be available after {int} seconds", function (n) {
  cy.wait(n * 1000)
    .get("button#press_me")
    .should("not.be.disabled");
});
