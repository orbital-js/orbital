import { CommandConfiguration } from './command-configuration.interface';
import { Executable } from '../interfaces/executable';

/**
 * Decorator function defining a CLI command
 *
 * @param configuration Declaration of a command
 */
export function Command(configuration: CommandConfiguration): any {
    return (constructor: any) => {
        if (constructor.prototype.execute === undefined) {
            throw new Error('Command decorator requires class to implement Executable');
        }
        return class extends constructor {
            name = configuration.name;
            aliases = configuration.aliases;
        };
    };
}
