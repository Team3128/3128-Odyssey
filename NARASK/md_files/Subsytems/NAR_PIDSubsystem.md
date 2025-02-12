# NAR_PIDSubsystem.java

## Preamble
This documentation outlines the key functionalities, methods, and configurations required to effectively utilize NARPIDSubsystem.

Authors: Timothy Dimmock (Timmy), Avani Goyal
### Overview
The NAR_PIDSubsystem is an abstract class designed for subsystems that utilize a PID controller. It extends SubsystemBase and provides various functionalities for controlling and monitoring a system using PID.
- PID Control: uses a ControllerBase for proportional-integral-derivative PID control
- Setpoint Testing: supports system tests to ensure setpoints are met.
- Safety Mechanism: Safety threshold checks and automating disabling under unsafe conditions.
- Flexible Config: Allows customization of input and output ranges, control tolerances, and disable conditions.
### Constructors
- NAR_PIDSubsystem(ControllerBase controller): creates a PID subsystem using the given ControllerBase
- NAR_PIDSubsystem(ControllerBase controller, DoubleSupplier measurement, DoubleConsumer useOutput): lets you specify a measurement source and output function.
- NAR_PIDSubsystem(ControllerBase controller, List<NAR_Motor> motors): configures PID control using multiple motors.
### Code Functionalities
- Periodic Execution: public void periodic() Runs every loop cycle, uses PID output if enabled, checks safety conditions and constraint violations, and logs velocity and acceleration changes if logging is enabled.
- Setpoint Testing: the class SetpointTest extends SystemsTest and provides a structured test for checking setpoint stability, logs expected vs. actual time taken to reach a setpoint, and registers the test in Tester.
  - Methods:
    - initialize(): Resets the timer and starts the test.
    - execute(): Monitors setpoint adherence.
    - end(boolean interrupted): Logs test results.
    - isFinished(): Determines if the test has completed.
    - add(): Adds the test to the subsystem tester.
- PID Control
  - public void setkG_Function(DoubleSupplier kg_Function) sets the kG function to the given. 
  - public void startPID(double setpoint) enables PID and sets a new target setpoint.
  - public void enable() enables the PID controller and resets internal states.
  - public void disable() disables the PID controller and stops output.
  - public boolean isEnabled() returns true when the PID controller is enabled.
  - public boolean atSetpoint() returns true if the system has reached the setpoint.
- Safety Mechanisms
  - public void onSafetyTimeout() disables PID when the safety timeout (a time limit that can be harmful to the robot when surpassed) is reached.
  - public void addDisableCondition(BooleanSupplier condition) adds a condition that can disable PID.
- Configuration Methods
  - public void setTolerance(double positionTolerance) sets the allowable error for considering the system "at setpoint".
  - public void setSafetyThresh(double timeSeconds) defines the timeout period before PID disables for safety.
  - public void setUpdateTime(double timeSeconds) sets the interval for logging periodic updates.
  - public void setInputRange(double minimumInput, double maximumInput) defines the expected input range.
  - public void setOutputRange(double minimumOutput, double maximumOutput) defines the expected output range.
  - public void enableContinuousInput(double minimumInput, double maximumInput) rather than using the max and min input range as constraints, it considers them to be the same point and automatically calculates the shortest route to the setpoint.
