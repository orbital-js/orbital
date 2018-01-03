import * as minimist from 'minimist';

import { ParsedArgs } from './parsed-args';

export class ArgumentParser {
    private static args: minimist.ParsedArgs;

    public static parseArguments(args: string[]): ParsedArgs {
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
