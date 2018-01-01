import { OptionMetadata } from './option-metadata';

/**
 * Decorator function defining a command option
 *
 * @param option configuration of the option
 */
export function Option(option: OptionMetadata = { name: '' }): PropertyDecorator {
    return (target: any, propertyKey: string | symbol) => {

        // the object map of options on the class
        let options = target.constructor.options;

        if (!option.name) {
            option.name = propertyKey;
        }

        // an object with the propertyKey stored on the
        // object to inject it back into the class later
        const optionSpread = { ...option, propertyKey };

        if (options) {
            options[propertyKey] = optionSpread;
        } else {
            options = { [propertyKey]: optionSpread };
        }

        target.constructor.options = options;
    };
}
