import { Logger } from '../shared';

export class CommandNotFoundError extends Error {
    constructor(commandName: string) {
        const message = `Could not find command: '${commandName}'.`
            + `Make sure it has been imported into your 'declarations' array.`;
        Logger.error(message);
        super(message);
    }
}
