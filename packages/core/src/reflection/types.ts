import 'reflect-metadata';
export function getParamTypes(target: any, key: string | symbol): any {
    return Reflect.getMetadata('design:paramtypes', target, key);
}

export function getType(target: any, key: string | symbol): any {
    return Reflect.getMetadata('design:type', target, key);
}
