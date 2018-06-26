import { CLI } from '../../../';

@CLI({
    name: 'test-cli',
})
export class CLIWithArguments {
    constructor(
        public thing: string,
    ) { }

    execute() {
        throw new Error(this.thing);
    }
}
