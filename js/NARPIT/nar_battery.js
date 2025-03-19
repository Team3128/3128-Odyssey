document.addEventListener("DOMContentLoaded", setUpBatteries);

function setUpBatteries() {
    clearBatteries();

    let storedData = JSON.parse(localStorage.getItem("batteryLog"));
    let batteryList = JSON.parse(sessionStorage.getItem("setBatteries"));

    if (!storedData) {
        if (batteryList == null) {
            if (sessionStorage.getItem("isComp")) {
                batteryList = batteries.filter(battery => battery.type == "comp");
            } else {
                batteryList = batteries.filter(battery => battery.type == "practice");
            }
        }
        storedData = batteryList.map(battery => ({ ...battery, timestamp: null, allianceColor: "#3d6cef" }));
        localStorage.setItem("batteryLog", JSON.stringify(storedData));
    }

    loadBatteries(storedData);
    createResetButton();
}

function loadBatteries(batteries) {
    const batList = document.getElementById('batList');
    batList.innerHTML = '';

    batteries.forEach((battery, index) => {
        var div = document.createElement('div');
        var a = document.createElement('a');
        var linkText = document.createTextNode(battery.number);

        a.appendChild(linkText);
        a.title = battery.number;
        div.classList.add('battery_item');
        div.draggable = true;
        div.dataset.index = index;
        div.style.backgroundColor = battery.allianceColor;

        let input = document.createElement('input');
        input.id = `textbox${battery.number}`;
        input.type = 'text';
        input.classList.add('textbox');
        input.autocomplete = 'off';
        input.spellcheck = false;

        let timeDisplay = document.createElement('span');
        timeDisplay.classList.add('timestamp');
        if (battery.timestamp) {
            timeDisplay.textContent = battery.timestamp;
        }

        let slider = document.createElement('input');
        slider.type = 'checkbox';
        slider.classList.add('color-slider');
        slider.checked = battery.allianceColor === "#ef3d3d";
        slider.addEventListener("change", function() {
            battery.allianceColor = slider.checked ? "#ef3d3d" : "#3d6cef";
            div.style.backgroundColor = battery.allianceColor;
            localStorage.setItem("batteryLog", JSON.stringify(batteries));
        });

        input.addEventListener("keydown", function(event) {
            if (event.key === "Enter" && input.value.trim() === battery.number.toString()) {
                const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                console.log(`Battery Number: ${battery.number}, Time: ${timestamp}`);
                battery.timestamp = timestamp;
                localStorage.setItem("batteryLog", JSON.stringify(batteries));
                timeDisplay.textContent = timestamp;
                div.replaceChild(timeDisplay, input);
            }
        });

        if (battery.timestamp) {
            div.appendChild(timeDisplay);
        } else {
            div.appendChild(input);
        }
        div.appendChild(a);
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
    
    localStorage.setItem("batteryLog", JSON.stringify(batteryList));
    loadBatteries(batteryList);
}

function clearBatteries() {
    localStorage.removeItem("batteryLog");
    const batList = document.getElementById("batList");
    batList.innerHTML = '';
}

function createResetButton() {
    let existingButton = document.getElementById("resetButton");
    if (!existingButton) {
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
}
