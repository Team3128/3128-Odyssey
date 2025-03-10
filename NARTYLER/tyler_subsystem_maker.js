//hi 🤪
var typeInput = document.getElementById("type");
var motorInput = document.getElementById("type");
var output = document.getElementById("output");

var variables =  `
package frc.team3128.subsystems;
import common.core.subsystems.VoltageSubsystemBase;
import common.hardware.motorcontroller.NAR_CANSpark;
import common.hardware.motorcontroller.NAR_CANSpark.ControllerType;
import common.hardware.motorcontroller.NAR_Motor.MotorConfig;
`;

var help = `
import static frc.team3128.Constants.IntakeConstants.*;

public class Intake extends VoltageSubsystemBase {

    private static Intake instance;

    public static NAR_CANSpark rollerMotor = new NAR_CANSpark(ROLLER_ID, ControllerType.CAN_SPARK_FLEX);
    
        private Intake() {
            super(CURRENT_THRESHOLD, rollerMotor);
    }

    @Override
    protected void configMotors() {
        MotorConfig intakeConfig = new MotorConfig(
            ROLLER_GEAR_RATIO,
            ROLLER_SAMPLE_PER_MINUTE,
            ROLLER_STATOR_CURRENT_LIMIT,
            ROLLER_INVERT,
            ROLLER_NEUTRAL_MODE,
            ROLLER_STATUS_FRAME
        );

        rollerMotor.configMotor(intakeConfig);
    }

    public static Intake getInstance() {
        if (instance == null) {
            instance = new Intake();
        }

        return instance;
    }
}
`;









function createSubsystem(typeBase, motors){  
    var fullScript = `//copy and paste this:
    `;
    fullScript += variables;
    fullScript += typeInput;


    output.innerText = fullScript;
}


createSubsystem(
    "Velocity", //TYPE
    [//MOTORS
    ["motor1", "Kraken"],
    ["motor2","Kraken"]
    ]
);

//types we could have: velocity, voltage, position
//motor types: kraken, neo, 
//motor controlelrs: talon, spark max, spark flex