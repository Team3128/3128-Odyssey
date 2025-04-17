const interval = 6000000; //60000;  
const eventKey = localStorage.getItem("eventKey");
const teamNumber = localStorage.getItem("teamNumber");

document.addEventListener("DOMContentLoaded", function() {
    loadCompetitionTab();
    setupBatteriesOnline();
});

function setupBatteriesOnline() {
    callPeriodically(getAPICalls, interval);
}

function getAPICalls() {
    updateTBAData();
    updateNexusData();
    updateTBARankings();
}

async function updateTBAData() {
    let TBAData = await generateMatchAPIUrl(eventKey, teamNumber, authKey).then(fetchTBAData);
    let QMData = getQMData(TBAData);
    
    if (localStorage.getItem(`matchData${teamNumber}`) != null) {
        let matchData = JSON.parse(localStorage.getItem(`matchData${teamNumber}`));
        let index = 0;
        console.log(matchData);
        QMData.forEach(match => {
            if (matchData[index].batteryNumber) match.batteryNumber = matchData[index].batteryNumber;
            if (matchData[index].timestamp) match.timestamp = matchData[index].timestamp;
            index++;
        })
    }

    loadMatches(QMData);
}

async function updateTBARankings() {
    let rankingsData = await generateEventAPIUrl(eventKey, teamNumber, authKey).then(fetchTBAData);
    console.log(rankingsData);
    let rankings = getRankings(rankingsData);
    console.log(rankings);
}

async function updateNexusData() {
    let nexusData = await fetchNexusData(eventKey, nexusKey);

    loadCurrentMatch(getCurrentMatch(nexusData));
}

function loadMatches(matches) {
    const batList = document.getElementById('batList');
    batList.innerHTML = '';

    matches.forEach(match => {
        var batteryDiv = document.createElement('div');
        batteryDiv.classList.add('battery_item');
        batteryDiv.style.backgroundColor = match.allianceColor === "blue" ? "#3d6cef" : "#ef3d3d";

        var matchNum = document.createElement('p');
        matchNum.innerText = match.matchNumber;

        var expectedMatchTime = document.createElement('p');
        expectedMatchTime.classList.add('expected_match_time');
        expectedMatchTime.innerText =  `${match.time}`;

        var batNumDisplay = document.createElement('div');
        batNumDisplay.id = "batteryNumDisplay"

        if (match.batteryNumber != null) {
            var batteryNumberText = document.createElement('p');
            batteryNumberText.innerText = match.batteryNumber;
            batNumDisplay.appendChild(batteryNumberText);
        } else {
            var batNumInput = document.createElement('input');
            batNumInput.id = `textbox${match.matchNumber}`;
            batNumInput.type = 'text';
            batNumInput.classList.add('textbox');
            batNumInput.autocomplete = 'off';
            batNumInput.spellcheck = false;
    
            batNumInput.addEventListener("keydown", function(event) {
                if (event.key === "Enter" && !isNaN(parseInt(batNumInput.value.trim()))) {
                    match.batteryNumber = parseInt(batNumInput.value);
                    localStorage.setItem(`matchData${teamNumber}`, JSON.stringify(matches));
                    loadMatches(matches);
                    return;
                }
            })
            batNumDisplay.appendChild(batNumInput);
        }

        var scanDiv = document.createElement('div');
        scanDiv.id = "scannerDiv";


        if (match.timestamp != null) {
            var matchTimestamp = document.createElement('p');
            matchTimestamp.innerText = match.timestamp;
            scanDiv.appendChild(matchTimestamp);
        } else {
            var scannedInput = document.createElement('input');
            scannedInput.id = `scanbox${match.matchNumber}`;
            scannedInput.type = 'text';
            scannedInput.classList.add('textbox');
            scannedInput.autocomplete = 'off';
            scannedInput.spellcheck = false;
    
            scannedInput.addEventListener("keydown", function(event) {
                if (event.key === "Enter" && scannedInput.value.trim() === match.batteryNumber.toString()) {
                    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    console.log(`Battery Number: ${match.batteryNumber}, Time: ${timestamp}`);
                    match.timestamp = timestamp;
                    localStorage.setItem(`matchData${teamNumber}`, JSON.stringify(matches));
                    loadMatches(matches);
                    return;
                }
            });

            scanDiv.appendChild(scannedInput);
        }

        batteryDiv.appendChild(matchNum);
        batteryDiv.appendChild(expectedMatchTime);
        batteryDiv.appendChild(batNumDisplay);
        batteryDiv.appendChild(scanDiv);
        batList.appendChild(batteryDiv);
    });
}

