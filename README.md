# start-emulator

`start-emulator` is a wrapper over [start-ios-simulator](https://github.com/wswebcreation/start-ios-simulator) and [start-android-emulator](https://github.com/wswebcreation/start-android-emulator) cli utilities developed by [@wswebcreation](https://github.com/wswebcreation). 

This cli solves next problems:
 - allows passing emulator/simulator options via arguments
 - persist previously selected arguments to not refill prompts every time
 - have same command syntax for starting emulated device instead of guessing is it emulator or simulator

On top of it there is also a command to install app onto a booted device.

## Install 
- yarn
    ```bash
    yarn global add start-emulator
    ```

- npm 
    ```bash
    npm install -g start-emulator
    ```

## Examples

- android:
    ```bash
        start-emulator android

        # get help
        yarn start-emulator android --help
        
        # wipe data
        start-emulator android --wipe
        
        # use 8.8.8.8 dns
        start-emulator android --dns

        # specify device
        start-emulator android --emulator Pixel_3a_API_26

        # if you do not want to use previously stored emulator name:
        start-emulator android --force
    ```

- ios: 
    ```bash
        start-emulator ios
        
        # get help
        start-emulator ios --help

        # specify device
        start-emulator ios -e "iPhone 14 Pro 16.1"

        # if you do not want to use previously stored emulator name:
        start-emulator ios --force
    ```

- install app
    ```bash
        # android
        start-emulator install android --path "absolute_path_to_android_apk"

        # when you have passed path once, it could be reused automatically
        start-emulator install android

        # ios
        start-emulator install ios --path "absolute_path_to_ios_app"

        # when you have passed path once, it could be reused automatically
        start-emulator install ios
    ```

- check which info is stored by this cli
    ```bash
        start-emulator config
    ```

- check version
    ```bash
        start-emulator -V
        start-emulator --version
    ```