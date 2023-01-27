

class AuthModel {
    role: string = ""
    action: string = ""
    constructor(role: string, action: string) {
        this.role = role;
        this.action = action;
    }

}
const controllerAuthMap = new Map();

export { controllerAuthMap, AuthModel }