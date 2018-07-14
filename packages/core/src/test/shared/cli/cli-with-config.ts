import { CLI } from '../../../';
import { NAME } from '../../../configuration/tokens';
import { CommandWithOption } from '../commands/command-with-options';
import { CommandWithParam } from '../commands/command-with-param';

@CLI({
    name: 'good-cli',
    declarations: [
        CommandWithOption,
        CommandWithParam,
    ],
    prettyName: 'Good CLI',
    config: {
        loggerPrefix: 'test' + NAME,
        helpMessage: 2 as any
    }
})
export class CLIWithConfig { }
