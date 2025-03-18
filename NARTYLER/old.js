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

        if (motorType == "PWMSparkFlex") {
            fullScript += "    public static PWMSparkFlex " + motorName + ";\n";
        } else if (motorType == "PWMTalonFX") {
            fullScript += "    public static PWMTalonFX " + motorName + ";\n";
        } else {
            fullScript += "    public static PWMSparkMax " + motorName + ";\n";
        }
    }

    fullScript += "\n";
    fullScript += `    public `+ subsystemName +`(`

    for (var i = 0; i < numberOfMotors; i++) {
        var motorName = "motor" + String(i + 1)
        var motorType = document.getElementById(motorName).value;

        if (motorType == "PWMSparkFlex") {
            fullScript += "PWMSparkFlex " + motorName;
        } else if (motorType == "PWMTalonFX") {
            fullScript += "PWMTalonFX " + motorName;
        } else {
            fullScript += "PWMSparkMax " + motorName;
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