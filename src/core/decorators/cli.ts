import { setClassMetadata } from '../reflection/class';

/**
 * Configuration for the `CLI` decorator.
 */
export interface CLIMetadata {
    name?: string;
    prettyName?: string;
    version?: string;
    commands?: any[];
}

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
