import * as isConstructor from 'is-constructor';

import { CLIConfiguration } from './cli/cli-configuration.interface';
import { Constructor } from './util/constructor';
import { Executable } from './interfaces/executable';
import { arrayIsPopulated } from './util/array';
import { getClassMetadata } from './reflection/class';

export class OrbitalFactoryStatic {

    private metadata: CLIConfiguration;
    private CLIClass: Constructor<Executable>;
    private $inject: any[] = [];

    /**
     * If your CLI class has constructor arguments, they can be
     * injected with this function. Classes will automatically be instantiated.
     * @param depedencies the dependencies your CLI function may need to construct
     */
    inject(...depedencies: any[]): this;
    inject(dependencies: any[]): this {
        for (const dependency of dependencies) {
            if (isConstructor(dependency)) {
                this.$inject.push(new dependency());
            } else {
                this.$inject.push(dependency);
            }
        }
        return this;
    }

    /**
     * Constructs dependency tree and puts commands in their place.
     * @param cli the CLI module to bootstrap
     */
    bootstrap(cli: Constructor<Executable>): this {
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
        const { name = '', commands = [], version = '' } = this.metadata;
        let execute: Executable['execute'] | undefined;

        if (arrayIsPopulated(commands) && arrayIsPopulated(args)) {
            const command = commands.find(com => com.name === args[1]);
            if (command) {
                execute = command.execute;
            } else {
                throw new Error('This command is not executable. Please add an `execute` method to your '
                    + command.constructor.name + ' class.');
            }
        }

        if (!execute) {
            const cliInstance = new this.CLIClass();
            if (args[0] === name && cliInstance.execute) {
                execute = cliInstance.execute;
            } else {
                throw new Error('Show help');
            }
        }

        execute();
    }
}

export const OrbitalFactory = new OrbitalFactoryStatic();
