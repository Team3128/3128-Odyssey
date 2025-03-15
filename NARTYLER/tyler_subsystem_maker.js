//created by tyler enderwick
var motorNumberInput = document.getElementById("num");
var subsystemNameInput = document.getElementById("subName");
var subsystemTypeInput = document.getElementById("subsystemType");
var output = document.getElementById("output");
var copyButton = document.getElementById("copy");

var motorsArray = [];

var numberOfMotors = 0;

var copyScript = "";

var variables = "";

function runScriptMaker() {
    var fullScript = `Hello, World!`;
    var subsystemName = subsystemNameInput.value;
    var subsystemType = subsystemTypeInput.value;
    
    if (subsystemType == "Voltage") {

    } else if (subsystemType == "Velocity") {

    } else if (subsystemType == "Position") {

    }

    output.innerText = fullScript;
    copyScript = fullScript;
}

function motorInput() {
    numberOfMotors = motorNumberInput.value;

    if (numberOfMotors < 1) {
        numberOfMotors = 1;
    }

    var difference = Math.abs(numberOfMotors - motorsArray.length);

    if (numberOfMotors > motorsArray.length) {
        //make more motors
        for (i = 0; i < difference; i++) {
            var motorDiv = document.createElement("div");
            var motorNumber = String(motorsArray.length + 1)

            motorDiv.innerHTML =
                `<label for="motor` + motorNumber + `">Motor ` + motorNumber + `: </label>
                <select id="motor` + motorNumber + `">
                    <option value="Spark">Spark</option>
                    <option value="TalonFX">TalonFX</option>
                </select>
            `;

            //adds the motor to html, then adds it to the array
            document.getElementById("motorArray").appendChild(motorDiv);
            motorsArray.push(motorDiv);
        }
    } else if (numberOfMotors < motorsArray.length) {
        //get rid of motors
        for (i = 0; i < difference; i++) {
            //removes the motor from html, then removes it from the array
            motorsArray[motorsArray.length - 1].remove();
            motorsArray.pop();
        }
    }

    runScriptMaker();

    setTimeout(motorInput, 100);
}

motorInput();

copyButton.addEventListener("click", function () {
    navigator.clipboard.writeText(copyScript);
});