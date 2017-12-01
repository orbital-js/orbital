<<<<<<< HEAD

import { OrbitalFactory, OrbitalFactoryStatic } from '../orbital-factory';

import { CLIWithArguments } from './shared/cli/cli-with-arguments';
import { Constructor } from '@orbital/core/util/constructor';
import { EmptyCLI } from './shared/cli/empty-cli';
import { Executable } from '@orbital/core';
import { TestCLI } from './shared/cli/test-cli';
import { TestCliWithCommand } from './shared/cli/test-cli-with-command';
import { expect } from 'chai';

describe('OrbitalFactory', () => {

=======
import { OrbitalFactory, Executable } from '@orbital/core';
import { Constructor } from '@orbital/core/util/constructor';

import { TestCLI } from './shared/cli/test-cli';
import { EmptyCLI } from './shared/cli/empty-cli';
import { TestCliWithCommand } from './shared/cli/test-cli-with-command';

import { expect } from 'chai';

describe('Orbital factory', () => {
    const factory = OrbitalFactory.bootstrap(TestCLI);
>>>>>>> 16c85c24cc231d2ec3930d8b517c394156d7bc71
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
                .inject(['hello'])
                .bootstrap(CLIWithArguments);
            console.log(factory);
        });


        it('should properly inject arguments if the class takes a constructor', () => {
            expect(() => factory.execute(['test-cli']))
                .to.throw('hello');
        });
    });
});
