import { DecoratedCommand } from '../command/decorated-command.type';

/**
 * Configuration for the `CLI` decorator.
 */
export interface CLIConfiguration {
    name?: string;
    version?: string;
    commands?: DecoratedCommand[];
}
