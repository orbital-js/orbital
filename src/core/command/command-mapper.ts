import { getClassMetadata } from '../reflection/class';
import { getParamTypes, } from '../reflection/types';
import { Logger } from '../shared';
import { CommandInstance } from './command-instance';

export class CommandMapper {
    private commandInstances: CommandInstance[] = [];

    constructor(private commands: any[]) { }

    public map(): CommandInstance[] {

        for (const command of this.commands) {
            this.commandInstances.push(this.createInstance(command));
        }

        return this.commandInstances;
    }

    private createInstance(command: any) {
        const commandInstance = new command();
        const commandMetadata = getClassMetadata(command);
        const paramTypes = getParamTypes(commandInstance, 'execute');

        this.checkIfCommandNameIsFree(commandMetadata.name);
        this.checkIfAliasesAreFree(commandMetadata.alias, commandMetadata.name);

        return {
            instance: commandInstance,
            name: commandMetadata.name,
            alias: commandMetadata.alias,
            description: commandMetadata.description,
            params: commandInstance.constructor.params,
            options: commandInstance.constructor.options,
            paramTypes
        };
    }

    private checkIfCommandNameIsFree(name: string): void {
        const commandsWithSameName = this.commandInstances.filter(c => c.name === name);
        if (commandsWithSameName.length > 0) {
            this.logAndThrow('CLI module defines two commands with the same name: ' + name);
        }
    }

    private checkIfAliasesAreFree(aliases: string[], commandName: string): void {
        for (const command of this.commandInstances) {
            if (command.alias) {
                this.checkIfCommandDefinesAliases(command, aliases, commandName);
            }
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
        const collisionIndex = command.alias.indexOf(alias);
        const aliasesCollides = collisionIndex > -1;

        if (aliasesCollides) {
            this.logAndThrow('CLI modules defines two commands with conflicting alias ['
                + command.alias[collisionIndex] + ']'
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
