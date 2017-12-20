import { setClassMetadata } from '../../reflection/class';

import { CommandMetadata } from './command-metadata';

/**
 * Decorator function defining a CLI command
 *
 * @param configuration Declaration of a command
 */
export function Command(configuration: CommandMetadata): ClassDecorator {
    return (constructor: any) => {
        setClassMetadata(constructor, configuration);
        return constructor;
    };
}
