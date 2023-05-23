/**
 * Refactored code from https://github.com/wswebcreation/start-ios-simulator
 * @author wswebcreation
 */

import { exec, execFileSync } from 'child_process';
import { logMessage, MESSAGE_TYPES } from './log.js';

export interface iosSimulator {
    name: string;
    state: 'Booted' | 'Shutdown' | string;
    udid: string;
    isAvailable: boolean;
    version: string;
}

/**
 * Get all the simulators that are hosted on the local machine
 */
export function getAllSimulators(): iosSimulator[] {
    const simulators = [] as iosSimulator[];
    const devices = JSON.parse(
        execFileSync('xcrun', ['simctl', 'list', '--json', 'devices'], { encoding: 'utf8' })
    ).devices;

    Object.keys(devices)
        .filter((version) => version.includes('iOS'))
        .forEach((version) =>
            devices[version].map((simulator: any) =>
                simulators.push({
                    ...(simulator as iosSimulator),
                    name: `${simulator.name} ${version.split('-')[1]}.${version.split('-')[2]}`,
                    version: version.split(' ')[1]
                } as iosSimulator)
            )
        );

    return simulators;
}

/**
 * Shut down a booted simulator
 */
function closeBootedSimulator(chosenSimulator: iosSimulator) {
    if (chosenSimulator.state === 'Booted') {
        logMessage(MESSAGE_TYPES.WARNING, `The ${chosenSimulator.name} is already opened. It will be closed.`);
        execFileSync('xcrun', ['simctl', 'shutdown', chosenSimulator.udid], { encoding: 'utf8' });
        logMessage(MESSAGE_TYPES.STEP, `${chosenSimulator.name} has been shut down.`);
    }
}

/**
 * Boot a chosen simulator
 */
function bootSimulator(chosenSimulator: iosSimulator) {
    execFileSync('xcrun', ['simctl', 'boot', chosenSimulator.udid], { encoding: 'utf8' });
    logMessage(MESSAGE_TYPES.STEP, `${chosenSimulator.name} wil be booted.`);
}

/**
 * Start the Simulator app
 */
function startSimulator(chosenSimulator: iosSimulator) {
    logMessage(MESSAGE_TYPES.STEP, `${chosenSimulator.name} wil be opened.`);
    execFileSync('open', ['-a', 'Simulator.app'], { encoding: 'utf8' });
}

export function installApp(appPath: string) {
    logMessage(MESSAGE_TYPES.STEP, `${appPath} wil be installed to booted simulator.`);
    execFileSync('xcrun', ['simctl', 'install', 'booted', appPath], { encoding: 'utf8' });
}

export function runSimulator(chosenSimulator?: iosSimulator) {
    if (!chosenSimulator) {
        return;
    }
    closeBootedSimulator(chosenSimulator);
    bootSimulator(chosenSimulator);
    startSimulator(chosenSimulator);

    logMessage(MESSAGE_TYPES.NOTIFY, 'Thank you for using iOS iPhone|iPad CLI Helper');
}
