import { OrbitalFactory } from '@orbital/core';
import { expect } from 'chai';

import { EmptyCLI } from '../shared/cli/empty-cli';
import { TestCliWithCommand } from '../shared/cli/test-cli-with-command';

describe('OrbitalFactory', () => {

    describe('Command Resolution', () => {
        // TODO: fix typing

        it('should resolve leaf command with corresponding name', () => {
            const testCliWithCommand = OrbitalFactory.bootstrap(TestCliWithCommand);
            expect(() => testCliWithCommand.execute(['test-cli-with-command', 'test-command']))
                .to.throw('Leaf command');
        });

        it('should throw if command does not exist', () => {
            const testCliWithCommand = OrbitalFactory.bootstrap(TestCliWithCommand);
            expect(() => testCliWithCommand.execute(['test-cli-with-command', 'non-exist-command']))
                .to.throw('Show help');
        });

        it('should throw show help if no commands nor execute method are provided', () => {
            const emptyCli = OrbitalFactory.bootstrap(EmptyCLI);
            expect(() => emptyCli.execute())
                .to.throw('Show help');
        });
    });
});
