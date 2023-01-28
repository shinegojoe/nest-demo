import { controllerAuthMap, AuthModel } from '../utils/controllerAuthMap';



function AuthDecorator(name: string, module: string, action: string) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("target: ", target);
        console.log("xxx123", "name: ", name, "module: ", module, "action: ", action);
        console.log("propertyKey", propertyKey);
        console.log("descriptor", descriptor);
        const key = `/${name}/${propertyKey}`;
        const authModel = new AuthModel(module, action);
        controllerAuthMap.set(key, authModel);
    }
}

export { AuthDecorator, AuthModel }