import { OrbitalFactory } from '@orbital/core';

import { TestCLI } from './shared/cli/test-cli';
import { TestCliWithCommand } from './shared/cli/test-cli-with-command';
import { EmptyCLI } from './shared/cli/empty-cli';
import { CLIWithArguments } from './shared/cli/cli-with-arguments';

import { expect } from 'chai';

describe('OrbitalFactory', () => {

    describe('Command Resolution', () => {
        // TODO: fix typing
        let factory;

        beforeEach(() => {
            // OMG: This is still a cli and not a factory. Damnit!
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

        it('should throw show help if no commands nor execute method are provided', () => {
            const emptyCli = OrbitalFactory.bootstrap(EmptyCLI);
            expect(() => emptyCli.execute())
                .to.throw('Show help');
        });
    });

    describe('Dependency Injection', () => {
        // TODO: fix typing
        let factory;

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
