import { Action } from '../../entity/rbac/Action';


class ActionDoc {

    static listApiOperation = { description: "return the action list" }
    static listApiResponse = {
        status: 200, description: 'description goes here', schema: {
            type: "json",
            example: JSON.stringify([
                {
                    "id": 1,
                    "name": "add"
                },
                {
                    "id": 11,
                    "name": "qq123"
                },
                {
                    "id": 6,
                    "name": "qqaaaa"
                }
            ])
        }
    }


    static getApiOperation = { description: "get action by id" };

    static getApiParam = { name: 'id', required: true, description: 'either an integer for the project id or a string for the project name' };


    static createApiOperation = { description: "create action" };

    static createApiBody = { description: "body: Action", type: Action }

    static createApiResponse = {
        status: 201, description: '', schema: {
            type: "json",
            example: JSON.stringify({status: "success"})
        }
    }


    static updateApiOperation = { description: "update action, the response is same as create" };

    static updateApiBody = { description: "body: Action", type: Action }


    static deleteApiOperation = { description: "delete action by id, the response is same as create" };

    static deleteApiParam ={ name: 'id', required: true };





}






export { ActionDoc }