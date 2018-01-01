import { OptionMetadata } from '../decorators/option/option-metadata';
import { ParamMetadata } from '../decorators/param/param-metadata';
import { Executable } from './executable';

export type ModifiedParamMetadata = ParamMetadata & { index: number; };
export type ModifiedOptionMetadata = OptionMetadata & { propertyKey: string; };

export interface CommandMapInstance {
    instance: Executable & any;
    name: string;
    alias: string[];
    // subcommands: CommandMapObject[];
    params: ModifiedParamMetadata[];
    options: {
        [propName: string]: ModifiedOptionMetadata;
    };
}
