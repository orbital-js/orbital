import { CLIConfiguration } from './cli-metadata.interface';
import { Executable } from '../executable';

/**
 * Decorator function defining the CLI entry point
 *
 * @param configuration Declaration of the CLI
 */
export function CLI(configuration: CLIConfiguration): any {
    return (constructor: any) => {
        const cli = class implements Executable {
            commands = configuration.commands;
            version = configuration.version;
            name = configuration.name;

            execute(...args: any[]): void {
                const execFunc = this.resolveExecuteFunction(args);
                execFunc(args);
            }

            private resolveExecuteFunction(args: any[]) {
                let execute;
                if (this.commands && this.commands.length > 0) {
                    const command = this.commands
                        .find(com => com.name === args[1]);
                    if (command) {
                        execute = command.execute;
                    }
                }
                if (!execute) {
                    if (args[0] === this.name
                        && constructor.prototype.execute) {
                        execute = constructor.prototype.execute;
                    } else {
                        throw new Error('Show help');
                    }
                }
                return execute;
            }
        };
        return cli;
    };
}
