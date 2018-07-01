import { Command, Executable } from '../../../';
import { Option } from '../../../decorators/option';

@Command({
    name: 'test-command',
    description: 'A very simple command'
})
export class TestCommand extends Executable {

    @Option({
        aliases: ['o', 't', 'tes'],
        description: 'Test'
    }) test: string;

    @Option() noDesc: string;

    execute() {
        throw new Error('Leaf command');
    }
}
