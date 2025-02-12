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
