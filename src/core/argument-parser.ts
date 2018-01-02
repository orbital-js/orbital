import * as minimist from 'minimist';

import { ParsedArgs } from './interfaces/parsed-args';

// TODO: Write unit tests
export class ArgumentParser {
    private static args: minimist.ParsedArgs;

    public static parseArguments(args: string[]): ParsedArgs {
        // TODO: Wrap external APIs
        // So we can write our own implementation easily if we want e.g. we're not dependent upon an external library.
        this.args = minimist(args);
        return {
            name: this.parseCommandName(),
            options: this.parseOptions(),
            arguments: this.parseParameters(),
        };
    }

    private static parseOptions() {
        const args = {...this.args};
        delete args._;
        return args;
    }

    private static parseParameters() {
        return this.args._.slice(2);
    }

    private static parseCommandName() {
        return this.args._[1];
    }
}
