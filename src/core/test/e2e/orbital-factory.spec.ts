import { OrbitalFactory } from '@orbital/core';
import { expect } from 'chai';
import { ChangeMetadataCLI } from 'shared/cli/metadata-change';
import { MetadataError } from '../../errors/metadata';
import { EmptyCLI } from '../shared/cli/empty-cli';
import { TestCliWithCommand } from '../shared/cli/test-cli-with-command';

describe('OrbitalFactory', () => {

    describe('Command Resolution', () => {

        it('should resolve leaf command with corresponding name', () => {
            const testCliWithCommand = OrbitalFactory.bootstrap(TestCliWithCommand);
            expect(() => testCliWithCommand.execute(['test-cli-with-command', 'test-command']))
                .to.throw('Leaf command');
        });

        it('should ignore npm/npx/ts-node/node prefixes', () => {
            const testCliWithCommand = OrbitalFactory.bootstrap(TestCliWithCommand);
            expect(() => testCliWithCommand.execute(['node', 'test-cli-with-command', 'test-command']))
                .to.throw('Leaf command');
        });

        it('should throw when metadata has been changed illegally', () => {
            expect(() => OrbitalFactory
                .bootstrap(ChangeMetadataCLI))
                .to.throw(MetadataError);
        });

        it('should return true when command successfully executes', () => {
            const testCliWithCommand = OrbitalFactory.bootstrap(TestCliWithCommand);
            expect(testCliWithCommand.execute(['test-cli-with-command', 'no-return']))
                .to.equal(true);
        });

        it('should show help if command does not exist', () => {
            const testCliWithCommand = OrbitalFactory.bootstrap(TestCliWithCommand);
            expect(testCliWithCommand.execute(['test-cli-with-command', 'non-exist-command']))
                .to.equal(false);
        });

        it('should show help if no commands nor execute method are provided', () => {
            const emptyCli = OrbitalFactory.bootstrap(EmptyCLI);
            expect(emptyCli.execute())
                .to.equal(false);
        });
    });
});
