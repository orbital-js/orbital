import { Logger } from '../shared';

export class MetadataError extends Error {
    constructor(commandName: string) {
        const message = `There has been an error parsing metadata on command: '${commandName}.`;
        Logger.error(message);
        super(message);
    }
}
