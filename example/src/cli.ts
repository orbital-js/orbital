import { CLI } from '../../src/core';
import { TestCommand } from './commands/test.command';

@CLI({
    name: 'example',
    declarations: [TestCommand]
})
export class ExampleCLI { }
