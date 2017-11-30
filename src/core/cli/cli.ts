import { CLIConfiguration } from './cli-metadata.interface';

/**
 * Decorator function defining the CLI entry point
 *
 * @param configuration Declaration of the CLI
 */
export function CLI(configuration: CLIConfiguration): any {
    return (constructor: any) => {
        if (constructor.prototype.execute === undefined) {
            throw new Error('CLI decorator requires class to implement Executable');
        }
        const cli = class extends constructor {
            commands = configuration.commands;
            version = configuration.version;
            name = configuration.name;
        };
        return cli;
    };
}
