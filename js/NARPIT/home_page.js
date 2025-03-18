clearSessionStorage();

window.onload=function() {
    document.getElementById("online").addEventListener("change", function(event) {
        if (event.target.checked) {
            sessionStorage.online = true;
        }
        else {
            sessionStorage.online = false;
        }
    });
    document.getElementById("generate-batteries").addEventListener("change", function(event) {
        if (event.target.checked) {
            sessionStorage.generateBat = true;
            document.getElementById("manual-input").style.display = "block";
        }
        else {
            sessionStorage.generateBat = false;
            document.getElementById("manual-input").style.display = "none";
        }
    });
    document.getElementById("comp").addEventListener("change", function(event) {
        if (event.target.checked) {
            sessionStorage.isComp = true;
        }
        else {
            sessionStorage.isComp = false;
        }
    });
}

function inputBatteries() {
    try {
        const rotation = document.getElementById("rotation").value.split(" ");
        const JSONarray = rotation.map(value => batteries.find(battery => battery.number === parseInt(value)));  
        sessionStorage.setItem("setBatteries", JSON.stringify(JSONarray));
    } catch (error) {
        console.error("error inputing", error);
    }
}

function clearSessionStorage() {
    sessionStorage.clear();
}