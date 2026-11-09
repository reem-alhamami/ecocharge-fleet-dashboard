
/*
  ICS432 - EcoCharge Fleet Dashboard
  Feature A: Static Fleet Overview
  Feature B: Charging Cost Calculator
*/

// FEATURE A: STORE THE VEHICLE INFORMATION

// This array contains six sample electric vehicles.
const vehicles = [
    {
        id: "EV-001",
        model: "Tesla Model 3",
        battery: 85,
        status: "Available"
    },
    {
        id: "EV-002",
        model: "Nissan Leaf",
        battery: 45,
        status: "Charging"
    },
    {
        id: "EV-003",
        model: "Hyundai IONIQ 5",
        battery: 72,
        status: "On Trip"
    },
    {
        id: "EV-004",
        model: "Kia EV6",
        battery: 95,
        status: "Available"
    },
    {
        id: "EV-005",
        model: "BMW i4",
        battery: 30,
        status: "Charging"
    },
    {
        id: "EV-006",
        model: "Tesla Model Y",
        battery: 60,
        status: "On Trip"
    }
];

// Find the vehicle list and dropdown in our HTML.
const fleetContainer = document.getElementById("fleet-container");
const vehicleSelect = document.getElementById("vehicle-select");

// Go through every vehicle and display its information.
vehicles.forEach(function(vehicle) {

    // Create a card for this vehicle.
    const card = document.createElement("div");
    card.className = "vehicle-card";

    // Display the vehicle model.
    const title = document.createElement("h3");
    title.textContent = vehicle.model;
    card.appendChild(title);

    // Display vehicle ID.
    const id = document.createElement("p");
    id.textContent = "Vehicle ID: " + vehicle.id;
    card.appendChild(id);

    // Display battery percentage.
    const battery = document.createElement("p");
    battery.textContent = "Battery: " + vehicle.battery + "%";
    card.appendChild(battery);

    // Display current vehicle status.
    const status = document.createElement("p");
    status.textContent = "Status: " + vehicle.status;
    card.appendChild(status);

    // Create the battery progress bar.
    const batteryTrack = document.createElement("div");
    batteryTrack.className = "battery-track";

    const batteryFill = document.createElement("div");
    batteryFill.className = "battery-fill";

    // Set the progress bar according to battery level.
    batteryFill.style.width = vehicle.battery + "%";

    batteryTrack.appendChild(batteryFill);
    card.appendChild(batteryTrack);

    // Add the completed card to the webpage.
    fleetContainer.appendChild(card);

    // Add the vehicle to the calculator dropdown.
    const option = document.createElement("option");
    option.value = vehicle.id;
    option.textContent = vehicle.id + " - " + vehicle.model;

    vehicleSelect.appendChild(option);
});

