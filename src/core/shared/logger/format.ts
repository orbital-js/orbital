import chalk from 'chalk';
import { Level } from './level';

/** Formats message to be diplayed to the user */
export function format(message: string, level: Level, prefix: string): string {
    let levelLabel = '';

    switch (level) {
        case Level.INFO:
            levelLabel = chalk.green('[' + level + ']');
            break;
        case Level.WARN:
            levelLabel = chalk.yellow('[' + level + ']');
            break;
        case Level.ERROR:
            levelLabel = chalk.red('[' + level + ']');
            break;
    }

    return chalk.blue('[' + prefix + ']') + ' ' + levelLabel + ' ' + message;
}
