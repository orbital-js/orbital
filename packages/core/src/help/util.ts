import chalk from 'chalk';
import * as _ from 'lodash';
import { CommandInstance, ModifiedOptionMetadata, ModifiedParamMetadata } from '../command/command-instance';
import { arrayIsPopulated } from '../util/array';

/**
 * @internal
 *
 * Indents a string depth number of times
 *
 * @param text the string to be indented
 * @param depth the number of times to indent the string
 */
export function indent(depth: number = 0, str: string = '') {
    return str.split(n)
        .map(i => '    '.repeat(depth) + i)
        .join(n);
}

const n = '\n';
const s = ' ';

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
    str += chalk.yellow(name + s + command.name) + s + generateParamsColor(command.params) + n;
    if (command.description) {
        str += indent(1, command.description) + n;
    }
    const aliases = command.aliases;
    if (arrayIsPopulated(aliases)) {
        str += indent(1, chalk.blue('Aliases: ') + aliases.join(', ')) + n;
    }
    if (command.params) {
        str += n + indent(1, generateParamDocs(command.params, command.paramTypes)) + n;
    }
    if (command.options) {
        str += indent(1, generateOptionDocs(command.options)) + n;
    }
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
            + chalk.green('(' + paramType(types, i) + ')');
        if (params[i].description) {
            str += ' - ' + params[i].description;
        }
        str += n;
    }
    return str;
}

export function paramType(types: Array<{ name: string }>, index: number) {
    const name = types[index].name.toLowerCase();

    return name !== 'object' ? name : 'any';
}

/**
 * Generate option output for help
 * @param options the options from the command map
 */
export function generateOptionDocs(options: { [prop: string]: ModifiedOptionMetadata }): string {
    let str = '';
    for (const option in options) {
        const opt = options[option];
        str += chalk.blue('--' + opt.name) + s
            + chalk.green('(' + opt.type.toLowerCase() + ')');
        if (opt.description) {
            str += ' - ' + _.defaultTo(opt.description, '');
        }
        str += n;
        const aliases = opt.aliases;
        if (Array.isArray(aliases) && arrayIsPopulated(aliases)) {
            str += indent(1, chalk.green('Aliases: ') +
                aliases
                    .map(alias => '-' + alias)
                    .join(', '));
            str += n;
        }
    }
    return str;
}
