import updateNotifier from 'update-notifier';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const packageJSON = require('../package.json');
export const version = packageJSON?.version ?? '0.0.0';

const oneDay = 24 * 60 * 60 * 1000;
const notifier = updateNotifier({
    pkg: packageJSON,
    updateCheckInterval: oneDay,
    shouldNotifyInNpmScript: true
});

notifier.notify();
