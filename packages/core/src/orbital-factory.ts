import * as _ from 'lodash';
import { ArgumentParser } from './argument/argument-parser';
import { ParsedArgs } from './argument/parsed-args';
import { isDevMode } from './build-configuration';
import { CommandExecutor, CommandMapper } from './command';
import { MappedCommands } from './command/mapped-commands';
import { CLIMetadata } from './decorators/cli';
import { CommandNotFoundError } from './errors/command-not-found.error';
import { EmptyDeclarationsError } from './errors/empty-declarations.error';
import { HelpGenerator } from './help/help';
import { getClassMetadata } from './reflection/class';
import { Logger } from './shared';
import { arrayIsPopulated } from './util/array';
import { Constructor } from './util/constructor';

export class OrbitalFactory {

    private static metadata: CLIMetadata = {};
    private static map: MappedCommands;

    /**
     * Constructs dependency tree and puts commands in their place.
     * @param cli the CLI module to bootstrap
     */
    static bootstrap(cli: Constructor<any>): typeof OrbitalFactory {
        const metadata: CLIMetadata = getClassMetadata(cli);

        // If a pretty name is supplied, set it as the logger prefix
        Logger.setPrefix(metadata.config!.loggerPrefix!);

        const declarations = metadata.declarations;
        this.metadata = metadata;
        if (arrayIsPopulated(declarations)) {
            this.map = new CommandMapper(_.defaultTo(declarations, [])).map();
        } else {
            throw new EmptyDeclarationsError();
        }
        return this;
    }

    /**
     * This actually tells Node to run your CLI.
     * @param args pass in your process.argv
     */
    static execute(args: any[] = []): boolean {
        const input = ArgumentParser.parseArguments(args);
        if (input.name !== undefined) {
            const hasRun = this.tryRunCommand(input, this.map);
            if (hasRun) {
                return true;
            }
        }

        const help = new HelpGenerator(this.metadata, this.map);
        help.generateGlobalDocs();

        return false;
    }

    private static tryRunCommand(input: ParsedArgs, commandInstances: MappedCommands) {
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
                if (isDevMode()) {
                    throw error;
                }
            }
        }
        return hasRun;
    }
}
