import { Action } from '../../entity/rbac/Action';
import { Role } from '../../entity/rbac/Role';


class GetRoleActionVO {
    role: Role;
    actionList: Array<Action> = [];

}

export { GetRoleActionVO }
