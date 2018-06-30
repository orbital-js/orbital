import 'reflect-metadata';
import { isNullOrUndefined } from 'util';
import { AliasLengthError } from '../errors/alias-length-error';
import { getType } from '../reflection/types';

/**
 * Configuration for the `Option` decorator
 */
export interface OptionMetadata {
    name?: string;
    aliases?: string[];
    description?: string;
}

/**
 * Decorator function defining a command option
 *
 * @param option configuration of the option
 */
export function Option(option: OptionMetadata = {}): PropertyDecorator {
    return (target: any, propertyKey: string | symbol) => {

        // the object map of options on the class
        let options = target.constructor.options;

        if (!option.name) {
            option.name = propertyKey.toString();
        }

        if (option.aliases && !isNullOrUndefined(option.aliases)) {
            option.aliases.forEach(checkAlias(option));
        }
        const rawType = getType(target, propertyKey);

        const type = rawType.name.toLowerCase() !== 'object' ? rawType.name : 'any';

        // an object with the propertyKey stored on the
        // object to inject it back into the class later
        const optionSpread = { ...option, propertyKey, type };

        if (options) {
            options[propertyKey] = optionSpread;
        } else {
            options = { [propertyKey]: optionSpread };
        }

        target.constructor.options = options;
    };
}

function checkAlias(option: OptionMetadata): (value: string, index: number, array: string[]) => void {
    return element => {
        if (element.length !== 1) {
            throw new AliasLengthError(element.length, 1, option.name!, false);
        }
    };
}

