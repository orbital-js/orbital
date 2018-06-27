import * as minimist from 'minimist';
import { ParsedArgs } from './parsed-args';

export class ArgumentParser {
    private static args: minimist.ParsedArgs;
    private static num: number;
    /**
     * Maps arguments to object for simplified consumption
     * @param args array of arguments passed into CLI
     */
    public static parseArguments(args: string[]): ParsedArgs {
        this.args = minimist(args);
        this.num = 1;
        if (['npm', 'npx', 'node', 'ts-node'].indexOf(this.args._[0]) > -1) {
            this.num = 2;
        }
        return {
            name: this.parseCommandName(),
            original: this.parseOriginalCommand(),
            options: this.parseOptions(),
            arguments: this.parseParameters(),
        };
    }

    /**
     * Returns options object without params
     */
    private static parseOptions() {
        const args = { ...this.args };
        delete args._;
        return args;
    }

    /**
     * gets cli arguments without command name
     */
    private static parseParameters() {
        return this.args._.slice(this.num + 1);
    }

    /**
     * gets command name string from argument list
     */
    private static parseCommandName() {
        return this.args._[this.num];
    }

    /**
     * gets whole original command with arguments, without command name/prefix
     */
    private static parseOriginalCommand() {
        const arr = [...this.args._];
        arr.splice(0, this.num);
        return arr;
    }
}
