import { Logger } from '../shared';

export class AliasLengthError extends Error {
    constructor(length: number, expected: number, optionOrCommand: string, command: boolean) {
        let message: string = 'The alias you input for '
            + (command ? 'command ' : 'option ')
            + '"' + optionOrCommand + '" is too ';
        if (length > expected) {
            message += 'long. ';
        } else {
            message += 'short. ';
        }
        message += 'Please update your alias.';
        Logger.error(message);
        super(message);
    }
}
