import 'reflect-metadata';

import { Constructor } from '../util/constructor';
import { Executable } from '../interfaces/executable';
import { METADATA_KEY } from '../util/metadata';

export function getClassMetadata<T>(obj: Constructor<T>) {
    return Reflect.getMetadata(METADATA_KEY, obj);
}

export function applyClassMetadata<T, U>(obj: any, value: U) {
    Reflect.defineMetadata(METADATA_KEY, value, obj);
    return obj;
}
