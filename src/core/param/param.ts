import { getClassMetadata, setClassMetadata } from '../reflection/class';

import { Constructor } from '../util/constructor';
import { Executable } from '../interfaces/executable';
import { Logger } from '../util/logger';
import { ParamMetadata } from './param-metadata';

/**
 * Instantiates a parameter in your function execution
 * @param param metadata object for parameter
 */
export function Param(param: ParamMetadata = {}): ParameterDecorator {
    return (target: any, propertyKey: string | symbol, index: number) => {

        // we can only apply parameters to `execute`
        if (propertyKey !== 'execute') {
            const logger = new Logger('Orbital');
            const err = '@Param() can only decorate arguments to execute(), but it was found decorating '
                + (propertyKey as string) + '().';
            logger.error(err);
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
