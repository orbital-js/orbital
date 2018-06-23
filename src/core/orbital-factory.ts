import { ArgumentParser } from './argument/argument-parser';
import { ParsedArgs } from './argument/parsed-args';
import { CommandExecutor, CommandInstance, CommandMapper, CommandNotFoundError } from './command';
import { CLIMetadata } from './decorators/cli';
import { HelpGenerator } from './help/help';
import { getClassMetadata } from './reflection/class';
import { arrayIsPopulated } from './util/array';
import { Constructor } from './util/constructor';

export class OrbitalFactory {

    private static metadata: CLIMetadata = {};

    /**
     * Constructs dependency tree and puts commands in their place.
     * @param cli the CLI module to bootstrap
     */
    static bootstrap(cli: Constructor<any>): OrbitalFactory {
        this.metadata = getClassMetadata(cli);
        return this;
    }

    /**
     * This actually tells Node to run your CLI.
     * @param args pass in your process.argv
     */
    static execute(args: any[] = []): boolean {
        let hasRun = false;
        const commands = this.metadata.commands || [];
        let commandInstances: CommandInstance[] = [];

        if (arrayIsPopulated(commands)) {
            const commandMapper = new CommandMapper(commands);
            commandInstances = commandMapper.map();

            if (commandInstances) {
                const input = ArgumentParser.parseArguments(args);
                hasRun = this.tryRunCommand(input, commandInstances);
            }
        }

        if (!hasRun) {
            const help = new HelpGenerator(this.metadata, commandInstances);
            help.generateGlobalDocs();
        }
        return hasRun;
    }

    private static tryRunCommand(input: ParsedArgs, commandInstances: CommandInstance[]) {
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
