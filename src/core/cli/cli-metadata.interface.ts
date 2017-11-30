import { DecoratedCommand } from '../command/decorated-command-type';

/**
 * Configuration declaration for the CLI
 */
export interface CLIConfiguration {
    name?: string;
    version?: string;
    commands?: DecoratedCommand[];
}
