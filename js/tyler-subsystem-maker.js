//hi 🤪
function createSubsystem(typeBase, motors){
    var subsystemCode = `
    package common.core.subsystems;

    import java.util.List;
    import java.util.function.Consumer;

    import common.hardware.motorcontroller.NAR_Motor;
    import common.hardware.motorcontroller.NAR_Motor.Neutral;
    import edu.wpi.first.wpilibj2.command.Command;
    import edu.wpi.first.wpilibj2.command.SubsystemBase;
    import static edu.wpi.first.util.ErrorMessages.requireNonNullParam;
    `;
    
    return null;
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