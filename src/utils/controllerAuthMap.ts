

class AuthModel {
    module: string = ""
    action: string = ""
    constructor(module: string, action: string) {
        this.module = module;
        this.action = action;
    }

}
const controllerAuthMap = new Map();

export { controllerAuthMap, AuthModel }