import { User } from '../../entity/rbac/User';
import { Role } from '../../entity/rbac/Role';

class SetUserRoleDTO {
    user: User
    roleIdList: Array<number> = [];
}

export { SetUserRoleDTO }