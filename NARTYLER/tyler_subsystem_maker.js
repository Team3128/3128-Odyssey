//created by tyler enderwick
var motorNumberInput = document.getElementById("num");
var subsystemNameInput = document.getElementById("subName");
var outputFrame = document.getElementById("output");
var refreshButton = document.getElementById("sumbitNum");

var motorsArray = [];

var numberOfMotors = 0;

function motorInput() {
    numberOfMotors = motorNumberInput.value;

    if (numberOfMotors < 1) {
        numberOfMotors = 1;
    }

    console.log(numberOfMotors);
}

setInterval(motorInput, 100);