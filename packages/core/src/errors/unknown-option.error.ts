import { OrbitalError } from './orbital-error';

export class UnknownOptionError extends OrbitalError {
    constructor(name: string) {
        const message = 'Unknown option -' + name + '.';
        super(message);
    }
}
