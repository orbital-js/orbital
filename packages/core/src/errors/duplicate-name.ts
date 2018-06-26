import { Logger } from '../shared';

export class DuplicateNameError extends Error {
    constructor(name: string) {
        const message = `CLI modules defines two commands with conflicting names: [${name}]`;
        Logger.error(message);
        super(message);
    }
}
