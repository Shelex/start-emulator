import { Command, Option } from '@commander-js/extra-typings';
import { installApp as installAndroid } from '../src/android.js';
import { installApp as installIos } from '../src/ios.js';
import { ConfigKey, conf } from '../config/storage.js';
import { askToProvidePath } from '../src/prompt.js';

export const install = new Command('install').description('install app from path');

for (const platform of ['android', 'ios']) {
    const command = new Command(platform)
        .description(`install ${platform} app from path`)
        .addOption(new Option('-p, --path <path>', `specify path to ${platform} app file`))
        .action(async (options) => {
            const configKeyName = platform === 'android' ? ConfigKey.androidApk : ConfigKey.iosApp;

            if (!options.path && conf.has(configKeyName)) {
                console.log(`will reuse ${configKeyName} from config`);
            }

            const filePath =
                options.path || (conf.has(configKeyName) && conf.get(configKeyName)) || (await askToProvidePath());

            if (filePath) {
                conf.set(configKeyName, filePath);
            }

            if (platform === 'android') {
                installAndroid(filePath);
            }

            if (platform === 'ios') {
                installIos(filePath);
            }
        });

    install.addCommand(command);
}
