import { OrbitalError } from './orbital-error';

export class DuplicateAliasError extends OrbitalError {
    constructor(alias: string, command1: string, command2: string) {
        const message = `CLI modules defines two commands with conflicting alias: [${alias}]`
            + `\n\t ${command1}`
            + `\n\t ${command2}`;
        super(message);
    }
}
