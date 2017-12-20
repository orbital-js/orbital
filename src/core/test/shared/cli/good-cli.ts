import { CLI } from '@orbital/core';

import { CommandWithOption } from '../commands/command-with-options';
import { CommandWithParam } from '../commands/command-with-param';

@CLI({
    name: 'good-cli',
    commands: [
        CommandWithOption,
        CommandWithParam,
    ],
})
export class GoodCLI { }
