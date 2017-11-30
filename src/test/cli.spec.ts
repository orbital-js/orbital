import { expect } from 'chai';

import { CLI } from '../core/cli/cli';
import { Command } from '../core/command/command';
import { Executable } from '../core/executable';

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
}) class TestCliWithCommand implements Executable {
    execute(...args: any[]) { throw new Error('Method not implemented'); }
}

// tslint:disable-next-line:max-classes-per-file
@CLI({}) class EmptyCLI { }

// endregion CLI test classes

describe('CLI decorator', () => {
    const testCli = new TestCLI();
    describe('Configuration', () => {
        it('Should have a metadata attached', () => {
            expect(testCli)
                .to.haveOwnProperty('name')
                .and.equal('test-cli');
            expect(testCli)
                .to.haveOwnProperty('version')
                .and.equal('1.0.0');
        });
    });

    describe('Command resolution', () => {
        it('Should resolve master command if no commands are defined', () => {
            expect(() => testCli.execute('test-cli'))
                .to.throw('Master command');
        });

        it('Should resolve leaf command with corresponding name', () => {
            const testCliWithCommand = new TestCliWithCommand();
            expect(() => testCliWithCommand.execute('test-cli-with-command', 'test-command'))
                .to.throw('Leaf command');
        });

        it('Should throw show help if no commands nor execute method are provided', () => {
            const emptyCli = new EmptyCLI() as Executable;
            expect(() => emptyCli.execute())
                .to.throw('Show help');
        });
    });
});
