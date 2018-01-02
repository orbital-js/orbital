import { CommandInstance } from './interfaces/command-instance';

export class CommandResolver {
    public static findCommand(name: string, commands: CommandInstance[]) {
        return this.findCommandWithName(name, commands)
            || this.findCommandWithAlias(name, commands);
    }

    private static findCommandWithName(name: string, commands: CommandInstance[]) {
        return commands.find(c => c.name === name);
    }

    private static findCommandWithAlias(alias: string, commands: CommandInstance[]): any {
        return commands.find(c => (c.alias || []).indexOf(alias) > -1);
    }
}
