//hi 🤪
//var typeInput = document.getElementById("type");
var numberOfMotors = document.getElementById("num");
var subsystemName = document.getElementById("subName");
var motors = [];
var output = document.getElementById("output");
var refreshButton = document.getElementById("sumbitNum");

var lastAmountOfMotors = 0;

var variables = `
package frc.robot;

import edu.wpi.first.wpilibj.motorcontrol.Spark;
import edu.wpi.first.wpilibj.motorcontrol.VictorSP;
import edu.wpi.first.wpilibj2.command.Command;
import edu.wpi.first.wpilibj2.command.SubsystemBase;
`;

var help = `
public class Subsystem extends SubsystemBase{

    private static Subsystem subsystem;

    public static Spark can;
    public static VictorSP pwm;

    public Subsystem(Spark can, VictorSP pwm) {
        this.can = can;
        this.pwm = pwm;
    }

    public Command run() {
        return runOnce(
        () -> {
            //run something here
        });
    }

    public Subsystem getInstance() {
        if (subsystem == null) {
            subsystem = new Subsystem(can, pwm);
        }

        return subsystem;
    }
}
`;









function createSubsystem() {
    var fullScript = ``;

    fullScript += variables;
    fullScript += "public class " + subsystemName + " extends SubsystemBase {";

    output.innerText = fullScript;
}

function changeMotorInputs() {
    if (numberOfMotors.value > 0) {
        if (lastAmountOfMotors > numberOfMotors.value) {

            for (i = 0; i < lastAmountOfMotors - numberOfMotors.value; i++) {
                motors[Number(numberOfMotors.value) + i].remove();
                motors = motors.slice(0, numberOfMotors.value + i);
            }

            //motors = motors.slice(0, numberOfMotors.value);
            lastAmountOfMotors = numberOfMotors.value;
        } else if (lastAmountOfMotors < numberOfMotors.value) {
            for (i = 0; i < numberOfMotors.value - lastAmountOfMotors; i++) {           
                var div = document.createElement("div");
    
                div.innerHTML =`
                <label for="motor1">Motor 1: </label>
                <select id="motor1">
                    <option value="CAN">Talon</option>
                    <option value="PWM">Spark Flex</option>
                </select>
                `;
    
                document.getElementById("motorArray").appendChild(div);
                console.log(lastAmountOfMotors, numberOfMotors.value)
                motors[Number(lastAmountOfMotors) + i] = div;
                console.log(motors);
            }
            lastAmountOfMotors = numberOfMotors.value;
        }
    }
    
}

setInterval(changeMotorInputs, 100);
setInterval(createSubsystem, 100);

//types we could have: can, pwm
//class name