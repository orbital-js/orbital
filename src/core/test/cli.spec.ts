import { CLI } from '../cli/cli';
import { Command } from '../command/command';
import { Constructor } from '../util/constructor';
import { Executable } from '../interfaces/executable';
import { OrbitalFactory } from '../orbital-factory';
import { expect } from 'chai';

// region CLI test classes
@CLI({
    name: 'test-cli',
    commands: [

    ],
    version: '1.0.0',
})
class TestCLI implements Executable {
    execute(...args: any[]): void {
        throw new Error('Master command');
    }
}

// tslint:disable-next-line:max-classes-per-file
@CLI({
    name: 'test-cli-with-command',
    commands: [{
        name: 'test-command',
        execute: () => {
            throw new Error('Leaf command');
        },
    }],
})
class TestCliWithCommand implements Executable {
    execute(...args: any[]) { throw new Error('Method not implemented'); }
}

// tslint:disable-next-line:max-classes-per-file
@CLI({}) class EmptyCLI { }

// endregion CLI test classes

describe('CLI decorator', () => {
    const factory = OrbitalFactory.bootstrap(TestCLI);
    describe('Configuration', () => {
        it('Should have a name property in metadata', () => {
            expect((factory as any).metadata)
                .to.haveOwnProperty('name')
                .and.equal('test-cli');
        });
        it('should have a version property in metadata', () => {
            expect((factory as any).metadata)
                .to.haveOwnProperty('version')
                .and.equal('1.0.0');
        });
    });

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
