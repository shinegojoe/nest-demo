import { controllerAuthMap, AuthModel } from '../utils/controllerAuthMap';



function AuthDecorator(name: string, role: string, action: string) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("xxx123", "name: ", name, "role: ", role, "action: ", action);
        console.log("propertyKey", propertyKey);
        console.log("descriptor", descriptor);
        const key = `/${name}/${propertyKey}`;
        const authModel = new AuthModel(role, action);
        controllerAuthMap.set(key, role);
    }
}

export { AuthDecorator, AuthModel }