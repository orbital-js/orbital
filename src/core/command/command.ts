import { CommandConfiguration } from './command-configuration.interface';
import { applyClassMetadata } from '../reflection/class';

/**
 * Decorator function defining a CLI command
 *
 * @param configuration Declaration of a command
 */
export function Command(configuration: CommandConfiguration): ClassDecorator {
    return (constructor: any) => {
        return applyClassMetadata(constructor, configuration);
    };
}
