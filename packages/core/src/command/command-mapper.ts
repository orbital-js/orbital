import * as _ from 'lodash';
import { isNullOrUndefined } from 'util';
import { CommandMetadata } from '../decorators/command';
import { SubcommandGroupMetadata } from '../decorators/subcommand-group';
import { DuplicateAliasError } from '../errors/duplicate-alias';
import { DuplicateNameError } from '../errors/duplicate-name';
import { MetadataError } from '../errors/metadata';
import { getClassMetadata } from '../reflection/class';
import { getParamTypes } from '../reflection/types';
import { arrayIsPopulated } from '../util/array';
import { CommandInstance } from './command-instance';
import { MappedCommands, MappedSubcommands } from './mapped-commands';

export class CommandMapper {
    private mappedCommands: MappedCommands = { commands: [], subcommands: [] };

    constructor(private declarations: CommandMetadata[]) { }

    public map(): MappedCommands {

        for (const declaration of this.declarations) {
            const instantiated = this.instantiate(declaration);

            // TODO: make keys an array to clean up

            if (arrayIsPopulated(instantiated.commands)) {
                instantiated.commands.forEach(command => {
                    this.mappedCommands.commands.push(command);
                });
            }

            if (arrayIsPopulated(instantiated.subcommands)) {
                instantiated.subcommands.forEach(command => {
                    this.mappedCommands.subcommands.push(command);
                });
            }
        }

        return this.mappedCommands;
    }

    private instantiate(commandOrSubcommandGroup: any): MappedCommands {
        const map: MappedCommands = { commands: [], subcommands: [] };
        const metadata = getClassMetadata(commandOrSubcommandGroup);
        if (metadata.type === 'command') {
            const instance = this.createInstanceOfCommand(commandOrSubcommandGroup);
            map.commands.push(instance);
        } else if (metadata.type === 'subcommand') {
            const instance = this.resolveCommandsOfSubcommandGroup(commandOrSubcommandGroup);
            map.subcommands.push(instance);
        } else {
            throw new MetadataError(metadata.name);
        }
        return map;
    }

    private resolveCommandsOfSubcommandGroup(subcommandGroup: any): MappedSubcommands {
        const mappedCommands: MappedCommands = { commands: [], subcommands: [] };

        const subcommandMetadata: SubcommandGroupMetadata = getClassMetadata(subcommandGroup);
        const declarations = _.defaultTo(subcommandMetadata.declarations, []);
        for (const declaration of declarations) {
            const instantiated = this.instantiate(declaration);

            // TODO: make keys an array to clean up

            if (arrayIsPopulated(instantiated.commands)) {
                instantiated.commands.forEach(command => {
                    mappedCommands.commands.push(command);
                });
            }

            if (arrayIsPopulated(instantiated.subcommands)) {
                instantiated.subcommands.forEach(command => {
                    mappedCommands.subcommands.push(command);
                });
            }
        }

        return { mappedCommands, ...subcommandMetadata };
    }

    private createInstanceOfCommand(command: any): CommandInstance {
        const commandInstance = new command();
        const commandMetadata: CommandMetadata = getClassMetadata(command);
        const paramTypes = getParamTypes(commandInstance, 'execute');

        this.checkIfCommandNameIsAvailable(commandMetadata.name);
        if (arrayIsPopulated(commandMetadata.aliases)) {
            this.checkIfAliasesAreAvailable(commandMetadata.aliases as string[], commandMetadata.name);
        }

        return {
            instance: commandInstance,
            name: commandMetadata.name,
            aliases: _.defaultTo(commandMetadata.aliases, []),
            description: _.defaultTo(commandMetadata.description, ''),
            params: commandInstance.constructor.params,
            options: commandInstance.constructor.options,
            paramTypes
        };
    }

    private checkIfCommandNameIsAvailable(name: string): void {
        const commandsWithSameName = this.mappedCommands.commands.filter(c => c.name === name);
        const subcommandWithName = this.mappedCommands.subcommands[name];
        if (commandsWithSameName.length > 0 || !isNullOrUndefined(subcommandWithName)) {
            throw new DuplicateNameError(name);
        }
    }

    private checkIfAliasesAreAvailable(aliases: string[], commandName: string): void {
        for (const command of this.mappedCommands.commands) {
            // if (command.aliases) {
            this.checkIfCommandDefinesAliases(command, aliases, commandName);
            // }
        }
    }

    private checkIfCommandDefinesAliases(
        command: CommandInstance,
        aliases: string[],
        commandName: string,
    ): void {
        for (const alias of aliases) {
            this.checkIfCommandDefinesAlias(command, alias, commandName);
        }
    }

    private checkIfCommandDefinesAlias(command: CommandInstance, alias: string, commandName: string) {
        const collisionIndex = command.aliases.indexOf(alias);
        const aliasesCollides = collisionIndex > -1;

        if (aliasesCollides) {
            throw new DuplicateAliasError(command.aliases[collisionIndex], commandName, command.name);
        }
    }
}
