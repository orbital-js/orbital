import 'reflect-metadata';
import { getType } from '../reflection/types';

/**
 * Configuration for the `Option` decorator
 */
export interface OptionMetadata {
    name?: string;
    aliases?: string[];
    brief?: string;
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

        const rawType = getType(target, propertyKey);

        const type = rawType.name !== 'Object' ? rawType.name : 'any';

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
