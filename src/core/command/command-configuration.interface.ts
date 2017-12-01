import { Executable } from '../interfaces/executable';

/**
 * Configuration for the `Command` decorator.
 */
export class CommandConfiguration {
    name?: string;
    aliases?: string[];
    subCommands?: any[];
}
