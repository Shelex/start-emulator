import Conf from 'conf';
import { appName } from './env.js';

export enum ConfigKey {
    androidDevice = 'androidEmulator',
    androidApk = 'androidApk',
    iosDevice = 'iosDeviceName',
    iosApp = 'iosApp'
}

const stringSchema = {
    type: 'string'
};

const schema = {
    [ConfigKey.androidDevice]: stringSchema,
    [ConfigKey.iosDevice]: stringSchema,
    [ConfigKey.androidApk]: stringSchema,
    [ConfigKey.iosApp]: stringSchema
};

export const conf = new Conf({
    projectName: appName,
    schema,
    encryptionKey: `verysecret${appName}key`,
    clearInvalidConfig: true
});
