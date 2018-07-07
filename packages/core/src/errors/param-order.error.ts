import chalk from 'chalk';
import { OrbitalError } from './orbital-error';

export class ParamOrderError extends OrbitalError {
    constructor(commandName: string) {
        const message = 'All required params must precede optional params, but you have a required param '
            + `${chalk.red('after')} your first optional param in command ${chalk.bold(commandName)}.`;
        super(message);
    }
}
