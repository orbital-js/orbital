import { getClassMetadata, setClassMetadata } from '../reflection/class';

import { CommandConfiguration } from './command-configuration.interface';

/**
 * Decorator function defining a CLI command
 *
 * @param configuration Declaration of a command
 */
export function Command(configuration: CommandConfiguration): ClassDecorator {
    return (constructor: any) => {
        const metadata = getClassMetadata(constructor) || {};
        metadata.name = configuration.name;
        metadata.alias = configuration.alias;
        metadata.subcommands = configuration.subcommands;
        return setClassMetadata(constructor, metadata);
    };
}
