import { Logger } from '../shared';

export class OrbitalError extends Error {
    constructor(
        message: string,
    ) {
        Logger.error(message);
        super(message);
    }
}
