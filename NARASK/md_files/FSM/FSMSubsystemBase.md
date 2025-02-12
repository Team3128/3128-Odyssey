# FSMSubsystemBase.java

## Preamble
This documentation explains how the FSMSubsystemBase code works. To access this section of the code, access the fsm folder under the common repository.

Authors: Timothy Dimmock (Timmy), Avani Goyal, Rishi Kumar
### Overview
The FSM, or finite-state machine, is defined by a list of states. When we create subsystems, we use the base code to define all of our constants. We then extend our subsystems from this base. All of the FSM subsystems come with a transition map, and most with a defaultTransitioner Function. The FSMSubsystemBase is an abstract Java class designed for managing the states of a subsystem. 
#### Logging and Debugging
- Log.debug() is used for detailed logging
- log.recoverable() handles warnings (e.g., null states)
- log.unusual() records invalid transitions
### States and Transitions
- currentState: current states of the FSM
- previousState: last state before transitioning
- currentTransition: the active transition (if any)
- requestTransition: requested transition
- transitionMap: stores valid transitions
### Constructor
- Initializes enum class and transitionMap
- begins tracking state data (initStateTracker() integrates with shuffleboard to displace useful FSM data).
- registers transitions
### Managing States and Transitions
- setState(S nextState) handles state transitions. It gets the transition between the current state and the requested state.
- setStateCommand(S nextState)  returns a command that sets the states when it's executed.
- stateEquals(S otherState) returns true if the current state matches other state and there is no transition occuring.
- isTransitioning() returns true if a transition is in progress.
- addTransition() adds a new transition between two states to the transition map.
- registerTransitions() is an abstract method that must be implemented in subclasses to define valid state transitions.
### Managing Subsystems
- addSubsystem() adds subsystems to the FSM for coordinated control.
- reset() stops the FSM and resets all associated subsystems.
- getSubsystems() and getSubsystem(String name) retrieve all added subsystems or a specific one by name.
- setNeutralMode() sets the neutral mode of the motors for all associated subsystems.
### Running Commands
- run(double power) runs all subsystems at a specified power level and logs the action.
- runVolts(double volts) runs all subsystems at a specified voltage and logs the action.
- stop() cancels any active transition and stops all subsystems.
