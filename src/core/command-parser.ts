// OMG: SAY NO TO LODASH !!!!!
import * as _ from 'lodash';
import * as minimist from 'minimist';

import { ParsedArgs } from './interfaces/parsed-args';

export class CommandParser {
    private args: minimist.ParsedArgs;

    parse(args: string[]): ParsedArgs {
        // TODO: Wrap external APIs
        this.args = minimist(args);
        // TODO: Remove side effect to make readability easier
        return {
            name: this.parseCommandName(),
            options: this.parseOptions(),
            arguments: this.parseArguments(),
        };
    }

    private parseOptions() {
        const args = _.cloneDeep(this.args);
        delete args._;
        return args;
    }

    private parseArguments() {
        return this.args._.slice(2);
    }

    private parseCommandName() {
        return this.args._[1];
    }
}
