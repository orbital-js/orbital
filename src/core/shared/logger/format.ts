import chalk from 'chalk';
import { Level } from './level';

/** Formats message to be diplayed to the user */
export function format(message: string, level: Level, prefix: string): string {
    let levelLabel = '';

    switch (level) {
        case Level.INFO:
            levelLabel = chalk.greenBright('[' + level + ']');
            break;
        case Level.WARN:
            levelLabel = chalk.yellowBright('[' + level + ']');
            break;
        case Level.ERROR:
            levelLabel = chalk.redBright('[' + level + ']');
            break;
    }

    return chalk.blue('[' + prefix + ']') + ' ' + levelLabel + ' ' + message;
}
