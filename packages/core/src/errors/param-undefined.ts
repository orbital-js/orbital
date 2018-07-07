import chalk from 'chalk';
import { Logger } from '../shared';

export class ParamUndefinedError extends Error {
    constructor(name: string) {
        const boldName = chalk.bold(name);
        const message = 'Param ' + boldName + ' is required, but was not defined. Please retry your command with ' +
            boldName + ' definded.';
        Logger.error(message);
        super(message);
    }
}
