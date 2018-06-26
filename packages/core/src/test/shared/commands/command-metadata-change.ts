import { Command, Executable } from '../../../';
import { setClassMetadata } from '../../../reflection/class';

@Command({
    name: 'change-metadata'
})
export class ChangeMetadataCommand extends Executable {
    execute() {
        return true;
    }
}

setClassMetadata(ChangeMetadataCommand, { type: 'not-a-command' });
