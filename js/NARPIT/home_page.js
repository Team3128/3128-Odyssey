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
        }
        else {
            sessionStorage.generateBat = false;
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
