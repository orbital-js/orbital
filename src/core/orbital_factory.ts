import { CommandExecutor } from './command_executor';
import { CommandMapper } from './command_mapper';
import { CommandParser } from './command_parser';
import { CLIMetadata } from './decorators/cli/cli-metadata';
import { getClassMetadata } from './reflection/class';
import { arrayIsPopulated } from './util/array';
import { Constructor } from './util/constructor';

// WBH
// TODO: Review this. Probably not a good idea to chain functions this much,
// it can just be in one `bootstrap` function.
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
        const mapper = new CommandMapper();
        const parser = new CommandParser();
        const executor = new CommandExecutor();

        if (arrayIsPopulated(commands)) {
            const commandMap = mapper.map(commands);
            const input = parser.parse(args);
            if (commandMap) {
                hasRun = executor.execute(input, commandMap);
            }
        }

        if (!hasRun) {
            throw new Error('Show help');
            // TODO: SHOW HELP
        }
    }
}

export const OrbitalFactory = new OrbitalFactoryStatic();
