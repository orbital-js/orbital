import { CommandInstance } from './interfaces/command-instance';
import { getClassMetadata } from './reflection/class';
import { Logger } from './shared';

export class CommandMapper {
    public static map(commands: any[]): CommandInstance[] {
        const mappedCommands: CommandInstance[] = [];

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

    private static checkIfCommandNameIsFree(name: string, commands: CommandInstance[]): void {
        const commandsWithSameName = commands.filter(c => c.name === name);
        if (commandsWithSameName.length > 0) {
            this.logAndThrow('CLI module defines two commands with the same name: ' + name);
        }
    }

    private static checkIfAliasesAreFree(aliases: string[], commandName: string, commands: CommandInstance[]): void {
        for (const command of commands) {
            if (command.alias) {
                this.checkIfCommandDefinesAliases(command, aliases, commandName);
            }
        }
    }

    private static checkIfCommandDefinesAliases(
        command: CommandInstance,
        aliases: string[],
        commandName: string,
    ): void {
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

    private static logAndThrow(message: string): void {
        Logger.error(message);
        throw new Error(message);
    }
}
