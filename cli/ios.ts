import { Command, Option } from '@commander-js/extra-typings';
import { getAllSimulators, runSimulator } from '../src/ios.js';
import { ConfigKey, conf } from '../config/storage.js';
import { askToSelectEmulator } from '../src/prompt.js';

const simulators = getAllSimulators() || [];
const simulatorsNames = simulators.map((simulator) => simulator.name);

export const ios = new Command('ios')
    .description('start android emulator')
    .addOption(new Option('-e, --emulator <emulator>', 'specify simulated device').choices(simulatorsNames))
    .addOption(new Option('-f, --force', 'avoid reusing stored device name').default(false))
    .action(async (options) => {
        const simulatorName =
            options.emulator ||
            (!options.force && conf.has(ConfigKey.iosDevice) && conf.get(ConfigKey.iosDevice)) ||
            (await askToSelectEmulator(simulators));

        if (simulatorName) {
            conf.set(ConfigKey.iosDevice, simulatorName);
        }

        const simulator = simulators.find((simulator) => simulator.name === simulatorName);

        if (!simulator) {
            throw new Error(`simulator ${simulatorName} not found`);
        }

        runSimulator(simulator);
    });
