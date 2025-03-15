//created by tyler enderwick
var motorNumberInput = document.getElementById("num");
var subsystemNameInput = document.getElementById("subName");
//var subsystemTypeInput = document.getElementById("subsystemType");
var output = document.getElementById("output");
var copyButton = document.getElementById("copy");

var motorsArray = [];

var numberOfMotors = 0;

var copyScript = "";

var variables = 
`package frc.team3128.subsystems;

import common.hardware.motorcontroller.NAR_CANSpark;
import common.hardware.motorcontroller.NAR_TalonFX;

import edu.wpi.first.wpilibj2.command.Command;
import static edu.wpi.first.wpilibj2.command.Commands.runOnce;

`;

function runScriptMaker() {
    var fullScript = ``;
    var subsystemName = subsystemNameInput.value;

    fullScript += variables;

    if (subsystemName == "") {
        subsystemName = "CustomSubsystem";
    }

    fullScript += "public class " + subsystemName + " {\n\n";
    fullScript += "    private static " + subsystemName + " instance; \n\n"

    for (var i = 0; i < numberOfMotors; i++) {
        var motorName = "motor" + String(i + 1)
        var motorType = document.getElementById(motorName).value;

        if (motorType == "Spark") {
            fullScript += "    public static NAR_CANSpark " + motorName + ";\n";
        } else if (motorType == "TalonFX") {
            fullScript += "    public static NAR_TalonFX " + motorName + ";\n";
        }
    }

    fullScript += "\n";
    fullScript += `    public `+ subsystemName +`(`

    for (var i = 0; i < numberOfMotors; i++) {
        var motorName = "motor" + String(i + 1)
        var motorType = document.getElementById(motorName).value;

        if (motorType == "Spark") {
            fullScript += "NAR_CANSpark " + motorName;
        } else if (motorType == "TalonFX") {
            fullScript += "NAR_TalonFX " + motorName;
        }

        if (i != numberOfMotors - 1) {
            fullScript += ", ";
        }
    }

    fullScript += ") { \n";

    for (var i = 0; i < numberOfMotors; i++) {
        var motorName = "motor" + String(i + 1)

        fullScript += "        this." + motorName + " = " + motorName + ";\n";
    }

    fullScript += `    }\n`;

    fullScript += "\n";

    fullScript +=
        `    public Command exampleCommand() {
        return runOnce(
            //run something here
            () -> {
        });
    }
    \n`;

    fullScript += 
    `    public ` + subsystemName + ` getInstance() {
        if (instance == null) {
            instance = new ` + subsystemName +`(`;

    
    for (var i = 0; i < numberOfMotors; i++) {
        var motorName = "motor" + String(i + 1)

        fullScript += motorName

        if (i != numberOfMotors - 1) {
            fullScript += ", ";
        }else{
            fullScript += ");";
        }
    }

    fullScript += `
        }

        return instance;
    }
}`;

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