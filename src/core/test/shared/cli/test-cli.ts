import { Executable } from '../../../interfaces/executable';
import { CLI } from '../../../cli/cli';

@CLI({
    name: 'test-cli',
    commands: [

    ],
    version: '1.0.0',
})
export class TestCLI implements Executable {
    execute(...args: any[]): void {
        throw new Error('Master command');
    }
}
