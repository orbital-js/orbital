import * as isConstructor from 'is-constructor';

import { isFunction, isUndefined } from 'util';

import { CLIConfiguration } from './cli/cli-configuration.interface';
import { Constructor } from './util/constructor';
import { Executable } from './interfaces/executable';
import { arrayIsPopulated } from './util/array';
import { commandNotExecutable } from './util/errors';
import { getClassMetadata } from './reflection/class';

export class OrbitalFactoryStatic {

    private metadata: CLIConfiguration;
    private CLIClass: Constructor<Executable>;
    private $inject: any[] = [];
    private commandResponse: any;

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

        if (arrayIsPopulated(commands) && arrayIsPopulated(args)) {
            const mappedCommands = commands.map(mapCommands);
            const command = mappedCommands.find(com => com.name === args[1]);
            if (command && command.execute) {
                executed = true;
                this.commandResponse = command.execute();
            } else {
                throw new Error('Show help');
            }
        }

        if (!executed) {
            const cliInstance = new this.CLIClass(...this.$inject);
            if (args[0] === name && isFunction(cliInstance.execute)) {
                executed = true;
                this.commandResponse = cliInstance.execute();
            } else {
                throw new Error('Show help');
            }
        }
    }
}

function mapCommands(C: Constructor<Executable>) {
    console.log(C.name);
    let commandInstance: Executable;
    if (isFunction(C)) {
        commandInstance = new C();
    }
    if (commandInstance && commandInstance instanceof Executable && isFunction(commandInstance.execute)) {
        const meta = getClassMetadata(C);
        return {
            ...meta,
            execute: commandInstance.execute,
            className: C.name,
        };
    } else {

        throw new Error(commandNotExecutable(C.name));
    }
}

export const OrbitalFactory = new OrbitalFactoryStatic();

