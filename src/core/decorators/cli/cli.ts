import { CLIMetadata } from './cli-metadata';
import { setClassMetadata } from '../../reflection/class';

/**
 * Decorator function defining the CLI entry point
 *
 * @param configuration Declaration of the CLI
 */
export function CLI(configuration: CLIMetadata): ClassDecorator {
    return (constructor) => {
        const commands = configuration.commands;
        if (commands) {
            if (commands.length !== 0 && commands[0] === undefined) {
                throw Error('Undefined command');
            }
        }
        setClassMetadata(constructor, configuration);
        // TODO: Check that all commands are actually decorated with @Command()
        return constructor;
    };
}
