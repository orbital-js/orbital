import { CLI } from '../../../';
import { ChangeMetadataCommand } from '../commands/command-metadata-change';

@CLI({
    name: 'metadata-change',
    declarations: [
        ChangeMetadataCommand
    ]
})
export class ChangeMetadataCLI { }
