/**
 * Configuration for the `Command` decorator.
 */
export class CommandMetadata {
    // The string under which your command will be executed
    name: string;
    // Shorthand strings of the command name
    alias?: string[];
    // TODO: review this functionality
    subcommands?: any[];
}
