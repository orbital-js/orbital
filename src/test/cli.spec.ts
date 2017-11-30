import { expect } from 'chai';
import { CLI } from '../core/cli/cli';
import { Command } from '../core/command/command';
import { Executable } from '../core/executable';

@CLI({
    name: 'test-cli',
    commands: [

    ],
    version: '1.0.0',
})
class TestCLI implements Executable {
    execute(arg: any, argd: any): void {
        throw new Error('Method not implemented.');
    }
}

describe('CLI decorator', () => {
    describe('Configuration', () => {

        it('Should have a name', () => {
            expect(new TestCLI())
                .to.haveOwnProperty('name')
                .and.equal('test-cli');
        });

        it('Should have a version', () => {
            expect(new TestCLI())
                .to.haveOwnProperty('version')
                .and.equal('1.0.0');
        });

        // TODO: Change to should provide help for base command
        it('Should throw an error if the decorated class doesn\'t implement Executable', () => {
            // tslint:disable-next-line:max-classes-per-file
            expect(() => { @CLI({}) class NotExecutable { } })
                .to.throw('CLI decorator requires class to implement Executable');
        });
    });
});
