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

    var difference = Math.abs(numberOfMotors - motorsArray.length);

    if (numberOfMotors > motorsArray.length) {
        //make more motors
        for (i = 0; i < difference; i++) {
            motorsArray.push("Motor");
        }
    } else if (numberOfMotors < motorsArray.length){
        //get rid of motors
        for (i = 0; i < difference; i++) {
            motorsArray.pop();
        }
    }

    console.log(motorsArray);
}

setInterval(motorInput, 100);