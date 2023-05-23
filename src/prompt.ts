import fs from 'fs';
import inquirer from 'inquirer';
import { logMessage, MESSAGE_TYPES } from './log.js';
import { iosSimulator } from './ios.js';

export const askToSelectEmulator = async (emulators: string[] | iosSimulator[]) => {
    const questions = [
        {
            type: 'list',
            name: 'deviceName',
            message: 'Which emulator do you want to start?',
            choices: emulators
        }
    ];

    logMessage(MESSAGE_TYPES.NOTIFY, 'Emulator CLI Helper');

    if (emulators.length > 0) {
        const answer = await inquirer.prompt(questions);
        return answer.deviceName;
    } else {
        logMessage(MESSAGE_TYPES.ERROR, 'NO EMULATOR SPECIFIED');
    }

    return emulators.at(0);
};

export const askToProvidePath = async () => {
    const question = {
        type: 'input',
        name: 'path',
        message: 'Please provide a path to the app file',
        validate: (value: string) => {
            if (!fs.existsSync(value)) {
                return 'Please provide a valid path to the app file';
            }
            return true;
        }
    };

    const answer = await inquirer.prompt([question]);

    return answer.path;
};
