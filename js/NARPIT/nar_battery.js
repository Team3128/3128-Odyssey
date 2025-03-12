document.addEventListener("DOMContentLoaded", loadData);

/* Battery List Setup */

let batteryList = JSON.parse(sessionStorage.getItem("setBatteries"));

if (batteryList == null) {
    if (sessionStorage.isComp) {
        batteryList = batteries.filter(battery => battery.type=="comp");
    } 
    else {
        batteryList = batteries.filter(battery => battery.type=="practice");
    }
}

/* Offline Mode Code */

function inputBatteries() {
    const rotation = document.getElementById("rotation").value.split(" ");
    loadBatteries(rotation);
}

function loadBatteries(rotation) {
    let storedData = JSON.parse(localStorage.getItem("batteryLog")) || [];
    
    rotation.forEach(battery => {
        storedData.push(battery);
        localStorage.setItem("batteryLog", JSON.stringify(storedData));
    });

    loadData();
}

/* Match Scraping Code */


/* Old Code */
function saveData() {
    let batteryNumber = document.getElementById("batteryNumber").value.trim();

    let storedData = JSON.parse(localStorage.getItem("batteryLog")) || [];
    let timestamp = new Date().toLocaleString();

    storedData.push({ batteryNumber, timestamp });
    localStorage.setItem("batteryLog", JSON.stringify(storedData));

    document.getElementById("batteryNumber").value = "";
    document.getElementById("notes").value = ""; // Clear input fields

    loadData();
}

function loadData() {
    let storedData = JSON.parse(localStorage.getItem("batteryLog")) || [];
    let tableBody = document.getElementById("dataTable");

    tableBody.innerHTML = ""; // Clear table before inserting new data

    storedData.forEach((entry, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${entry}</td>
            <td><button class="delete-btn" onclick="deleteEntry(${index})">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function deleteEntry(index) {
    let storedData = JSON.parse(localStorage.getItem("batteryLog")) || [];
    storedData.splice(index, 1); // Remove entry at specified index
    localStorage.setItem("batteryLog", JSON.stringify(storedData));
    loadData();
}

function exportData() {
    let storedData = JSON.parse(localStorage.getItem("batteryLog")) || [];

    if (storedData.length === 0) {
        alert("No data to export!");
        return;
    }

    let dataStr = JSON.stringify(storedData, null, 4); // Pretty print JSON
    let blob = new Blob([dataStr], { type: "application/json" });
    let url = URL.createObjectURL(blob);

    let a = document.createElement("a");
    a.href = url;
    a.download = "battery_log.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function clearAllData() {
    if (confirm("Are you sure you want to delete all data? This cannot be undone.")) {
        localStorage.removeItem("batteryLog");
        loadData(); // Refresh table
    }
}

function setUp() {
    
}