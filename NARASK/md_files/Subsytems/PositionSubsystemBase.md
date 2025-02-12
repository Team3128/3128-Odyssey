# PositionSubsystemBase.java

## Preamble
This documentation outlines the key functionalities, methods, and configurations required to effectively utilize PositionSubsystemBase.

Authors: Tyler, Tyler Enderwick

## Overview
PositionSubsystemBase is an abstract class that extends NAR_PIDSubsystem and implements NAR_Subsystem.

## Constructor
The code below creates a new object using a ControllerBase and motors.
```java
PositionSubsystemBase(ControllerBase controller, NAR_Motor... motors)
```
## Methods
- ```configMotors()``` configures motor settings.
- ```configController()``` configures controller settings.
- ```apply(Consumer<NAR_Motor> action)``` applies an action to every motor.
- ```applyCommand(Consumer<NAR_Motor> action)``` returns a command to apply an action to every motor.
- ```run(double power)``` sets the power for the motors.
- ```runCommand(double power));``` returns a command to set the power for the motors.
- ```runVolts(double volts)``` sets the voltage for the motors.
- ```runVoltsCommand(double volts)``` returns a command to set the voltage for the motors.
- ```stop()``` stops all motors.
- ```stopCommand()``` returns a command which stops all motors.
- ```pidTo(double setpoint)``` Sets the controller setpoint and enables the controller.
- ```pidTo(DoubleSupplier setpoint)``` Sets the controller setpoint and enables the controller.
- ```reset()``` resets the measurement position to the controller position minimum.
- ```resetCommand()```returns a command which resets the measurement position to the controller position minimum.
- ```reset(double position)``` resets the measurement position.
- ```resetCommand(double position)``` returns a command which resets the measurement position.
- ```getCurrent()``` returns the current of the first motor given in the constructor.
- ```setNeutralMode(Neutral mode)``` turns on neutral mode.
- ```getPosition()``` returns the position of the first motor.
- ```getVelocity()``` returns the velocity of the first motor given in the constructor.
- ```homing(double power, double delay, double currentLimit)``` homes the subsystem.
- ```characterization(double startDelaySecs, double rampRateVoltsPerSec)``` helps find constants for PID.
- ```characterization(double startDelaySecs, double rampRateVoltsPerSec, double startPosition, double endPosition)``` returns a command to help find constants for PID.
