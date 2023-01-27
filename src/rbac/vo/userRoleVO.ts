import { Role } from '../../entity/rbac/Role';
import { User } from '../../entity/rbac/User';


class UserRoleVO {
    user: User
    roleList: Array<Role> = [];
    constructor(user: User, roleList: Array<Role>) {
        this.user = user;
        this.roleList = roleList;
    }
}


export { UserRoleVO }

