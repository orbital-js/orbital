import { OrbitalError } from './orbital-error';

export class MetadataError extends OrbitalError {
    constructor(commandName: string) {
        const message = `There has been an error parsing metadata on command: '${commandName}.`;
        super(message);
    }
}
