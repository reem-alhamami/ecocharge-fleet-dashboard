# EcoCharge Fleet Dashboard

ICS 432 Software Security – Assignment 2 – Team 2

A prototype web dashboard for EcoCharge Innovations that lets a fleet manager:

- **Feature A – Fleet Overview:** see 6 electric vehicles, each with its vehicle ID, model, battery percentage and status (Available, Charging or On Trip).
- **Feature B – Charging Cost Calculator:** select a vehicle, enter a charging duration in hours, and get the estimated cost using
  **Cost = Duration (h) × 7.5 kW × $0.15 per kWh**.

Built with plain HTML, CSS and JavaScript. No frameworks or installs are needed to run the app.

---

## How to run the application

1. Download the project: on GitHub click **Code → Download ZIP**, then unzip it.
   *(Or with Git: `git clone https://github.com/reem-alhamami/ecocharge-fleet-dashboard.git`)*
2. Open the folder and double-click **`index.html`**. It opens in your web browser (Chrome, Edge, Firefox or Safari).

That's it. The fleet overview appears at the top and the calculator below it.

## How to run the unit tests

The tests check the cost calculation function only (`calculateChargingCost()` in `calculator.js`).

**Option 1 – automatically on GitHub:** the tests run on every push and Pull Request through GitHub Actions (`.github/workflows/tests.yml`). Results are in the repository's **Actions** tab.

**Option 2 – on your computer:** install [Node.js](https://nodejs.org) (version 18 or newer), open a terminal in the project folder and run:

```
npm test
```

Expected result: `# tests 11`, `# pass 11`, `# fail 0`. Nothing else needs installing; the tests use Node's built-in test runner.

---

## Project structure

| File | Purpose |
|---|---|
| `index.html` | Page structure: header, fleet section, calculator form |
| `style.css` | Page design: vehicle cards, battery bars, form |
| `script.js` | Feature A (vehicle data and cards) and the calculator form handling |
| `calculator.js` | `calculateChargingCost()` – the cost formula and input checks |
| `tests/calculator.test.js` | 11 unit tests for `calculateChargingCost()` |
| `package.json` | Defines the `npm test` command |
| `.github/workflows/tests.yml` | Runs the tests automatically on GitHub |

---

## Code review: a bug we identified and prevented

**The bug: a blank charging duration would show a cost of $0.00 instead of an error.**

JavaScript converts an empty string to the number zero: `Number("")` gives `0`. If the calculator only converted the input and checked that it was a valid, non-negative number, a manager who clicked **Calculate Cost** without typing anything would see **$0.00**. That looks like a real answer, so the manager could act on a wrong cost without noticing.

**How we prevented it:**

1. **Code:** `calculator.js` (lines 12–15) checks for an empty or spaces-only input **before** converting it, and shows *"Please enter charging hours."*
   ```js
   if (hours === null || String(hours).trim() === "") {
       throw new Error("Please enter charging hours.");
   }
   ```
2. **Tests:** two unit tests guard this case so the bug cannot come back unnoticed:
   - `a blank field is rejected instead of costing $0.00`
   - `a field with only spaces is rejected`

   We confirmed the tests work by temporarily deleting the check: both tests then **failed**. With the check in place, all 11 tests pass.

---

## Team

| Member | Contribution |
|---|---|
| Fathma Obaid Alqaoud | Feature A and Feature B code; Agile documents |
| Reem Fahad Alhamami | GitHub repository, branches and Pull Requests; unit tests; README |
| Shahad Marwan Alkhalifi | Security memo; ethics memo |

The repository is hosted on GitHub with the professor's permission. GitHub Pull Requests are the equivalent of GitLab Merge Requests.
