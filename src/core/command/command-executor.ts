import { CommandInstance } from './command-instance';
import { ParsedArgs } from '../argument/parsed-args';
import { CommandResolver } from './command-resolver';
import { OptionMetadata } from '../decorators/option';

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
            if (command.options.hasOwnProperty(opt)) {
                const option = command.options[opt];
                command.instance[option.propertyKey] = this.getOption(option, args);
            }
        }
    }

    private static getOption(option: OptionMetadata, args: ParsedArgs) {
        let result;

        if (option.name && args.options[option.name]) {
            result = args.options[option.name];
        } else if (option.alias && option.alias.length > 0) {
            const aliasWasUsedInstead = option.alias
                .find((a: string) => args.options[a] !== undefined);

            if (aliasWasUsedInstead) {
                result = args.options[aliasWasUsedInstead];
            }
        }

        return result;
    }
}
