import { Logger } from '../shared';

export class ParamUndefinedError extends Error {
    constructor(name: string) {
        const message = 'Param "' + name + '" is required, but was not defined. Please retry your command with "' +
            name + '" definded.';
        Logger.error(message);
        super(message);
    }
}
