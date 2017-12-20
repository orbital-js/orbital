import 'reflect-metadata';

import { Constructor } from '../util/constructor';
import { Executable } from '../interfaces/executable';
import { METADATA_KEY } from '../util/metadata';

export function getClassMetadata(obj: Constructor<any>): any {
    return Reflect.getOwnMetadata(METADATA_KEY, obj);
}

// WTF: Why does this return the object ?!!
export function setClassMetadata<T, U>(obj: any, value: U): void {
    Reflect.defineMetadata(METADATA_KEY, value, obj);
}
