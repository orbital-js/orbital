import { getClassMetadata, setClassMetadata } from '../../reflection/class';
import { Logger } from '../../shared';

import { ParamMetadata } from './param-metadata';

// TODO: find better explanation
/**
 * Instantiates a parameter in your function execution
 * @param param metadata object for parameter
 */
export function Param(param: ParamMetadata = {}): ParameterDecorator {
    return (target: any, propertyKey: string | symbol, index: number) => {
        // WTF: This is the first time I am happy to see comments in a code because it is so obscure e.O
        // we can only apply parameters to `execute`
        if (propertyKey !== 'execute') {
            const err = '@Param() can only decorate arguments to execute(), but it was found decorating '
                + (propertyKey as string) + '().';
            Logger.error(err);
            return;
        }

        let params = target.constructor.params;

        if (!params) {
            // if we don't have any params registered yet, make it an empty array.
            params = [];
        }

        // assign the parameter in the exact order we need it
        params[index] = { ...param, index };

        target.constructor.params = params;
    };
}
