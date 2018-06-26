import { Command } from '../../../decorators/command';
import { SubcommandGroup } from '../../../decorators/subcommand-group';
import { Executable } from '../../../executable';
import { MySubSubcommand } from './subsubcommand';

@Command({
    name: 'hello',
    description: 'hello yay'
})
export class MyHelloCommand extends Executable {
    execute() {
        throw new Error('hello');
    }
}

// tslint:disable-next-line:max-classes-per-file
@SubcommandGroup({
    name: 'sub',
    declarations: [
        MyHelloCommand,
        MySubSubcommand
    ],
    description: 'Subcommand underdoes'
})
export class MySubcommand { }
