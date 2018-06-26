import { CLI } from '../../../';
import { CommandWithBadDecorator } from '../commands/command-with-bad-param';

@CLI({
    name: 'test-cli',
    declarations: [CommandWithBadDecorator],
})
export class CLIWithBadParam { }
