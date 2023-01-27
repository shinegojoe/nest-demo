import { User } from '../../entity/rbac/User';
// import {} from

export class UserDoc {
    name: string = "user";

    static listApiOperation = { description: "return the user list" }
    static listApiResponse = {
        status: 200, description: 'description goes here', schema: {
            type: "json",
            example: JSON.stringify([
                {
                  "id": 5,
                  "name": "user123",
                  "password": "user123"
                }
              ])
        }
    }


    static getApiOperation = { description: `get ${this.name} by id` };

    static getApiParam = { name: 'id', required: true, description: 'either an integer for the project id or a string for the project name' };


    static createApiOperation = { description: `create ${this.name}` };
    static createApiBody = { description: "", type: User }
    static createApiResponse = {
        status: 201, description: '', schema: {
            type: "json",
            example: JSON.stringify({status: "success"})
        }
    }


    static updateApiOperation = { description: `update ${this.name}, the response is same as create` };
    static updateApiBody = { description: "", type: User }


    static deleteApiOperation = { description: `delete ${this.name} by id, the response is same as create` };
    static deleteApiParam ={ name: 'id', required: true };



    static getActionsByIdApiOperation = { description: "get actions by roleId" };
    static getActionsByIdApiParam = { name: 'id', required: true, description: '' };;
    static getActionsByIdApiResponse = {  status: 201, description: '', schema: {
        type: "json",
        example: {}
    }};


    static createRoleActionApiOperation = { description: "create a Role with Actions" };
    static createRoleActionApiBody = { description: "" };
    static createRoleActionApiResponse = {  status: 200, description: '', schema: {
        type: "json",
        example: {}
    }};



    static updateRoleActionApiOperation = { description: "update a RoleAction" };
    static updateRoleActionApiBody = { description: "" };
    static updateRoleActionApiResponse = {  status: 200, description: '', schema: {
        type: "json",
        example: {}
    }};

}