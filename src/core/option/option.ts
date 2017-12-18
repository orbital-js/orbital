import { getClassMetadata, setClassMetadata } from '../reflection/class';

import { OptionMetadata } from './option-metadata';

export function Option(option: OptionMetadata = {}): PropertyDecorator {
    return (target: any, propertyKey: string | symbol) => {

        let options = target.constructor.options;

        if (!option.name) {
            option.name = propertyKey;
        }

        const optionSpread = { ...option, propertyKey };

        if (options) {
            options[propertyKey] = optionSpread;
        } else {
            options = { [propertyKey]: optionSpread };
        }

        target.constructor.options = options;
    };
}
