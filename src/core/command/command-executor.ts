import { ParsedArgs } from '../argument/parsed-args';
import { OptionMetadata } from '../decorators/option';
import { CommandInstance } from './command-instance';
import { CommandResolver } from './command-resolver';

export class CommandExecutor {
    public static execute(args: ParsedArgs, commands: CommandInstance[]) {
        const resolver = new CommandResolver(commands);
        const command = resolver.findCommand(args.name);
        const params = this.getParameters(command, args);
        this.injectOptions(command, args);
        command.instance.execute(...params);
    }

    private static getParameters(command: CommandInstance, args: ParsedArgs) {
        const parameters = [];
        if (command.params) {
            for (const param of command.params) {
                parameters[param.index] = args.arguments[param.index];
            }
        }
        return parameters;
    }

    private static injectOptions(command: CommandInstance, args: ParsedArgs): void {
        for (const opt in command.options) {

            const option = command.options[opt];
            const value = this.getOption(option, args);
            if (value) {
                command.instance[option.propertyKey] = value;
            }

        }
    }

    private static getOption(option: OptionMetadata, args: ParsedArgs) {
        let result;
        const name = option.name as string;
        const alias = option.alias;
        if (name && args.options[name]) {
            result = args.options[name];
        } else if (alias && alias.length > 0) {
            const aliasWasUsedInstead = alias.find((a: string) => args.options[a] !== undefined);

            if (aliasWasUsedInstead) {
                result = args.options[aliasWasUsedInstead];
            }
        }

        return result;
    }
}
