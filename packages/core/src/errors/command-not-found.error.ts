import chalk from 'chalk';
import { OrbitalError } from './orbital-error';

export class CommandNotFoundError extends OrbitalError {
    constructor(commandName: string) {
        const boldCommandName = chalk.bold(`'` + commandName + `'`);
        const message = `Could not find command: ${boldCommandName}. `
            + `Make sure it has been imported into your 'declarations' array.`;
        super(message);
    }
}
