import { CLI } from '@orbital/core';
import { K } from '../class';

@CLI({
    name: 'test-cli'
})
export class CLIWithArguments {
    constructor(
        public thing: string,
        public k: K,
    ) { }

    execute() {
        this.k.throw(this.thing);
    }
}
