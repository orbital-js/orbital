import { CLI } from '@orbital/core';
import { K } from '../class';

@CLI({
    name: 'test-cli'
})
export class CLIWithArguments {
    constructor(
        public thing: string,
    ) { }

    execute() {
        throw new Error(this.thing);
    }
}
