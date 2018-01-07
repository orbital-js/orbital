import { OptionMetadata } from '../decorators/option/option-metadata';
import { ParamMetadata } from '../decorators/param/param-metadata';
import { Executable } from '../executable';

export type ModifiedParamMetadata = ParamMetadata & { index: number; };
export type ModifiedOptionMetadata = OptionMetadata & { propertyKey: string; name: string; };

export interface CommandInstance {
    instance: Executable & any;
    name: string;
    alias: string[];
    params: ModifiedParamMetadata[];
    options: {
        [propName: string]: ModifiedOptionMetadata;
    };
}
