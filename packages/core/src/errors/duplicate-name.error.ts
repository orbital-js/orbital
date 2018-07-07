import { OrbitalError } from './orbital-error';

export class DuplicateNameError extends OrbitalError {
    constructor(name: string) {
        const message = `CLI modules defines two commands with conflicting names: [${name}]`;
        super(message);
    }
}
