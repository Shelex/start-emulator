import { Argument, Command, Option } from '@commander-js/extra-typings';
import { conf } from '../config/storage.js';
import { appName } from '../config/env.js';

export const config = new Command('config').description(`check ${appName} configuration`).action(() => {
    console.log(JSON.stringify(conf.store, null, 2));
});
