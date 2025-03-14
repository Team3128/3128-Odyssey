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
    var subsystemName = nameInput.value;

    fullScript += variables;

    if (subsystemName == "") {
        subsystemName = "CustomSubsystem";
    }

    fullScript += "public class " + subsystemName + " extends SubsystemBase {\n\n";
    fullScript += "    private static " + subsystemName + " subsystem; \n\n"

    for (var i = 0; i < motors.length; i++) {
         var motorType = document.getElementById("motor" + String(i + 1)).value;
         if (motorType == "CAN") {
            fullScript += "    public static Spark " + "motor" + String(i + 1) + ";\n";
         } else {
            fullScript += "    public static VictorSP " + "motor" + String(i + 1) + ";\n";
         }
    }

    fullScript += "\n";

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
    
                div.innerHTML =
                `<label for="motor` + String(i+1) +`">Motor ` + String(Number(lastAmountOfMotors) + i + 1) + `: </label>
                <select id="motor` + String(i+1) +`">
                    <option value="CAN">CAN</option>
                    <option value="PWM">PWM</option>
                </select>
                `;
    
                document.getElementById("motorArray").appendChild(div);
                motors[Number(lastAmountOfMotors) + i] = div;
            }
            lastAmountOfMotors = numberOfMotors.value;
        }
    }
    console.log(motors);
    createSubsystem();
}

setInterval(changeMotorInputs, 1500);