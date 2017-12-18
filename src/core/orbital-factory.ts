import * as isConstructor from 'is-constructor';

import { isFunction, isUndefined } from 'util';

import { CLIConfiguration } from './cli/cli-configuration.interface';
import { CommandExecutor } from './command-executor';
import { CommandMapper } from './command-mapper';
import { CommandParser } from './command-parser';
import { Constructor } from './util/constructor';
import { Executable } from './interfaces/executable';
import { arrayIsPopulated } from './util/array';
import { commandNotExecutable } from './util/errors';
import { getClassMetadata } from './reflection/class';

export class OrbitalFactoryStatic {

    private metadata: CLIConfiguration;
    private CLIClass: Constructor<Executable>;
    private $inject: any[] = [];
    private commandParser = new CommandParser();

    /**
     * If your CLI class has constructor arguments, they can be
     * injected with this function. Classes will automatically be instantiated.
     * @param depedencies the dependencies your CLI function may need to construct
     */
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
        let executed = false;
        const { name = '', commands = [], version = '' } = this.metadata;
        const mapper = new CommandMapper();
        const parser = new CommandParser();
        const executor = new CommandExecutor();
        if (arrayIsPopulated(commands) && arrayIsPopulated(args)) {
            const commandMap = mapper.map(commands);
            const input = parser.parse(args);
            if (commandMap) {
                const run = executor.execute(input, commandMap);
                if (run) {
                    executed = true;
                } else {
                    throw new Error('Show help');
                }
            }
        }

        if (!executed) {
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
