import 'reflect-metadata';

import { Constructor } from '../util/constructor';
import { METADATA_KEY } from '../util/metadata';

export function getClassMetadata(obj: Constructor<any>): any {
    return Reflect.getOwnMetadata(METADATA_KEY, obj);
}

export function setClassMetadata(obj: any, value: any): void {
    Reflect.defineMetadata(METADATA_KEY, value, obj);
}
