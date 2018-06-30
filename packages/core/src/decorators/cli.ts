import { setClassMetadata } from '../reflection/class';

/**
 * Configuration for the `CLI` decorator.
 */
export interface CLIMetadata {

    /**
     * The `bin` name of the command, as it will be invoked by the user.
     */
    name?: string;

    /**
     * A cleaner, properly capitalized version of your CLI.
     */
    prettyName?: string;

    /**
     * The current version of your CLI package, as seen in package.json.
     */
    version?: string;

    /**
     * import your commands and subcommand groups
     */
    declarations?: any[];
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
