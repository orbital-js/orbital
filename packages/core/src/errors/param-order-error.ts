import chalk from 'chalk';
import { Logger } from '../shared';

export class ParamOrderError extends Error {
    constructor(commandName: string) {
        const message = 'All required params must precede optional params, but you have a required param '
            + `${chalk.red('after')} your first optional param in command ${chalk.bold(commandName)}.`;
        Logger.error(message);
        super(message);
    }
}
