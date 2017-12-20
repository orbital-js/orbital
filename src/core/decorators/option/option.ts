import { OptionMetadata } from './option-metadata';

/**
 * Decorator function defining a command option
 *
 * @param option configuration of the option
 */
export function Option(option: OptionMetadata = {}): PropertyDecorator {
    return (target: any, propertyKey: string | symbol) => {

        // TODO: option[s] for a single option ?!!
        let options = target.constructor.options;

        if (!option.name) {
            option.name = propertyKey;
        }

        // TODO: ???
        const optionSpread = { ...option, propertyKey };

        if (options) {
            options[propertyKey] = optionSpread;
        } else {
            options = { [propertyKey]: optionSpread };
        }

        target.constructor.options = options;
    };
}
