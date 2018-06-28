import { isNullOrUndefined } from 'util';
import { ParsedArgs } from '../argument/parsed-args';
import { OptionMetadata } from '../decorators/option';
import { ParamUndefinedError } from '../errors/param-undefined';
import { CommandInstance } from './command-instance';
import { CommandResolver } from './command-resolver';
import { MappedCommands } from './mapped-commands';

export class CommandExecutor {
    /**
     * public method to execute the command with params
     * @param args parsed arguments from ArgumentParser
     * @param commands map of commands from CommandMapper
     */
    public static execute(args: ParsedArgs, commands: MappedCommands) {
        const resolver = new CommandResolver(commands);
        const { command, depth } = resolver.findCommand(args);
        const params = this.getParameters(command, args, depth);
        this.injectOptions(command, args);
        command.instance.execute(...params);
    }

    private static getParameters(command: CommandInstance, args: ParsedArgs, depth: number) {
        const parameters = [];
        if (command.params) {
            for (const param of command.params) {
                const argument = args.arguments[param.index + depth];
                parameters[param.index] = args.arguments[param.index + depth];
                if (param.required === true && isNullOrUndefined(argument)) {
                    throw new ParamUndefinedError(param.name!);
                }
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
        const aliases = option.aliases;
        if (name && args.options[name]) {
            result = args.options[name];
        } else if (aliases && aliases.length > 0) {
            const aliasWasUsedInstead = aliases.find((a: string) => args.options[a] !== undefined);

            if (aliasWasUsedInstead) {
                result = args.options[aliasWasUsedInstead];
            }
        }

        return result;
    }
}
