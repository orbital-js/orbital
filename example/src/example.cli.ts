import { CLI } from '../../src/core';
import { TestCommand } from './commands/test.command';
import { GroupSubcommand } from './subcommand/group.subcommand';

@CLI({
    name: 'example',
    declarations: [
        TestCommand,
        GroupSubcommand
    ]
})
export class ExampleCLI { }
