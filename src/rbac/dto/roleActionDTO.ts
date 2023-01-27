import { ApiProperty } from '@nestjs/swagger';
import { Action } from '../../entity/rbac/Action';
import { Role } from '../../entity/rbac/Role';


class SetRoleActionDTO {

    @ApiProperty()
    role: Role;

    @ApiProperty({type: [Number]})
    actionIdList: Array<number> = [];
}


export { SetRoleActionDTO }