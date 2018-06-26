import { SubcommandGroupMetadata } from '../decorators/subcommand-group';
import { CommandInstance } from './command-instance';

export interface MappedCommands {
    commands: CommandInstance[];
    subcommands: MappedSubcommands[];
}

export type MappedSubcommands = { mappedCommands: MappedCommands } & SubcommandGroupMetadata;
