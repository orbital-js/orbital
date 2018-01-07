import { CommandExecutor, CommandMapper, CommandInstance, CommandNotFoundError } from './command';

import { ParsedArgs } from './argument/parsed-args';
import { ArgumentParser } from './argument/argument-parser';

import { arrayIsPopulated } from './util/array';
import { Constructor } from './util/constructor';

import { CLIMetadata } from './decorators/cli/cli-metadata';
import { getClassMetadata } from './reflection/class';

export class OrbitalFactoryStatic {

    private metadata: CLIMetadata;

    /**
     * Constructs dependency tree and puts commands in their place.
     * @param cli the CLI module to bootstrap
     */
    bootstrap(cli: Constructor<any>): this {
        this.metadata = getClassMetadata(cli);
        return this;
    }

    /**
     * This actually tells Node to run your CLI.
     * @param args pass in your process.argv
     */
    execute(args: any[] = []): void {
        let hasRun = false;
        const commands = this.metadata.commands || [];

        if (arrayIsPopulated(commands)) {
            const commandMapper = new CommandMapper(commands);
            const commandInstances = commandMapper.map();

            if (commandInstances) {
                const input = ArgumentParser.parseArguments(args);
                hasRun = this.tryRunCommand(input, commandInstances);
            }
        }

        if (!hasRun) {
            throw new Error('Show help');
        }
    }

    private tryRunCommand(input: ParsedArgs, commandInstances: CommandInstance[]) {
        let hasRun = true;
        try {
            /**
             * FIXME: this behavior is wrong, atleast until we have custom compiler
             * We should resolve command names before mapping them and executing only one
             * It would be better performancewise as of now
             *
             * Won't matter anymore when we'll have a custom compiler because they'll be mapped at compile time anyway
             */
            CommandExecutor.execute(input, commandInstances);
        } catch (error) {
            if (error instanceof CommandNotFoundError) {
                hasRun = false;
            } else {
                throw error;
            }
        }
        return hasRun;
    }
}

export const OrbitalFactory = new OrbitalFactoryStatic();
