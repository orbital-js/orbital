import { expect } from 'chai';
import chalk from 'chalk';

import { CommandInstance, ModifiedOptionMetadata, ModifiedParamMetadata } from '../../command/command-instance';
import { generateCommandUsage, generateOptionDocs, generateParamDocs, indent } from '../../help/util';

const emptyInstance: CommandInstance = {
    instance: '',
    name: 'l',
    alias: ['p'],
    params: [],
    paramTypes: [],
    options: {},
    description: 'hello!',
};

const option: ModifiedOptionMetadata = {
    name: 'option',
    alias: ['o'],
    propertyKey: 'option',
    description: 'hello',
    type: 'String',
};

const param: ModifiedParamMetadata = {
    name: 'param',
    description: 'hello',
    index: 0,
};

describe('Help Utilities', () => {
    describe('Indent', () => {
        it('should indent the string by four spaces once', () => {
            expect(indent(1, 'hello')).to.equal('    hello');
        });

        it('should indent the string by four spaces n times', () => {
            expect(indent(3, 'hello')).to.equal('            hello');
        });
    });

    describe('generateCommandUsage', () => {
        it('should generate an empty yellow string with the command name in it', () => {
            expect(generateCommandUsage('a', emptyInstance).trim())
                .to.equal(chalk.yellow('a l') + ' \n    ' + 'hello!' + '\n    ' + chalk.blue('Aliases: ') + 'p');
        });
    });

    describe('generateParamDocs', () => {
        it('should generate blue for optional params', () => {
            expect(generateParamDocs([param], [String]).trim())
                .to.equal(chalk.blue('[param] ') +
                chalk.green('(string)') + ' - hello');
        });

        it('should generate red for required params', () => {
            expect(generateParamDocs([{ required: true, ...param }], [String]).trim())
                .to.equal(chalk.red('<param> ') +
                chalk.green('(string)') + ' - hello');
        });
    });

    describe('generateOptionDocs', () => {
        it('should generate pretty option docs', () => {
            expect(generateOptionDocs({ option }).trim())
                .to.equal(chalk.blue('--option') + ' ' +
                chalk.green('(string)') + ' - hello\n    ' + chalk.green('Aliases: ') + '-o');
        });
    });
});
