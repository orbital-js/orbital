import 'reflect-metadata';

import { METADATA_KEY } from '../../util/metadata';

export function shouldHaveKey(obj: any, key: string) {
    return Reflect.getMetadata(METADATA_KEY, obj, key);
}
