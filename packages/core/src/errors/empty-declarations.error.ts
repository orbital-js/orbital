import { Logger } from '../shared';

export class EmptyDeclarationsError extends Error {
    constructor() {
        const message = 'You must have at least one command in your declarations array.';
        Logger.error(message);
        super(message);
    }
}
