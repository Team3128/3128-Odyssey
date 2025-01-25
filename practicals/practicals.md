# Practicals

## Preamble
Code itself is not the only knowledge required to succeed in the Controls department. 
This documentation functions as a place to add any miscillaneous information, both on the software and wiring side, that will help members.

Authors: William Yuan (Wallim), Audrey Zheng, Maggie Liang

## Orange Pi Configuration and Testing 
__Flashing an Orange Pi__
<p>When you first start using an Orange Pi, the micro SD card needs to be flashed with the Orange Pi image:</p>

1. Connect the SD card to your computer using a dongle.
2. Download and open [Balena Etcher](https://etcher.balena.io/)
3. Go to [Orange Pi releases page](https://github.com/PhotonVision/photonvision/releases) and download the latest version of the Orange Pi 5 (orangepi5.img.xz)
4. Use Balena Etcher to flash the Orange Pi file onto the SD card. Put the SD Card into the Orange Pi

__Wiring an Orange Pi on Test Bench:__
- INCOMPLETE

__Flashing Cameras:__
1. Connect your camera directly to your computer via a JST to USB wire
2. Using either the calibration board or the [calibration pattern](https://www.calibdb.net/board.png) on a separate screen
3. Open up [calibDB](https://www.calibdb.net) and press the “Calibrate” button. Hold up your ChArUco board to the camera and line it up with the displayed pattern.
4. When you’re done, make sure to select the correct resolution and download the JSON file. Next, connect to Photon Vision and navigate to the “Camera” tab. Select “Import from CalibDB” and upload the JSON. 


### Limelight


### Radios


### NARDash
