import edu.wpi.first.wpilibj2.command.Command;
import edu.wpi.first.wpilibj2.command.SubsystemBase;

public class Subsystem extends SubsystemBase{

    public static Motor motor;

    public Subsystem(Motor motor) {
        this.motor = motor;
    }

    public Command run() {
        return ;
    }

    public Command stop() {
        return ;
    }
}