function addScannerFunctionality(input, match) {
    input.addEventListener("keydown", function(event) {
        if (event.key === "Enter" && input.value.trim() === battery.number.toString()) {
            const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            console.log(`Battery Number: ${battery.number}, Time: ${timestamp}`);
            match.timestamp = timestamp;
            scannedInput.textContent = timestamp;
            div.replaceChild(timeDisplay, input);
        }
    });
}
  
function callPeriodically(func, interval) {
    async function execute() {
        await func();
        setTimeout(execute, interval);
    }
    execute();
}

/* Nexus Data Processing */

function getNexusData(nexusData) {
    var matches = nexusData.matches.filter(match => match.redTeams?.includes(teamNumber) || match.blueTeams?.includes(teamNumber));
}

function getCurrentMatch(nexusData) {
    let currentMatch = nexusData.matches.reverse().find(match => match.status === 'On field');
    if (!currentMatch) return nexusData.matches[0];
    return currentMatch;
}

/* TBA Data Processing */

function getQMData(TBAData) {
    return TBAData.filter(match => match.comp_level === "qm")
    .sort((a, b) => a.match_number - b.match_number)
    .map(match => ({
        matchNumber: match.match_number,
        allianceColor: getAllianceColor(match),
        time: getTime(match)
    }))
}

function getRankings(TBAData) {
    return TBAData.rankings.map(team => ({
        teamNumber: team.team_key.splice(0, 3),
        avgEPA: team.sort_orders[0],
        kda: "" + team.records.wins + "-" + team.records.losses
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

function getTime(match) {
    date = new Date(match.predicted_time * 1000)
    let options = {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    }
    time = date.toLocaleTimeString("en-US", options)
    return time;
}

/* Tab functions */

function loadCurrentMatch(currentMatch) {
    const currMatchDiv = document.getElementById('currentMatchContainer');
    currMatchDiv.innerHTML = '';

    var currentMatchItem = document.createElement('flex');
    currentMatchItem.id = "currentMatchItem";

    var status = document.createElement('p');
    status.id = "currentMatchStatus";
    status.innerText = currentMatch.status + " ... " + currentMatch.label;
    currentMatchItem.appendChild(status);

    // var currMatchNum = document.createElement('p');
    // currMatchNum.id = "currentMatchName";
    // currMatchNum.innerText = currentMatch.label;
    // currentMatchItem.appendChild(currMatchNum);

    currMatchDiv.appendChild(currentMatchItem);
}

function loadCompetitionTab() {
    setTabColor("competitionTabButton");
    loadContent("competitionTabButton");
}

function loadWatchTab() {
    setTabColor("watchTabButton");
    loadContent("watchTabButton");
}

function loadRankingTab() {
    setTabColor("rankingTabButton");
    loadContent("rankingTabButton");
}

function loadLendTab() {
    setTabColor("lendTabButton");
    loadContent("lendTabButton");
}

function setTabColor(selectedTab) {
    document.getElementById("competitionTabButton").style.backgroundColor = selectedTab === "competitionTabButton" ? "#141414" : "#2d2d2d";
    document.getElementById("watchTabButton").style.backgroundColor = selectedTab === "watchTabButton" ? "#141414" : "#2d2d2d";
    document.getElementById("rankingTabButton").style.backgroundColor = selectedTab === "rankingTabButton" ? "#141414" : "#2d2d2d";
    document.getElementById("lendTabButton").style.backgroundColor = selectedTab === "lendTabButton" ? "#141414" : "#2d2d2d";
}

function loadContent(selectedTab) {
    document.getElementById("leftDiv").style.display = selectedTab === "competitionTabButton" || selectedTab === "watchTabButton" ? "flex" : "none";
    document.getElementById("leftDiv").style.width = selectedTab === "competitionTabButton" ? "45vw" : "50vw";

    document.getElementById("batListContainer").style.display = selectedTab === "competitionTabButton" || selectedTab === "watchTabButton" ? "block" : "none";
    document.getElementById("batListContainer").style.width = selectedTab === "competitionTabButton" ? "45vw" : "38vw";

    document.getElementById("currentMatchContainer").style.display = selectedTab === "competitionTabButton" ? "block" : "none";

    document.getElementById("twitchContainer").style.display = selectedTab === "watchTabButton" ? "block" : "none";

    document.getElementById("rankingContainer").style.display = selectedTab === "competitionTabButton" ? "block" : "none";
}