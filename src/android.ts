/**
 * Refactored code from https://github.com/wswebcreation/start-android-emulator
 * @author wswebcreation
 */

import { spawnSync, execFileSync } from 'child_process';
import { existsSync } from 'fs';
import { join, normalize } from 'path';
import { platform } from 'os';
import { env } from '../config/env.js';
import { logMessage, MESSAGE_TYPES } from './log.js';

const OS_TYPE = platform();

interface AndroidOptions {
    emulator: string;
    wipeData: boolean;
    dnsServer: boolean;
    shell?: boolean;
}

/**
 * Start the emulator based on all the answers
 */
export function startEmulator(options: AndroidOptions) {
    try {
        // Start logging that we start
        logMessage(
            MESSAGE_TYPES.NOTIFY,
            `${options.emulator} is being started. You can close the device with 'X'-button on the toolbar of the device.`
        );

        if (OS_TYPE === 'win32') {
            options.shell = true;
        }

        // Start the emulator
        const runOnEmulator = spawnSync(
            normalize(join(env.androidHome, '/emulator/emulator')),
            ['-avd', options.emulator, options.wipeData ? '-wipe-data' : '-no-snapshot'].concat(
                options.dnsServer ? ['-dns-server', '8.8.8.8'] : []
            ),
            options
        );

        logMessage(MESSAGE_TYPES.WARNING, runOnEmulator.stdout.toString());

        // Check if there is an error and throw it
        const stderr = runOnEmulator.stderr.toString();
        if (stderr) {
            throw new Error(stderr);
        }
        process.exit(0);
    } catch (e) {
        let errorMessage;

        if (e.message.includes("Cannot read property 'toString' of null")) {
            errorMessage =
                'It looks like the `emulator` has not been set correct in your environment variables. ' +
                'Please check this article on how to fix it.' +
                '\n\n  https://bit.ly/2XD94gV';
        } else if (!existsSync(env.androidHome)) {
            errorMessage =
                'The environment variable `ANDROID_HOME` is not found. Did you set your `ANDROID_HOME` correct?';
        } else {
            errorMessage = `The error\n\n${e}\n\n  occurred and the emulator couldn't be started.   !Check Google what the problem could be!`;
        }

        // Now log the error message
        logMessage(MESSAGE_TYPES.ERROR, errorMessage);
    }
}

/**
 * GEt all the emulators that are installed
 */
export function getEmulators() {
    const emulators = execFileSync(normalize(join(env.androidHome, '/emulator/emulator')), ['-list-avds'], {
        encoding: 'utf8'
    })
        .replace(/\n$/, '')
        .split('\n');

    return emulators.filter((e) => !!e);
}

export function installApp(appPath: string) {
    logMessage(MESSAGE_TYPES.STEP, `${appPath} wil be installed to booted simulator.`);
    execFileSync('adb', ['install', appPath], { encoding: 'utf8' });
}
