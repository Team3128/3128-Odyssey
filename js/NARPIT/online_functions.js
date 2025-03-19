setupBatteriesOnline();

async function setupBatteriesOnline() {
    const TBAData = await generateAPIUrl("2025bcvi", authKey).then(fetchTBAData);
    const QMData = getQMData(TBAData);
    
}

function getQMData(TBAData) {
    return TBAData.filter(match => match.comp_level === "qm")
    .map(match => ({
        matchNumber: match.match_number,
        allianceColor: getAllianceColor(match)
    }))
    .sort((a, b) => a.matchNumber - b.matchNumber);
}

function getAllianceColor(match) {
    return match.alliances.blue.team_keys.includes('frc3128') ? "blue" : "red";
}