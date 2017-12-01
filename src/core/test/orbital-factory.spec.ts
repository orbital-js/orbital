import { OrbitalFactory, Executable } from '@orbital/core';
import { Constructor } from '@orbital/core/util/constructor';

import { TestCLI } from './shared/cli/test-cli';
import { EmptyCLI } from './shared/cli/empty-cli';
import { TestCliWithCommand } from './shared/cli/test-cli-with-command';

import { expect } from 'chai';

describe('Orbital factory', () => {
    const factory = OrbitalFactory.bootstrap(TestCLI);
    // it('Should return an exectuable', () => {
    //     expect(factory)
    //         .to.haveOwnProperty('execute');
    // });

    describe('Command resolution', () => {
        it('Should resolve master command if no commands are defined', () => {
            expect(() => factory.execute(['test-cli']))
                .to.throw('Master command');
        });

        it('Should resolve leaf command with corresponding name', () => {
            const testCliWithCommand = OrbitalFactory.bootstrap(TestCliWithCommand);
            expect(() => testCliWithCommand.execute(['test-cli-with-command', 'test-command']))
                .to.throw('Leaf command');
        });

        it('Should throw show help if no commands nor execute method are provided', () => {
            const emptyCli = OrbitalFactory.bootstrap(EmptyCLI as Constructor<Executable>);
            expect(() => emptyCli.execute())
                .to.throw('Show help');
        });
    });
});
