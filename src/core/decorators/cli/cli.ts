import { CLIMetadata } from './cli-metadata';
import { setClassMetadata } from '../../reflection/class';

/**
 * Decorator function defining the CLI entry point
 *
 * @param configuration Declaration of the CLI
 */
export function CLI(configuration: CLIMetadata): ClassDecorator {
    return (constructor) => {
        setClassMetadata(constructor, configuration);
        return constructor;
    };
}
