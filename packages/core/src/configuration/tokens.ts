import { CLIMetadata } from '../decorators/cli';

export const PRETTY_NAME = '{CLIPrettyNameToken}';
export const NAME = '{CLINameToken}';
export const VERSION = '{CLIVersionToken}';

const keyMap = {
    [PRETTY_NAME]: 'prettyName',
    [NAME]: 'name',
    [VERSION]: 'version'
};

export function replaceTokens(original: string, metadata: CLIMetadata) {
    let str = original;

    for (const key in keyMap) {
        const regex = new RegExp(key, 'g');
        str = str.replace(regex, metadata[keyMap[key]]);
    }

    return str;
}
