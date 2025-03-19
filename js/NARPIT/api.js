const authKey = "V3i857s3hLtePEnhqMeSFUSxaqRJeiXIUyHMEEcNXhRkLTYEDbUS4ngKwDiBrj2b";

// const interval = 600000;
const interval = 30000;

async function generateAPIUrl(eventKey, authKey) {
    return "https://www.thebluealliance.com/api/v3/team/frc3128/event/" + 
    eventKey + "/matches/simple?X-TBA-Auth-Key=" + authKey;
}

async function fetchTBAData(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        if (response.status === 404) {
            throw new Error("Event Path not Found on TBA");
        }
        var allData = await response.json();
        allData = JSON.parse(JSON.stringify(allData));
        return allData != null ? allData : -1;
    } catch (error) {
        console.error(error);
        return -1;
    }
}

// const test = generateAPIUrl("2025bcvi", authKey).then(fetchTBAData);

// console.log(fetchTBAData("https://www.thebluealliance.com/api/v3/team/frc3128/event/2025bcvi/matches/simple?X-TBA-Auth-Key=V3i857s3hLtePEnhqMeSFUSxaqRJeiXIUyHMEEcNXhRkLTYEDbUS4ngKwDiBrj2b"));