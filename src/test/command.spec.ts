import { expect } from 'chai';
import { Command } from '../core/command/command';
import { Executable } from '../core/executable';

@Command({
    name: 'test-command',
    aliases: ['test', 't' ],
})
class TestCommand implements Executable {
    execute(...args: any[]): void {
        throw new Error('Method not implemented.');
    }
}

describe('Command decorator', () => {
    it('Should have metadata attached', () => {
        const testCommand = new TestCommand();
        expect(testCommand)
            .to.haveOwnProperty('name')
            .and.to.equal('test-command');
        expect(testCommand)
            .to.haveOwnProperty('aliases')
            .and.deep.equal(['test', 't']);
    });

    it('Should throw an error if the decorated class doesn\'t implement Executable', () => {
        // tslint:disable-next-line:max-classes-per-file
        expect(() => { @Command({}) class NotExecutable { } })
            .to.throw('Command decorator requires class to implement Executable');
    });

});
