import { Command, Option } from '@commander-js/extra-typings';
import { getEmulators, startEmulator } from '../src/android.js';
import { ConfigKey, conf } from '../config/storage.js';
import { askToSelectEmulator } from '../src/prompt.js';

const emulators = getEmulators() || [];

export const android = new Command('android')
    .description('start android emulator')
    .addOption(new Option('-e, --emulator <emulator>', 'specify emulated device').choices(emulators))
    .addOption(new Option('-f, --force', 'avoid reusing stored device name').default(false))
    .addOption(new Option('-w, --wipe', 'delete all user data and copy data from the initial data file').default(false))
    .addOption(
        new Option('-d, --dns', `start with '-dns-server 8.8.8.8' (when the emulator doesn't has wifi)`).default(false)
    )
    .action(async (options) => {
        const androidHome = process.env.ANDROID_HOME;

        if (!androidHome) {
            throw new Error('ANDROID_HOME is not set');
        }

        const emulator =
            options.emulator ||
            (!options.force && conf.has(ConfigKey.androidDevice) && conf.get(ConfigKey.androidDevice)) ||
            (await askToSelectEmulator(emulators));

        if (emulator) {
            conf.set(ConfigKey.androidDevice, emulator);
        }

        startEmulator({
            wipeData: options.wipe,
            dnsServer: options.dns,
            emulator
        });
    });
