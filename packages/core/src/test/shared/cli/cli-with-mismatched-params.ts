import { CLI } from '../../../';
import { CommandWithDisorderedParam } from '../commands/command-with-disordered-params';

@CLI({
    name: 'test-cli',
    declarations: [CommandWithDisorderedParam],
})
export class CLIWithDisorderedParam { }
