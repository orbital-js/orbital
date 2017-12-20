import { CLI } from '@orbital/core';
import { CommandWithBadDecorator } from '../commands/command-with-bad-param';


// TODO: Why is this class named badParam while being in bad function file
@CLI({
    name: 'test-cli',
    commands: [CommandWithBadDecorator],
})
export class CLIWithBadParam { }
