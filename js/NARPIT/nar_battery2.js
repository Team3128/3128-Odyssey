document.addEventListener("DOMContentLoaded", setUpBatteries);

function setUpBatteries() {
    clearBatteries();
    let batteryList = JSON.parse(sessionStorage.getItem("setBatteries"));

    if (batteryList == null) {
        if (sessionStorage.getItem("isComp")) {
            batteryList = batteries.filter(battery => battery.type == "comp");
        } else {
            batteryList = batteries.filter(battery => battery.type == "practice");
        }
    }

    console.log("battery list", batteryList);

    let storedData = JSON.parse(localStorage.getItem("batteryLog")) || [];
    batteryList.forEach(battery => {
        storedData.push(battery);
    });
    localStorage.setItem("batteryLog", JSON.stringify(storedData));

    loadBatteries(batteryList);
}

function loadBatteries(batteries) {
    console.log("battery log", localStorage.getItem("batteryLog"));
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

        let input = document.createElement('input');
        input.id = `textbox${battery.number}`;
        input.type = 'text';
        input.classList.add('textbox');
        input.autocomplete = 'off';
        input.spellcheck = false;

        input.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                console.log(`Battery Number: ${battery.number}, Time: ${timestamp}`);
                const timeDisplay = document.createElement('span');
                timeDisplay.textContent = timestamp;
                div.replaceChild(timeDisplay, input);
            }
        });

        div.appendChild(input);
        div.appendChild(a);
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