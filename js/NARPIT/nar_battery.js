document.addEventListener("DOMContentLoaded", function() {
    if (sessionStorage.getItem("isComp")) setupBatteriesOnline();
    else setUpBatteries();
    createAddButton();
    createExportButton();
    createResetButton();
});

function setUpBatteries() {
    clearBatteries();

    let storedData = JSON.parse(localStorage.getItem("batteryLog"));
    let batteryList = JSON.parse(sessionStorage.getItem("setBatteries"));

    if (!storedData) {
        if (batteryList == null) {
            batteryList = sessionStorage.getItem("isComp")
                ? batteries.filter(battery => battery.type == "comp")
                : batteries.filter(battery => battery.type == "comp");
        }
        storedData = batteryList.map(battery => ({ ...battery, timestamp: battery.timestamp, allianceColor: "#3d6cef" }));
    }

    saveBatteryData(storedData);
    loadBatteries(storedData);
}

function loadBatteries(batteries) {
    console.log(batteries);
    const batList = document.getElementById('batList');
    batList.innerHTML = '';

    batteries.forEach((battery, index) => {
        if (battery.checked == null) battery.checked = false;
        var div = document.createElement('div');
        div.classList.add('battery_item');
        div.draggable = true;
        div.dataset.index = index;
        div.style.backgroundColor = battery.allianceColor;

        let numberInput = document.createElement('input');
        numberInput.type = 'text';
        numberInput.classList.add('numberbox');
        numberInput.value = battery.number;
        numberInput.addEventListener("change", function() {
            battery.number = numberInput.value;
            saveBatteryData(batteries);
        });


        let input = document.createElement('input');
        input.type = 'text';
        input.classList.add('textbox');
        input.autocomplete = 'off';
        input.spellcheck = false;

        let timeDisplay = document.createElement('span');
        timeDisplay.classList.add('timestamp');
    
        let slider = document.createElement('input');
        slider.type = 'checkbox';
        slider.classList.add('color-slider');
        slider.checked = battery.allianceColor === "#ef3d3d";
        slider.addEventListener("change", function() {
            battery.allianceColor = slider.checked ? "#ef3d3d" : "#3d6cef";
            div.style.backgroundColor = battery.allianceColor;
            saveBatteryData(batteries);
        });

        input.addEventListener("keydown", function(event) {
            if (event.key === "Enter" && input.value.trim() === battery.number.toString()) {
                const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                battery.timestamp = timestamp;
                battery.checked = true;
                saveBatteryData(batteries);
                timeDisplay.textContent = timestamp;
                div.replaceChild(timeDisplay, input);
                localStorage.setItem("batteryLog", JSON.stringify(batteries)); // Ensure timestamp is saved
            }
        });

        if (battery.checked) {
            console.log("CHECKEd")
            timeDisplay.textContent = battery.timestamp;
            div.appendChild(timeDisplay);
        } else {
            div.appendChild(input);
        }


        let container = document.createElement('div');
        container.classList.add('input-container');
        container.appendChild(numberInput);
        
        div.appendChild(container);
        div.appendChild(slider);
        batList.appendChild(div);

        div.addEventListener("dragstart", handleDragStart);
        div.addEventListener("dragover", handleDragOver);
        div.addEventListener("drop", handleDrop);
    });
}

function handleDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.dataset.index);
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();
    let draggedIndex = event.dataTransfer.getData("text/plain");
    let targetIndex = event.target.closest('.battery_item').dataset.index;
    
    let batteryList = JSON.parse(localStorage.getItem("batteryLog"));
    let draggedItem = batteryList.splice(draggedIndex, 1)[0];
    batteryList.splice(targetIndex, 0, draggedItem);
    
    saveBatteryData(batteryList);
    loadBatteries(batteryList);
}

function saveBatteryData(batteries) {
    sessionStorage.setItem("setBatteries", JSON.stringify(batteries));
    localStorage.setItem("batteryLog", JSON.stringify(batteries));
}

function clearBatteries() {
    localStorage.removeItem("batteryLog");
    const batList = document.getElementById("batList");
    batList.innerHTML = '';
}

function createResetButton() {
    let button = document.createElement("button");
    button.id = "resetButton";
    button.textContent = "Reset Batteries";
    button.addEventListener("click", function() {
        localStorage.removeItem("batteryLog");
        sessionStorage.removeItem("setBatteries");
        setUpBatteries();
    });
    document.body.appendChild(button);
}

function createAddButton() {
    let button = document.createElement("button");
    button.id = "addButton";
    button.textContent = "Add Battery";
    button.addEventListener("click", function() {
        let batteryNumber = prompt("Enter Battery Number:");
        if (batteryNumber) {
            let batteryList = JSON.parse(localStorage.getItem("batteryLog")) || [];
            batteryList.push({ number: batteryNumber, timestamp: null, allianceColor: "#3d6cef" });
            saveBatteryData(batteryList);
            loadBatteries(batteryList);
        }
    });
    document.body.appendChild(button);
}

function createExportButton() {
    let button = document.createElement("button");
    button.id = "exportButton";
    button.textContent = "Export Battery Data";
    button.addEventListener("click", function() {
        let batteryList = JSON.parse(localStorage.getItem("batteryLog")) || [];
        let jsonContent = JSON.stringify(batteryList, null, 2);
        let blob = new Blob([jsonContent], { type: "application/json" });
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "battery_data.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
    document.body.appendChild(button);
}
