import { OrbitalFactory, OrbitalFactoryStatic } from '../orbital-factory';
import { Constructor } from '@orbital/core/util/constructor';
import { Executable } from '@orbital/core';

import { BadCLINoClass } from './shared/cli/bad-cli-no-class';
import { CLIWithArguments } from './shared/cli/cli-with-arguments';
import { EmptyCLI } from './shared/cli/empty-cli';
import { K } from 'shared/class';
import { TestCLI } from './shared/cli/test-cli';
import { TestCliWithBadCommand } from './shared/cli/bad-cli-command';
import { TestCliWithCommand } from './shared/cli/test-cli-with-command';
import { commandNotExecutable } from '../util/errors';

import { expect } from 'chai';

describe('OrbitalFactory', () => {

    // it('should return an exectuable', () => {
    //     expect(factory)
    //         .to.haveOwnProperty('execute');
    // });

    describe('Command Resolution', () => {
        let factory: OrbitalFactoryStatic;

        beforeEach(() => {
            factory = OrbitalFactory.bootstrap(TestCLI);
        });

        it('should resolve master command if no commands are defined', () => {
            expect(() => factory.execute(['test-cli']))
                .to.throw('Master command');
        });

        it('should resolve leaf command with corresponding name', () => {
            const testCliWithCommand = OrbitalFactory.bootstrap(TestCliWithCommand);
            expect(() => testCliWithCommand.execute(['test-cli-with-command', 'test-command']))
                .to.throw('Leaf command');
        });

        it('should throw if command does not exist', () => {
            const testCliWithCommand = OrbitalFactory.bootstrap(TestCliWithCommand);
            expect(() => testCliWithCommand.execute(['test-cli-with-command', 'non-exist-command']))
                .to.throw('Show help');
        });

        it('should throw if command does not have an execute function', () => {
            const testCliWithCommand = OrbitalFactory.bootstrap(TestCliWithBadCommand);
            expect(() => testCliWithCommand.execute(['test-cli-with-command', 'empty-command']))
                .to.throw('Command empty-command does not have a method called execute, so it can not be run.');
        });

        it('should throw show help if no commands nor execute method are provided', () => {
            const emptyCli = OrbitalFactory.bootstrap(EmptyCLI);
            expect(() => emptyCli.execute())
                .to.throw('Show help');
        });

        it('should throw if a command is not a function', () => {
            const emptyCli = OrbitalFactory.bootstrap(BadCLINoClass);
            expect(() => emptyCli.execute(['test-cli-with-command', 'empty-command']))
                .to.throw(commandNotExecutable());
        });
    });
    describe('Dependency Injection', () => {
        let factory: OrbitalFactoryStatic;

        beforeEach(() => {
            factory = OrbitalFactory
                .inject(['hello'])
                .bootstrap(CLIWithArguments);
        });


        it('should properly inject arguments if the class takes a constructor', () => {
            expect(() => factory.execute(['test-cli']))
                .to.throw('hello');
        });
    });
});
