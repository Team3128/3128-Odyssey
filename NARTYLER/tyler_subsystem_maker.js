//hi 🤪
//var typeInput = document.getElementById("type");
var numberOfMotors = document.getElementById("num");
var motors = [];
var output = document.getElementById("output");
var refreshButton = document.getElementById("sumbitNum");

var variables =  `
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









function createSubsystem(typeBase, motors){  
    var fullScript = `//copy and paste this:
    `;
    fullScript += variables;
    fullScript += help;


    output.innerText = fullScript;
}


createSubsystem(
    "Velocity", //TYPE
    [//MOTORS
    ["motor1", "Kraken"],
    ["motor2","Kraken"]
    ]
);

function changeMotorInputs() {
    if (motors.length > numberOfMotors) {
        for (i = 0; i < motors.length - numberOfMotors; i++) {

        }
    } else if (motors.length < numberOfMotors) {
        for (i = 0; i < numberOfMotors - motors.length; i++) {
            
        }
    }

    var motors = [];
}

setInterval(changeMotorInputs, 100);
setInterval(createSubsystem, 100);

//types we could have: velocity, voltage, position
//motor types: kraken, neo, 
//motor controlelrs: talon, spark max, spark flex
//class name