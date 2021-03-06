import { isNullOrUndefined } from 'util';
import { Logger } from '../shared';
import { getParamNames } from '../util/param-name';

/**
 * Configuration for the `Param` decorator
 */
export interface ParamMetadata {
    name?: string;
    required?: boolean;
    description?: string;
}

/**
 * Decorator function defining a command parameter
 *
 * @param param configuration of the parameter
 */
export function Param(param: ParamMetadata = {}): ParameterDecorator {
    return (target: any, propertyKey: string | symbol, index: number) => {
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

        const propKeyArray = getParamNames(target[propertyKey]);
        const propKey = propKeyArray[index];

        if (isNullOrUndefined(param.name)) {
            param.name = propKey;
        }

        // assign the parameter in the exact order we need it
        params[index] = { ...param, index, propertyKey: propKey };

        target.constructor.params = params;
    };
}
