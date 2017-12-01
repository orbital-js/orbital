import { OrbitalFactory, OrbitalFactoryStatic } from '../orbital-factory';

import { CLIWithArguments } from './shared/cli/cli-with-arguments';
import { Constructor } from '@orbital/core/util/constructor';
import { EmptyCLI } from './shared/cli/empty-cli';
import { Executable } from '@orbital/core';
import { K } from 'shared/class';
import { TestCLI } from './shared/cli/test-cli';
import { TestCliWithCommand } from './shared/cli/test-cli-with-command';
import { expect } from 'chai';

describe('OrbitalFactory', () => {

    // it('Should return an exectuable', () => {
    //     expect(factory)
    //         .to.haveOwnProperty('execute');
    // });

    describe('Command Resolution', () => {
        let factory: OrbitalFactoryStatic;

        beforeEach(() => {
            factory = OrbitalFactory.bootstrap(TestCLI);
        });

        it('Should resolve master command if no commands are defined', () => {
            expect(() => factory.execute(['test-cli']))
                .to.throw('Master command');
        });

        it('Should resolve leaf command with corresponding name', () => {
            const testCliWithCommand = OrbitalFactory.bootstrap(TestCliWithCommand);
            expect(() => testCliWithCommand.execute(['test-cli-with-command', 'test-command']))
                .to.throw('Leaf command');
        });

        it('Should throw if command does not exist', () => {
            const testCliWithCommand = OrbitalFactory.bootstrap(TestCliWithCommand);
            expect(() => testCliWithCommand.execute(['test-cli-with-command', 'non-exist-command']))
                .to.throw(
                'This command is not executable. Please add an `execute` method to your non-exist-command function.');
        });

        it('Should throw show help if no commands nor execute method are provided', () => {
            const emptyCli = OrbitalFactory.bootstrap(EmptyCLI as Constructor<Executable>);
            expect(() => emptyCli.execute())
                .to.throw('Show help');
        });
    });
    describe('Dependency Injection', () => {
        let factory: OrbitalFactoryStatic;

        beforeEach(() => {
            factory = OrbitalFactory
                .inject(['hello', new K()])
                .bootstrap(CLIWithArguments);
        });


        it('should properly inject arguments if the class takes a constructor', () => {
            expect(() => factory.execute(['test-cli']))
                .to.throw('hello');
        });
    });
});
