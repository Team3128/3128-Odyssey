# Practicals

## Introduction

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

## Vision Practicals

### Flashing an Orange Pi
When you first start using an Orange Pi, the micro SD card needs to be flashed with the Orange Pi image:

1. Connect the SD card to your computer using a dongle.
2. Download and open [Balena Etcher](https://etcher.balena.io/)
3. Go to [Orange Pi releases page](https://github.com/PhotonVision/photonvision/releases) and download the latest version of the Orange Pi 5 (orangepi5.img.xz)
4. Use Balena Etcher to flash the Orange Pi file onto the SD card. Put the SD Card into the Orange Pi

### Flashing Cameras:
1. With your computer and camera, directly connect to the camera's wifi using a radio.
2. Open photonvision in a new window using photonvision.local:5800. The dashboard should show the camera feed directly on your computer.
3. In dashboard, make sure the type is set to "AprilTag."
4. Rename the camera under the cameras tab. To access this camera in the future, use cameraname.local:5800 where cameraname is the new name.
5. Under the settings tab, change the team number to 3128.
6. For calibration, open the cameras tab and print out the calibration board (an 8x8 charuco board) by pressing generate board (skip if you already have a calibration board)
7. Under the cameras tab, scroll down and press "start calibration" and begin your calibration by holding up the charuco board to the camera and lining it up with the dots on the screen. Repeat this 12 or more times. Make sure your resolution is set to 1280x720. 
8. When finished, press "finish calibration" and verify that the cameras can recognize april tags by holding one up to a camera. If the calibration is successful, there should be lines indicating the orientation and location of the april tag.

## Radio Practicals

### Radio Firmware Update
1. On the Vivid-Hosting [firmware releases page](https://frc-radio.vivid-hosting.net/miscellaneous/firmware-releases) download the proper firmware for the current firmware version you have. Always choose the Radio Variant.
2. Copy the SHA-256 key below the firmware you downloaded.
3. Paste that key into the Checksum box of the Firmware Upload section at the bottom of the configuration page we navigated to above.
4. Click Browse… and select the firmware file you downloaded.
5. Click the Upload button.

### Robot Radio Configuration
This section is used for configuring the VH-109 radio outside of competition. At competition, configuration will be done by a provided computer and manual configuration using this page should not be used.

1. Select Robot Radio Mode
2. Enter the team number
3. Enter the suffix, if desired. This will help identify your robot and distinguish it from other networks.
4. Enter the 6 GHz WPA/SAE key. This key will need to match the key on the Access Point you configure.
5. Enter the 2.4 GHz WPA/SAE key. This is the password team members will type in when connecting to the 2.4 GHz network, if available.

## NARDash

## Submodule Practicals