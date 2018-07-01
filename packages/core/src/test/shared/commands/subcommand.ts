import { Command, Executable, SubcommandGroup } from '../../../';
import { Param } from '../../../decorators/param';
import { MySubSubcommand } from './subsubcommand';

@Command({
    name: 'hello',
    description: 'hello yay'
})
export class MyHelloCommand extends Executable {
    execute(
        @Param() subcommand: number
    ) {
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
