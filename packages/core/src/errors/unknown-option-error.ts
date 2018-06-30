import { Logger } from '../shared';

export class UnknownOptionError extends Error {
    constructor(name: string) {
        const message = 'Unknown option -' + name + '.';
        Logger.error(message);
        super(message);
    }
}
