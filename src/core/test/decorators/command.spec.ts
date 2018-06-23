import { Command, Executable } from '@orbital/core';
import { getClassMetadata } from '@orbital/core/reflection/class';
import { expect } from 'chai';

@Command({
    name: 'test-command',
    aliases: ['test', 't'],
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
    });
});
