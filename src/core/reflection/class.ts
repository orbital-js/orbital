import 'reflect-metadata';

import { Constructor } from '../util/constructor';
import { Executable } from '../interfaces/executable';
import { METADATA_KEY } from '../util/metadata';

export function getClassMetadata(obj: Constructor<any>) {
    return Reflect.getOwnMetadata(METADATA_KEY, obj);
}

export function setClassMetadata<T, U>(obj: any, value: U) {
    Reflect.defineMetadata(METADATA_KEY, value, obj);
    return obj;
}
