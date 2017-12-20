import { Command, Executable } from '@orbital/core';

@Command({
    name: 'test-command',
})
export class TestCommand extends Executable {
    execute() {
        throw new Error('Leaf command');
    }
}
