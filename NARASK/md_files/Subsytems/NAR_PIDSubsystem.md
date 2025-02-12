# NAR_PIDSubsystem.java

## Preamble
This documentation outlines the key functionalities, methods, and configurations required to effectively utilize NARPIDSubsystem.

Authors: Timothy Dimmock (Timmy), Avani Goyal
### Overview
The NAR_PIDSubsystem is an abstract class designed for subsystems that utilize a PID controller. It extends SubsystemBase and provides vaarious functionalities for controlling and monitoring a system using PID.
### Key Features
- PID Control: uses a ControllerBase for proportional-integral-derivative PID control
- Setpoint Testing: supports system tests to ensure setpoints are met.
- Safety Mechanism: Safety threshold checks and automating disabling under unsafe conditions.
- Flexible Config: Allows customization of input and output ranges, control tolerances, and disable conditions.
### Constructors
- NAR_PIDSubsystem(ControllerBase controller): creates a PID subsystem using the given ControllerBase
- NAR_PIDSubsystem(ControllerBase controller, DoubleSupplier measurement, DoubleConsumer useOutput): allows specifying a measurement source and output function.
NAR_PIDSubsystem(ControllerBase controller, List<NAR_Motor> motors)

Configures PID control using multiple motors.

Core Functionalities

Periodic Execution

public void periodic()

Runs every loop cycle.

Uses PID output if enabled.

Checks safety conditions and constraint violations.

Logs velocity and acceleration changes if logging is enabled.

Setpoint Testing

public class SetpointTest extends SystemsTest

Provides a structured test for checking setpoint stability.

Logs expected vs. actual time taken to reach a setpoint.

Registers the test in Tester.

Methods:

initialize(): Resets the timer and starts the test.

execute(): Monitors setpoint adherence.

end(boolean interrupted): Logs test results.

isFinished(): Determines if the test has completed.

add(): Adds the test to the subsystem tester.

PID Control

public void startPID(double setpoint)

Enables PID and sets a new target setpoint.

public void enable()

Enables the PID controller and resets internal states.

public void disable()

Disables the PID controller and stops output.

public boolean isEnabled()

Checks whether the PID controller is enabled.

public boolean atSetpoint()

Returns true if the system has reached the setpoint.

Safety Mechanisms

public void onSafetyTimeout()

Disables PID when the safety timeout is reached.

public void addDisableCondition(BooleanSupplier condition)

Adds a condition that can disable PID.

Configuration Methods

public void setTolerance(double positionTolerance)

Sets the allowable error for considering the system "at setpoint".

public void setSafetyThresh(double timeSeconds)

Defines the timeout period before PID disables for safety.

public void setUpdateTime(double timeSeconds)

Sets the interval for logging measurement updates.

public void setInputRange(double minimumInput, double maximumInput)

Defines the expected input range.

public void setOutputRange(double minimumOutput, double maximumOutput)

Defines the expected output range.

public void enableContinuousInput(double minimumInput, double maximumInput)

Allows the system to interpret max and min inputs as a circular range.

Logging and Debugging

public void initShuffleboard()

Initializes Shuffleboard with PID and FF debug elements.

Includes setpoint, output, and controller status tracking.

public boolean isDebug()

Returns whether debug mode is enabled.

