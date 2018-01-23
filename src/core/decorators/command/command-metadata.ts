/**
 * Configuration for the `Command` decorator.
 */
export class CommandMetadata {
    /**
     * The standard name for your command. This should be a full word, or a hyphenated phrase
     * and should succinctly describe the function that will be executed.
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
    alias?: string[];
    /**
     * @ignore Not yet implemented
     */
    subcommands?: any[];
    /**
     * A description for the command: what does it do?
     */
    description?: string;
}
