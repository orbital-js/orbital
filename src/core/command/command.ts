import { getClassMetadata, setClassMetadata } from '../reflection/class';

import { CommandMetadata } from './command-metadata';

/**
 * Decorator function defining a CLI command
 *
 * @param configuration Declaration of a command
 */
export function Command(configuration: CommandMetadata): ClassDecorator {
    return (constructor: any) => {
        // WTF: Why is this different than cli configuration ?!
        const metadata = getClassMetadata(constructor) || {};
        metadata.name = configuration.name;
        metadata.alias = configuration.alias;
        metadata.subcommands = configuration.subcommands;
        return setClassMetadata(constructor, metadata);
    };
}
