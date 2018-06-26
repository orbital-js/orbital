import { isNullOrUndefined } from 'util';
import { ParsedArgs } from '../argument/parsed-args';
import { CommandNotFoundError } from '../errors/command-not-found';
import { tern } from '../util/util';
import { CommandInstance } from './command-instance';
import { MappedCommands, MappedSubcommands } from './mapped-commands';

export class CommandResolver {

    private commands: CommandInstance[];
    private subcommands: MappedSubcommands[];

    constructor(map: MappedCommands) {
        this.commands = map.commands;
        this.subcommands = map.subcommands;
    }

    public findCommand(args: ParsedArgs): CommandInstance {
        let command: CommandInstance | null = null;
        let commands = this.commands;
        let subcommands = this.subcommands;
        for (const index of args.original) {

            const c = this.findCommandWithName(index, commands)
                || this.findCommandWithAlias(index, commands);

            if (c) {
                command = c;
                break;
            }

            const subcommand = this.findSubcommandGroupWithName(index, subcommands)
                || this.findSubcommandGroupWithAlias(index, subcommands);

            if (subcommand) {
                commands = subcommand.mappedCommands.commands;
                subcommands = subcommand.mappedCommands.subcommands;
            }
        }

        if (isNullOrUndefined(command)) {
            throw new CommandNotFoundError(args.name);
        }

        return command;
    }

    private findCommandWithName(name: string, array: CommandInstance[]) {
        return array.find(command => command.name === name);
    }

    private findCommandWithAlias(alias: string, array: CommandInstance[]) {
        return array.find(command => (tern(command.aliases, [] as string[])).indexOf(alias) > -1);
    }

    private findSubcommandGroupWithName(name: string, array: MappedSubcommands[]) {
        return array.find(command => command.name === name);
    }

    private findSubcommandGroupWithAlias(alias: string, array: MappedSubcommands[]) {
        return array.find(command => (tern(command.aliases, [] as string[])).indexOf(alias) > -1);
    }
}
