import { CommandMap } from './interfaces/command-map';
import { ParsedArgs } from './interfaces/parsed-args';

export class CommandExecutor {

    // TODO: remove boolean and make it throw instead
    public execute(args: ParsedArgs, map: CommandMap[]): boolean {
        const command = this.resolveCommand(map, args.name);
        if (!command) {
            return false;
        }

        this.injectOptions(command, args);
        command.instance.execute(...this.getArgMap(command, args));

        return true;
    }

    private resolveCommand(map: CommandMap[], name: string) {
        return this.resolveCommandWithName(map, name)
            || this.resolveCommandWithAlias(map, name);
    }

    private resolveCommandWithAlias(map: CommandMap[], alias: string): any {
        return map.find(c => (c.alias || []).indexOf(alias) > -1);
    }

    private resolveCommandWithName(map: CommandMap[], name: string) {
        return map.find(c => c.name === name);
    }

    private injectOptions(command: CommandMap, args: ParsedArgs): void {
        for (const opt in command.options) {
            if (command.options.hasOwnProperty(opt)) {
                this.assignOptions(command, opt, args);
            }
        }
    }

    private assignOptions(executor: any, opt: string, input: ParsedArgs) {
        const option = executor.options[opt];
        // TODO: clarify
        if (input.options[option.name]) {

            executor.instance[option.propertyKey] = input.options[option.name];

        } else if (option.alias && option.alias.length) {

            for (const a of option.alias) {
                if (input.options[a]) {
                    executor.instance[option.propertyKey] = input.options[a];
                }
            }

        }
    }

    private getArgMap(command: CommandMap, args: ParsedArgs) {
        const argMap = [];
        if (command.params) {
            for (const param of command.params) {
                argMap[param.index] = args.arguments[param.index];
            }
        }
        return argMap;
    }
}
