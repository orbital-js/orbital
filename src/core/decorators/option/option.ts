import { getClassMetadata, setClassMetadata } from '../../reflection/class';

import { OptionMetadata } from './option-metadata';

// OMG: DOC Oh ma gad ?!
export function Option(option: OptionMetadata = {}): PropertyDecorator {
    return (target: any, propertyKey: string | symbol) => {

        // WTF: option[s] for a single option ?!!
        let options = target.constructor.options;

        if (!option.name) {
            option.name = propertyKey;
        }

        // WTF: ???
        const optionSpread = { ...option, propertyKey };

        if (options) {
            options[propertyKey] = optionSpread;
        } else {
            options = { [propertyKey]: optionSpread };
        }

        target.constructor.options = options;
    };
}
