async function checkConditions() {
    let enteredTeamNumber = parseInt(document.getElementById("team-number").value);
    let enteredCompPath = document.getElementById("competition-key").value;

    if (!isNaN(enteredTeamNumber)) {
        await checkAPI(enteredTeamNumber, enteredCompPath) ? nextPage(enteredTeamNumber, enteredCompPath) : () => {
            clearInputs();
            alert("Invalid Team Number or Event");
        }
    }
    else {
        clearInputs();
        alert("Invalid Team Number or Event");
    }
}

async function checkAPI(teamNumber, compKey) {
    const TBAData = await generateTeamsAPIUrl(compKey, authKey).then(fetchTBAData);
    if (TBAData === -1) {
        clearInputs();
        alert("Invalid Event Key");
        return false;
    } else {
        return TBAData.map(teams => (teams.team_number)).includes(teamNumber);
    }
}

function clearInputs() {
    document.getElementById("team-number").value = "";
    document.getElementById("competition-key").value = "";
}

function nextPage(num, key) {
    localStorage.setItem("teamNumber", num);
    localStorage.setItem("eventKey", key);
    window.location.href = "qual_matches.html"
}

