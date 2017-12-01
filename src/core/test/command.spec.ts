import { Command } from '../command/command';
import { Executable } from '../interfaces/executable';
import { expect } from 'chai';
import { getClassMetadata } from '../reflection/class';

@Command({
    name: 'test-command',
    aliases: ['test', 't'],
    subCommands: [
        'fake',
    ],
})
class TestCommand implements Executable {
    execute(...args: any[]): void {
        throw new Error('Method not implemented.');
    }
}

describe('Command decorator', () => {
    it('Should have metadata attached', () => {
        const metadata = getClassMetadata(TestCommand);
        expect(metadata)
            .to.haveOwnProperty('name')
            .and.to.equal('test-command');

        expect(metadata)
            .to.haveOwnProperty('aliases')
            .and.deep.equal(['test', 't']);

        expect(metadata)
            .to.haveOwnProperty('subCommands')
            .and.deep.equal(['fake']);
    });
});
