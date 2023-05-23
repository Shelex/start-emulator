import chalk, { ChalkInstance } from 'chalk';

export const MESSAGE_TYPES = {
    ERROR: 'error',
    NOTIFY: 'notify',
    STEP: 'step',
    WARNING: 'warning'
};

type MessageType = (typeof MESSAGE_TYPES)[keyof typeof MESSAGE_TYPES];

const formats = {
    newLine: (message: string) => `\n${message}`,
    withSeparator: (message: string) => `
    ====================================================================================================
      
      ${message}
      
    ====================================================================================================
    `
};

type MessageFormatter = (message: string) => string;

interface Logger {
    color: ChalkInstance;
    format: MessageFormatter;
}

export const logMessage = (type: MessageType, message: string) => {
    const colors: Record<MessageType, Logger> = {
        [MESSAGE_TYPES.ERROR]: {
            color: chalk.red,
            format: formats.withSeparator
        },
        [MESSAGE_TYPES.NOTIFY]: {
            color: chalk.cyan,
            format: formats.withSeparator
        },
        [MESSAGE_TYPES.STEP]: {
            color: chalk.green,
            format: formats.newLine
        },
        [MESSAGE_TYPES.WARNING]: {
            color: chalk.yellow,
            format: formats.newLine
        }
    };

    const { color, format } = colors[type] || colors[MESSAGE_TYPES.NOTIFY];

    console.log(color(format(message)));
};
