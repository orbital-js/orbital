import chalk from 'chalk';
import { OrbitalError } from './orbital-error';

export class ParamUndefinedError extends OrbitalError {
    constructor(name: string) {
        const boldName = chalk.bold(name);
        const message = 'Param ' + boldName + ' is required, but was not defined. Please retry your command with ' +
            boldName + ' definded.';
        super(message);
    }
}
