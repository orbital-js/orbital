import { CLI } from '../../src/core';
import { TestCommand } from './commands/test.command';

@CLI({
    name: 'example',
    commands: [TestCommand]
})
export class ExampleCLI { }
