import { isFunction } from 'util';

import { CLIMetadata } from './decorators/cli/cli-metadata';
import { CommandExecutor } from './command-executor';
import { CommandMapper } from './command-mapper';
import { Constructor } from './util/constructor';
import { Executable } from './interfaces/executable';
import { arrayIsPopulated } from './util/array';
import { getClassMetadata } from './reflection/class';
import { CommandParser } from './command-parser';

// WTF: Why Append static ?!!
export class OrbitalFactoryStatic {

    private metadata: CLIMetadata;
    private CLIClass: Constructor<Executable>;
    // WTF: Why `$` prefix please ?
    private $inject: any[] = [];

    /**
     * If your CLI class has constructor arguments, they can be
     * injected with this function. Classes will automatically be instantiated.
     * @param depedencies the dependencies your CLI function may need to construct
     */
    // WTF: What is even that inject thingy ?!!
    inject(dependencies: any[]): this {
        this.$inject = dependencies;
        return this;
    }

    /**
     * Constructs dependency tree and puts commands in their place.
     * @param cli the CLI module to bootstrap
     */
    bootstrap(cli: Constructor<any>): this {
        this.CLIClass = cli;
        this.metadata = getClassMetadata(cli);
        return this;
    }

    /**
     * This actually tells Node to run your CLI.
     * @param args pass in your process.argv
     */
    // execute(...args: any[]): void;
    execute(args: any[] = []): void {
        // OMG: You is too long mate
        let executed = false;
        const commands = this.metadata.commands || [];
        const mapper = new CommandMapper();
        const parser = new CommandParser();
        const executor = new CommandExecutor();

        // WTF: You make no sense mate...
        if (arrayIsPopulated(commands) && arrayIsPopulated(args)) {
            const commandMap = mapper.map(commands);
            const input = parser.parse(args);
            if (commandMap) {
                const hasRun = executor.execute(input, commandMap);
                if (hasRun) {
                    executed = true;
                } else {
                    throw new Error('Show help');
                }
            }
        }

        if (!executed) {
            // OMG: No to the new this.CLIClass !!
            const cliInstance = new this.CLIClass(...this.$inject);
            if (isFunction(cliInstance.execute)) {
                executed = true;
                cliInstance.execute();
            } else {
                throw new Error('Show help');
            }
        }
    }
}

export const OrbitalFactory = new OrbitalFactoryStatic();
