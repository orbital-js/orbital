import * as _ from 'lodash';
import { isNullOrUndefined } from 'util';
import { ParsedArgs } from '../argument/parsed-args';
import { CommandNotFoundError } from '../errors/command-not-found.error';
import { CommandInstance } from './command-instance';
import { MappedCommands, MappedSubcommands } from './mapped-commands';

export class CommandResolver {

    private commands: CommandInstance[];
    private subcommands: MappedSubcommands[];

    constructor(map: MappedCommands) {
        this.commands = map.commands;
        this.subcommands = map.subcommands;
    }

    public findCommand(args: ParsedArgs)
        : { command: CommandInstance, depth: number } {
        let command: CommandInstance | null = null;
        let commands = this.commands;
        let subcommands = this.subcommands;
        const original = args.original;
        let i = 0;
        while (i < original.length) {
            const index = original[i];
            const c = this.findCommandWithName(index, commands)
                || this.findCommandWithAlias(index, commands);

            if (c) {
                command = c;
                break;
            }

            const subcommand = this.findCommandWithName(index, subcommands)
                || this.findCommandWithAlias(index, subcommands);

            if (subcommand) {
                commands = subcommand.mappedCommands.commands;
                subcommands = subcommand.mappedCommands.subcommands;
            }
            i++;
        }

        if (isNullOrUndefined(command)) {
            throw new CommandNotFoundError(args.name);
        }
        return { command, depth: i };
    }

    private findCommandWithName
        <T extends CommandInstance | MappedSubcommands>(name: string, array: T[]): T | undefined {
        return array.find(command => command.name === name);
    }

    private findCommandWithAlias
        <T extends CommandInstance | MappedSubcommands>(alias: string, array: T[]): T | undefined {
        return array.find(command => (_.defaultTo(command.aliases, [] as string[])).indexOf(alias) > -1);
    }
}
