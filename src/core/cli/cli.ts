import { CLIConfiguration } from './cli-configuration.interface';
import { Constructor } from '../util/constructor';
import { setClassMetadata } from '../reflection/class';

/**
 * Decorator function defining the CLI entry point
 *
 * @param configuration Declaration of the CLI
 */
export function CLI(configuration: CLIConfiguration): ClassDecorator {
    return (constructor) => {
        return setClassMetadata(constructor, configuration);
    };
}
