import * as minimist from 'minimist';
import { ParsedArgs } from './parsed-args';

export class ArgumentParser {
    private static args: minimist.ParsedArgs;

    public static parseArguments(args: string[]): ParsedArgs {
        this.args = minimist(args);
        let num = 1;
        if (['npm', 'npx', 'node', 'ts-node'].indexOf(this.args._[0]) > -1) {
            num = 2;
        }
        return {
            name: this.parseCommandName(num),
            original: this.parseOriginalCommand(num),
            options: this.parseOptions(),
            arguments: this.parseParameters(num),
        };
    }

    private static parseOptions() {
        const args = { ...this.args };
        delete args._;
        return args;
    }

    private static parseParameters(num: number) {
        return this.args._.slice(num + 1);
    }

    private static parseCommandName(num: number) {
        return this.args._[num];
    }

    private static parseOriginalCommand(num: number) {
        const arr = [...this.args._];
        arr.splice(0, num);
        return arr;
    }
}
