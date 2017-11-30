import { Executable } from '../executable';
import { DecoratedCommand } from './decorated-command.type';

/**
 * Configuration for the `Command` decorator.
 */
export interface CommandConfiguration {
    name?: string;
    aliases?: string[];
    commands?: DecoratedCommand[];
}
