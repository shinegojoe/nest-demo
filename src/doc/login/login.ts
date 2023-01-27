import { User } from '../../entity/rbac/User';


export class LoginDoc {


    static loginApiOperation = { description: "login" }
    static loginApiResponse = {
        status: 200, description: '', schema: {
            type: "json",
            example: JSON.stringify({})
        }
    }

    static loginApiBody = { description: "body: User", type: User }


    static logoutApiOperation = { description: "logout" }
    static logoutApiResponse = {
        status: 200, description: '', schema: {
            type: "json",
            example: JSON.stringify({})
        }
    }





}