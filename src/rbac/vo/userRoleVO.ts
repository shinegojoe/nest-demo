import { Role } from '../../entity/rbac/Role';
import { User } from '../../entity/rbac/User';
import { GetRoleActionVO } from './roleActionVO';


class UserRoleVO {
    user: User
    roleList: Array<Role> = [];
    constructor(user: User, roleList: Array<Role>) {
        this.user = user;
        this.roleList = roleList;
    }
}

class UserRoleActionVO {
    user: User
    roleList: Array<GetRoleActionVO> = []
}


export { UserRoleVO, UserRoleActionVO }

