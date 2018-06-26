import { expect } from 'chai';
import { Command, Executable } from '../../';
import { getClassMetadata } from '../../reflection/class';

@Command({
    name: 'test-command',
    aliases: ['test', 't'],
})
class TestCommand implements Executable {
    execute(): void {
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
