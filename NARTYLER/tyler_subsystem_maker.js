//created by tyler enderwick
var motorNumberInput = document.getElementById("num");
var subsystemNameInput = document.getElementById("subName");
var output = document.getElementById("output");
var copyButton = document.getElementById("copy");

var motorsArray = [];

var numberOfMotors = 0;

var copyScript = "";

var variables =
    `package frc.robot;

import edu.wpi.first.wpilibj.motorcontrol.Spark;
import edu.wpi.first.wpilibj.motorcontrol.VictorSP;
import edu.wpi.first.wpilibj2.command.Command;
import edu.wpi.first.wpilibj2.command.SubsystemBase;
`;

function runScriptMaker() {
    var fullScript = ``;
    var subsystemName = subsystemNameInput.value;

    fullScript += variables;

    if (subsystemName == "") {
        subsystemName = "CustomSubsystem";
    }

    fullScript += "public class " + subsystemName + " extends SubsystemBase {\n\n";
    fullScript += "    private static " + subsystemName + " subsystem; \n\n"

    for (var i = 0; i < numberOfMotors; i++) {
        var motorName = "motor" + String(i + 1)
        var motorType = document.getElementById(motorName).value;

        if (motorType == "CAN") {
            fullScript += "    public static Spark " + motorName + ";\n";
        } else {
            fullScript += "    public static VictorSP " + motorName + ";\n";
        }
    }

    fullScript += "\n";
    fullScript += `    public `+ subsystemName +`(`

    for (var i = 0; i < numberOfMotors; i++) {
        var motorName = "motor" + String(i + 1)
        var motorType = document.getElementById(motorName).value;

        if (motorType == "CAN") {
            fullScript += "Spark " + motorName;
        } else {
            fullScript += "VictorSP " + motorName;
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
            if (subsystem == null) {
                subsystem = new Subsystem(`;

    
    for (var i = 0; i < numberOfMotors; i++) {
        var motorName = "motor" + String(i + 1)

        fullScript += motorName

        if (i != numberOfMotors - 1) {
            fullScript += ", ";
        }else{
            fullScript += ");";
        }
    }

    fullScript += `}

        return subsystem;
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
                    <option value="CAN">CAN</option>
                    <option value="PWM">PWM</option>
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