#!/usr/bin/env node
import { argv } from 'process';
import { Command } from '@commander-js/extra-typings';
import { version } from './version.js';
import { android } from './android.js';
import { ios } from './ios.js';
import { install } from './install.js';
import { config } from './config.js';

const cli = new Command();

cli.version(version)
    .description('start android and ios emulators')
    .addCommand(android)
    .addCommand(ios)
    .addCommand(install)
    .addCommand(config)
    .parse(argv);
