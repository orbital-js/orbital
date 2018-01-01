import { CommandMapInstance } from './interfaces/command-map';
import { ParsedArgs } from './interfaces/parsed-args';

export class CommandExecutor {
    private map: CommandMapInstance[];

    // TODO: remove boolean and make it throw instead
    // There is no good reason to throw here, we just want to know if the command executed
    public execute(args: ParsedArgs, map: CommandMapInstance[]): boolean {
        this.map = map;
        const command = this.resolveCommand(args.name);
        if (!command) {
            return false;
        }

        this.injectOptions(command, args);
        const params = this.mapParameters(command, args);
        command.instance.execute(...params);

        return true;
    }

    // Find a command in the array
    private resolveCommand(name: string) {
        return this.resolveCommandWithName(name)
            || this.resolveCommandWithAlias(name);
    }

    // Find a command with a given alias
    private resolveCommandWithAlias(alias: string): any {
        return this.map.find(c => (c.alias || []).indexOf(alias) > -1);
    }

    // Find a command with a given name
    private resolveCommandWithName(name: string) {
        return this.map.find(c => c.name === name);
    }

    // add the options into the class
    private injectOptions(command: CommandMapInstance, args: ParsedArgs): void {
        for (const opt in command.options) {
            if (command.options.hasOwnProperty(opt)) {
                this.assignOptions(command, opt, args);
            }
        }
    }

    private assignOptions(command: CommandMapInstance, opt: string, args: ParsedArgs) {
        const option = command.options[opt];

        // If the options passed into the command
        // match one of the options in the input

        if (args.options[option.name]) {
            // set the property of the option on the command class
            command.instance[option.propertyKey] = args.options[option.name];

        } else if (option.alias && option.alias.length) {
            // if the command was instead passed an option as an alias
            // inject the option that way
            const aliasThatWasUsed = option.alias
                .find(a => args.options[a] !== undefined);

            if (aliasThatWasUsed) {
                command.instance[option.propertyKey] = args.options[aliasThatWasUsed];
            }

        }
    }

    private mapParameters(command: CommandMapInstance, args: ParsedArgs) {
        const parameterMap = [];
        if (command.params) {
            for (const param of command.params) {
                parameterMap[param.index] = args.arguments[param.index];
            }
        }
        return parameterMap;
    }
}
