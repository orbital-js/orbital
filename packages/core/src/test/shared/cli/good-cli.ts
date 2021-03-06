import { CLI } from '../../../';
import { CommandWithOption } from '../commands/command-with-options';
import { CommandWithParam } from '../commands/command-with-param';

@CLI({
    name: 'good-cli',
    declarations: [
        CommandWithOption,
        CommandWithParam,
    ],
    prettyName: 'Good CLI'
})
export class GoodCLI { }
