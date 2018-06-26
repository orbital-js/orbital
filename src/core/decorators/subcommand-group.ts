import { setClassMetadata } from '../reflection/class';

/**
 * Configuration for the `Command` decorator.
 */
export interface SubcommandGroupMetadata {
    /**
     * The standard name for your subcommand group. This should be a full word, or a hyphenated phrase
     * and should succinctly describe the group of functions that will be executed.
     *
     * Note: this will throw an error if the name is shared with another command
     */
    name: string;
    /**
     * An optional array of strings that serve as shorthands for the command. Typically an
     * abbreviation of the words or the first letter(s) of the command name.
     *
     * Note: this will throw an error if any of the aliases are duplicate with another command.
     */
    aliases?: string[];
    /**
     * @ignore Not yet implemented
     */
    declarations?: any[];
    /**
     * A description for the command: what does it do?
     */
    description?: string;
}

/**
 * Decorator function defining a CLI command group
 *
 * @param configuration configuration of the command
 */
export function SubcommandGroup(configuration: SubcommandGroupMetadata): ClassDecorator {
    return (constructor: any) => {
        setClassMetadata(constructor, { ...configuration, type: 'subcommand' });
        return constructor;
    };
}
