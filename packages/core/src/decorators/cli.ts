import * as _ from 'lodash';
import { isNullOrUndefined } from 'util';
import { OrbitalConfiguration } from '../configuration/configuration';
import { defaultConfiguration } from '../configuration/default-configuration';
import { replaceTokens } from '../configuration/tokens';
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

    /**
     * change the behavior of your CLI
     */
    config?: OrbitalConfiguration;
}

/**
 * Decorator function defining the CLI entry point
 *
 * @param metadata Declaration of the CLI
 */
export function CLI(metadata: CLIMetadata): ClassDecorator {
    return (constructor) => {
        if (isNullOrUndefined(metadata.prettyName)) {
            metadata.prettyName = metadata.name;
        }

        const config = _.defaults(metadata.config, defaultConfiguration);
        for (const key in config) {
            if (typeof config[key] === 'string') {
                config[key] = replaceTokens(config[key], metadata);
            }
        }

        const cliMetadata = { ...metadata, config };
        setClassMetadata(constructor, cliMetadata);
        return constructor;
    };
}
