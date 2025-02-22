document.addEventListener("DOMContentLoaded", loadData);

function saveData() {
    let batteryNumber = document.getElementById("batteryNumber").value.trim();
    let matchNumber = document.getElementById("matchNumber").value.trim();
    let notes = document.getElementById("notes").value.trim(); // Optional field

    if (batteryNumber === "" || matchNumber === "") {
        alert("Please enter both Battery Number and Match Number!");
        return;
    }

    let storedData = JSON.parse(localStorage.getItem("batteryLog")) || [];
    let timestamp = new Date().toLocaleString();

    storedData.push({ batteryNumber, matchNumber, timestamp, notes });
    localStorage.setItem("batteryLog", JSON.stringify(storedData));

    document.getElementById("batteryNumber").value = "";
    document.getElementById("matchNumber").value = "";
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
            <td>${entry.batteryNumber}</td>
            <td>${entry.matchNumber}</td>
            <td>${entry.timestamp}</td>
            <td>${entry.notes || ""}</td>
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
