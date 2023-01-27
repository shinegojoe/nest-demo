import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from '../../entity/rbac/User';
import { NullObject } from "../../utils/NullObject";


@Injectable()
export class LoginService {
    
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {
    }


    public async login(body: User): Promise<User | NullObject> {
        const user: User = await this.usersRepository.findOneBy({
            name: body.name
        })
        if(user === null) {
            return new NullObject();
        } else {
            return user;
        }

    }

}