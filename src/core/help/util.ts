import chalk from 'chalk';

import { CommandInstance, ModifiedOptionMetadata, ModifiedParamMetadata } from '../command/command-instance';

/**
 * @internal
 *
 * Indents a string depth number of times
 *
 * @param text the string to be indented
 * @param depth the number of times to indent the string
 */
export function indent(depth: number = 0, str: string = '') {
    return str.split('\n')
        .map(i => '    '.repeat(depth) + i)
        .join('\n');
}

const n = '\n';

/**
 *
 * @param name the command-line name of the CLI
 * @param command an instance of one command
 *
 */
export function generateCommandUsage(
    name: string,
    command: CommandInstance
): string {
    let str = '';
    /*
        The first line for the command will be the command name with its params:
        For example, this line will be output:
        ob generate <asset> [name]
        if asset is required, and name is optional.
    */
    str += chalk.yellow(name + ' ' + command.name) + ' ' + generateParamsColor(command.params) + n;
    if (command.description) {
        str += indent(1, command.description) + n;
    }
    if ((Array.isArray(command.alias) && command.alias[0]) || (!Array.isArray(command.alias) && command.alias)) {
        str += indent(1, chalk.blue('Aliases: ') + command.alias.join(', ')) + n;
    }
    str += n + indent(1, generateParamDocs(command.params, command.paramTypes)) + n;
    str += indent(1, generateOptionDocs(command.options));

    return str;
}

/**
 * Generate pretty parameter design from param metadata.
 *
 * Required params will be red, and angle-bracketed, for example, <env>
 * Optional params will be blue and square-bracketed, for example, [env]
 * @param params an array of params in the command
 */
export function generateParamsColor(params: ModifiedParamMetadata[] = []): string {
    let str = '';
    for (const param of params) {
        if (param.required) {
            // TODO: add param name functionality here.
            // BUILD WILL FAIL until #9 is merged
            str += chalk.red('<' + param.name + '> ');
        } else {
            str += chalk.blue('[' + param.name + '] ');
        }
    }
    return str;
}

/**
 * Generate the documentation for each param
 * @param params the parameters from the map
 * @param types the param types from the map
 */
export function generateParamDocs(params: ModifiedParamMetadata[] = [], types: any[]): string {
    let str = '';
    for (let i = 0; i < params.length; i++) {
        str += generateParamsColor([params[i]])
            + chalk.green('(' + types[i].name.toLowerCase() + ')') + ' - ' + params[i].description + n;
    }
    return str;
}

/**
 * Generate option output for help
 * @param options the options from the command map
 */
export function generateOptionDocs(options: { [prop: string]: ModifiedOptionMetadata }): string {
    let str = '';
    for (const option in options) {
        if (options.hasOwnProperty(option)) {
            const opt = options[option];
            str += chalk.blue('--' + (opt.name as string || '')) + ' '
                + chalk.green('(' + opt.type.toLowerCase() + ')') + ' - '
                + (opt.description || '') + n;
            if (opt.alias) {
                str += indent(1, chalk.green('Aliases: ') + (opt.alias || [])
                    .map(alias => '-' + alias)
                    .join(', '));
            }
        }
    }
    return str;
}
