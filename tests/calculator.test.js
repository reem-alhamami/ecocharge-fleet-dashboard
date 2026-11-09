/*
  ICS432 - EcoCharge Fleet Dashboard
  Unit tests for calculateChargingCost() (Deliverable 3)

  Run with:  npm test
  Uses Node.js's built-in test runner, so nothing needs to be installed.
*/

const test = require("node:test");
const assert = require("node:assert/strict");
const { calculateChargingCost } = require("../calculator.js");

// ---------- 1. Positive hours: the cost is calculated correctly ----------

test("4 hours costs $4.50", function () {
    // 4 x 7.5 kW x $0.15 = 4.5
    assert.equal(calculateChargingCost(4), 4.5);
});

test("10 hours costs $11.25", function () {
    assert.equal(calculateChargingCost(10), 11.25);
});

test("decimal hours work (1.5 hours costs about $1.69)", function () {
    // 1.5 x 7.5 x 0.15 = 1.6875 -> shown on the page as $1.69
    assert.equal(calculateChargingCost(1.5).toFixed(2), "1.69");
});

test("0 hours costs $0.00", function () {
    assert.equal(calculateChargingCost(0), 0);
});

test("hours typed into the form (text) are accepted", function () {
    // Form inputs always give text, e.g. "4", not the number 4
    assert.equal(calculateChargingCost("4"), 4.5);
});

// ---------- 2. Negative hours: fails gracefully with a clear message ----------

test("negative hours are rejected", function () {
    assert.throws(
        function () { calculateChargingCost(-5); },
        { message: "Please enter valid non-negative hours." }
    );
});

test("negative hours typed as text are rejected", function () {
    assert.throws(
        function () { calculateChargingCost("-0.5"); },
        { message: "Please enter valid non-negative hours." }
    );
});

// ---------- 3. Non-numeric input: fails gracefully with a clear message ----------

test("letters are rejected", function () {
    assert.throws(
        function () { calculateChargingCost("abc"); },
        { message: "Please enter valid non-negative hours." }
    );
});

test("a mix of numbers and letters is rejected", function () {
    assert.throws(
        function () { calculateChargingCost("5abc"); },
        { message: "Please enter valid non-negative hours." }
    );
});

// ---------- 4. The bug we prevented: blank input must NOT cost $0.00 ----------

test("a blank field is rejected instead of costing $0.00", function () {
    // Without the blank check, Number("") becomes 0 and the page would show $0.00
    assert.throws(
        function () { calculateChargingCost(""); },
        { message: "Please enter charging hours." }
    );
});

test("a field with only spaces is rejected", function () {
    assert.throws(
        function () { calculateChargingCost("   "); },
        { message: "Please enter charging hours." }
    );
});
