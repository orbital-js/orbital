import { CommandInstance } from './interfaces/command-instance';
import { ParsedArgs } from './interfaces/parsed-args';
import { CommandResolver } from './command-resolver';
import { OptionMetadata } from './decorators/option/option-metadata';

export class CommandExecutor {
    // TODO: remove boolean and make it throw instead
    // There is no good reason to throw here, we just want to know if the command executed
    public static execute(args: ParsedArgs, commands: CommandInstance[]): boolean {
        const command = CommandResolver.findCommand(args.name, commands);

        if (!command) {
            return false;
        }

        this.injectOptions(command, args);
        const params = this.mapParameters(command, args);
        command.instance.execute(...params);

        return true;
    }

    private static injectOptions(command: CommandInstance, args: ParsedArgs): void {
        for (const opt in command.options) {
            if (command.options.hasOwnProperty(opt)) {
                const option = command.options[opt];
                command.instance[option.propertyKey] = this.getOption(option, args);
            }
        }
    }

    private static getOption(option: OptionMetadata, args: ParsedArgs) {
        let result = null;

        if (option.name && args.options[option.name]) {
            result = args.options[option.name];

        } else if (option.alias && option.alias.length > 0) {
            const aliasWasUsedInstead = option.alias
                .find(a => args.options[a] !== undefined);

            if (aliasWasUsedInstead) {
                result = args.options[aliasWasUsedInstead];
            }
        }

        return result;
    }

    private static mapParameters(command: CommandInstance, args: ParsedArgs) {
        const parameterMap = [];
        if (command.params) {
            for (const param of command.params) {
                parameterMap[param.index] = args.arguments[param.index];
            }
        }
        return parameterMap;
    }
}
