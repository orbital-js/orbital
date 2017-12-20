import { CommandMap } from './interfaces/command-map';
import { ParsedArgs } from './interfaces/parsed-args';

// WTF: what is this even ?
export class CommandExecutor {

    execute(input: ParsedArgs, map: CommandMap[]) {

        let executor = map.find(c => c.name === input.name);

        if (!executor) {
            executor = map.find(c => (c.alias || []).indexOf(input.name) > -1);
        }

        if (!executor) {
            return false;
        }

        for (const opt in executor.options) {
            if (executor.options.hasOwnProperty(opt)) {
                this.assignOptions(executor, opt, input);
            }
        }

        const argMap: any[] = [];

        if (executor.params) {
            for (const param of executor.params) {
                argMap[param.index] = input.arguments[param.index];
            }
        }

        executor.instance.execute(...argMap);

        return true;
    }

    private assignOptions(executor: any, opt: string, input: ParsedArgs) {
        const option = executor.options[opt];
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
}
