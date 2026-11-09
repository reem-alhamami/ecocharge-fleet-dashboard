/*
  ICS432 - EcoCharge Fleet Dashboard
  Charging cost calculation (Feature B logic only).

  This file has no webpage code, so it can be tested in Node.js
  and also used by the webpage.
*/

// This function calculates the estimated charging cost.
function calculateChargingCost(hours) {

    // Check if the user left the input empty.
    if (hours === null || String(hours).trim() === "") {
        throw new Error("Please enter charging hours.");
    }

    // Convert the input into a number.
    const duration = Number(hours);

    // Reject negative numbers, letters and invalid values.
    if (!Number.isFinite(duration) || duration < 0) {
        throw new Error("Please enter valid non-negative hours.");
    }

    // Fixed values provided by our professor.
    const chargingPower = 7.5;
    const electricityRate = 0.15;

    // Calculate the estimated cost in dollars.
    const cost = duration * chargingPower * electricityRate;

    return cost;
}

// Share the function with Node.js (for unit tests).
// In the browser "module" does not exist, so this line is skipped.
if (typeof module !== "undefined") {
    module.exports = { calculateChargingCost };
}
