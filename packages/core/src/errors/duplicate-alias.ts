import { Logger } from '../shared';

export class DuplicateAliasError extends Error {
    constructor(alias: string, command1: string, command2: string) {
        const message = `CLI modules defines two commands with conflicting alias: [${alias}]`
            + `\n\t ${command1}`
            + `\n\t ${command2}`;
        Logger.error(message);
        super(message);
    }
}
