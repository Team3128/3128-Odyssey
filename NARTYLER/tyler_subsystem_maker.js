//hi 🤪
//var typeInput = document.getElementById("type");
var numberOfMotors = document.getElementById("num");
var motors = [];
var output = document.getElementById("output");
var refreshButton = document.getElementById("sumbitNum");

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
    fullScript += help;

    output.innerText = fullScript;
}

function changeMotorInputs() {
    if (motors.length > numberOfMotors.value) {
        //decreasing number of slots
        for (i = 0; i < numberOfMotors.value - motors.length; i++) {
            
        }
        motors[numberOfMotors.value].remove();
        motors = motors.slice(0, numberOfMotors.value - 1);
    } else if (motors.length < numberOfMotors.value) {
        //increasing number of slots

        for (i = 0; i < numberOfMotors.value - motors.length; i++) {
            var numOfArray = i + numberOfMotors.value;

            var div = document.createElement("div");

            div.innerHTML =
            '<div id="motorArray">\n'+
            '<label for="motor1">Motor 1: </label>\n'+
            '<select id="motor1">\n'+
                '<option value="CAN">Talon</option><option value="PWM">Spark Flex</option>\n' +
            '</select>\n'+
            '</div>\n'+

            document.body.appendChild(div);

            motors[numOfArray - 1] = div;
        }
    }

    console.log(motors.length);
}

setInterval(changeMotorInputs, 2000);
setInterval(createSubsystem, 100);

//types we could have: can, pwm
//class name