import { CLI } from '../../../';
import { TestCommand } from '../commands/command';
import { MySubcommand } from '../commands/subcommand';
@CLI({
    name: 'subcommand',
    declarations: [
        MySubcommand,
        TestCommand
    ]
})
export class SubcommandCLI { }
