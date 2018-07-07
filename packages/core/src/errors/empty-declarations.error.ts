import { OrbitalError } from './orbital-error';

export class EmptyDeclarationsError extends OrbitalError {
    constructor() {
        const message = 'You must have at least one command in your declarations array.';
        super(message);
    }
}
