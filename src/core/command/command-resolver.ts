import { CommandInstance } from './command-instance';
import { CommandNotFoundError } from './command-not-found-error';

export class CommandResolver {
    constructor(private commands: any[]) { }

    public findCommand(name: string): CommandInstance {
        const command = this.findCommandWithName(name)
            || this.findCommandWithAlias(name);

        if (!command) {
            throw new CommandNotFoundError(name);
        }

        return command;
    }

    private findCommandWithName(name: string) {
        return this.commands.find(command => command.name === name);
    }

    private findCommandWithAlias(alias: string) {
        return this.commands.find(command => (command.alias || []).indexOf(alias) > -1);
    }
}
