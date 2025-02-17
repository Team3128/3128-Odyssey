# Practicals

## Preamble
Code itself is not the only knowledge required to succeed in the Controls department. 
This documentation functions as a place to add any miscillaneous information, both on the software and wiring side, that will help members.

Authors: William Yuan (Wallim), Audrey Zheng, Maggie Liang, Lucas Han

## Swerve

### Cancoder Offsets
1. Set CANCoder offsets in SwerveConstants (e.g. `MOD0_CANCODER_OFFSET`) to `0` and deploy.
2. Align all wheels so each bevel faces the left of the robot.
3. Replace CANCoder offsets to the CANCoder offsets on Shuffleboard.

### Odometry doesn't work
1. Make sure motors __and CANCoders__ are ID'ed correctly. CANCoders may not be.

### ID'ing Swerve Devices
1. The module numbers are as follows, __in a top-down view__:
```
front
[0  1]
[2  3]
 back
```
2. Drive motors are `mod_num * 2 + 1`.
3. Angle motors are `mod_num * 2 + 2`.
4. CANCoders are `10 + mod_num`.
5. Pidgeon is `9`.

### Finding Robot MOI
1. Finding translational kA, run this command
```java
controller.getButton(kA).onTrue(
    swerve.characterize(0, 1, 10)
        .beforeStarting(() -> swerve.zeroLock())
);
```
2. Finding rotational kA, run this command
```java
controller.getButton(kA).onTrue(
    swerve.characterize(0, 1, 10)
        .beforeStarting(() -> swerve.oLock())
);
```
3. $MoI=mass\times\frac{trackwidth}{2}\times\frac{kA_{angular}}{kA_{linear}}$

## Orange Pi Configuration and Testing 
### Flashing an Orange Pi
<p>When you first start using an Orange Pi, the micro SD card needs to be flashed with the Orange Pi image:</p>

1. Connect the SD card to your computer using a dongle.
2. Download and open [Balena Etcher](https://etcher.balena.io/)
3. Go to [Orange Pi releases page](https://github.com/PhotonVision/photonvision/releases) and download the latest version of the Orange Pi 5 (orangepi5.img.xz)
4. Use Balena Etcher to flash the Orange Pi file onto the SD card. Put the SD Card into the Orange Pi

### Wiring an Orange Pi on Test Bench:
- INCOMPLETE

### Flashing Cameras:
1. Connect your camera directly to your computer via a JST to USB wire
2. Using either the calibration board or the [calibration pattern](https://www.calibdb.net/board.png) on a separate screen
3. Open up [calibDB](https://www.calibdb.net) and press the “Calibrate” button. Hold up your ChArUco board to the camera and line it up with the displayed pattern.
4. When you’re done, make sure to select the correct resolution and download the JSON file. Next, connect to Photon Vision and navigate to the “Camera” tab. Select “Import from CalibDB” and upload the JSON. 


## Limelight


## Radios
### Connecting to Access Point (6GHz, AP) VH-109 Radio
1. Connect the radio through ethernet to your computer
2. Navigate to Wifi Settings
3. Select FRC-AP 3128
4. Select IP-assignment
5. Change from Automatic (DHCP) to Manual
6. Select IPv4
7. In IP address, type "10.31.28.{##}"
- ## can be any 2 or 3 digit number
8. In Subnet mask, type "255.255.255.0"
- this means to allow any network following exactly 10.31.28.#, and ignores everything else
9. Select Save

## NARDash
