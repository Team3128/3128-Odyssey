let count = 0;

async function setupBatteriesOnline() {
    clearBatteries();

    const TBAData = await generateAPIUrl("2025bcvi", authKey).then(fetchTBAData);
    const QMData = getQMData(TBAData);

    loadBatteriesOnline(QMData);
}

function getQMData(TBAData) {
    return TBAData.filter(match => match.comp_level === "qm")
    .sort((a, b) => a.match_number - b.match_number)
    .map(match => ({
        matchNumber: match.match_number,
        allianceColor: getAllianceColor(match),
        number: getBatteryNumber()
    }))
}

function getAllianceColor(match) {
    return match.alliances.blue.team_keys.includes('frc3128') ? "blue" : "red";
}

function getBatteryNumber() {
    let batNum = batteries.filter(battery => battery.type === "comp")[count].number;
    count = count + 1;
    return batNum;
}

function loadBatteriesOnline(batteries) {
    const batList = document.getElementById('batList');
    batList.innerHTML = '';

    batteries.forEach((battery, index) => {
        var div = document.createElement('div');
        var a = document.createElement('a');
        var linkText = document.createTextNode(battery.matchNumber);

        a.appendChild(linkText);
        a.title = battery.number;
        div.classList.add('battery_item');
        div.dataset.index = index;
        div.style.backgroundColor = battery.allianceColor === "blue" ? "#ef3d3d" : "#3d6cef";

        let batNum = document.createElement('p');
        batNum.classList.add('battery_number');
        batNum.id = `batnum${battery.number}`;
        batNum.innerText = battery.number;
        
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

        div.appendChild(a);
        div.appendChild(batNum)
        if (battery.timestamp) {
            div.appendChild(timeDisplay);
        } else {
            div.appendChild(input);
        }
        batList.appendChild(div);
    });
}