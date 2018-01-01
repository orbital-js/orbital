import { CommandMapInstance } from './interfaces/command-map';
import { getClassMetadata } from './reflection/class';
import { Logger } from './shared';

export class CommandMapper {
    public map(commands: any[]): CommandMapInstance[] {
        const mappedCommands: CommandMapInstance[] = [];

        for (const command of commands) {
            const commandInstance = new command();
            const commandMetadata = getClassMetadata(command);

            this.checkIfCommandNameIsFree(commandMetadata.name, mappedCommands);
            this.checkIfAliasesAreFree(commandMetadata.alias, commandMetadata.name, mappedCommands);

            mappedCommands.push({
                instance: commandInstance,
                name: commandMetadata.name,
                alias: commandMetadata.alias,
                params: commandInstance.constructor.params,
                options: commandInstance.constructor.options,
            });
        }

        return mappedCommands;
    }

    private checkIfCommandNameIsFree(name: string, commands: CommandMapInstance[]): void {
        const commandsWithSameName = commands.filter(c => c.name === name);
        if (commandsWithSameName.length > 0) {
            this.logAndThrow('CLI module defines two commands with the same name: ' + name);
        }
    }

    private checkIfAliasesAreFree(aliases: string[], commandName: string, commands: CommandMapInstance[]): void {
        for (const command of commands) {
            if (command.alias) {
                this.checkIfCommandDefinesAliases(command, aliases, commandName);
            }
        }
    }

    private checkIfCommandDefinesAliases(command: CommandMapInstance, aliases: string[], commandName: string): void {
        for (const a of aliases) {
            const collisionIndex = command.alias.indexOf(a);
            const aliasesCollides = collisionIndex > -1;
            if (aliasesCollides) {
                this.logAndThrow('CLI modules defines two commands with conflicting alias ['
                    + command.alias[collisionIndex] + ']'
                    + '\n\t' + commandName
                    + '\n\t' + command.name);
            }
        }
    }

    private logAndThrow(message: string): void {
        Logger.error(message);
        throw new Error(message);
    }
}
