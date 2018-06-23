import { CommandMetadata } from '../decorators/command';
import { getClassMetadata } from '../reflection/class';
import { getParamTypes } from '../reflection/types';
import { Logger } from '../shared';
import { arrayIsPopulated } from '../util/array';
import { tern } from '../util/util';
import { CommandInstance } from './command-instance';

export class CommandMapper {
    private commandInstances: CommandInstance[] = [];

    constructor(private commands: CommandMetadata[]) { }

    public map(): CommandInstance[] {

        for (const command of this.commands) {
            this.commandInstances.push(this.createInstance(command));
        }

        return this.commandInstances;
    }

    private createInstance(command: any) {
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
            aliases: tern(commandMetadata.aliases, []),
            description: tern(commandMetadata.description, ''),
            params: commandInstance.constructor.params,
            options: commandInstance.constructor.options,
            paramTypes
        };
    }

    private checkIfCommandNameIsAvailable(name: string): void {
        const commandsWithSameName = this.commandInstances.filter(c => c.name === name);
        if (commandsWithSameName.length > 0) {
            this.logAndThrow('CLI module defines two commands with the same name: ' + name);
        }
    }

    private checkIfAliasesAreAvailable(aliases: string[], commandName: string): void {
        for (const command of this.commandInstances) {
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
            throw this.logAndThrow('CLI modules defines two commands with conflicting alias ['
                + command.aliases[collisionIndex] + ']'
                + '\n\t' + commandName
                + '\n\t' + command.name);
        }
    }

    // FIXME: Shouldn't logging policy be global ?
    private logAndThrow(message: string): void {
        Logger.error(message);
        throw new Error(message);
    }
}
