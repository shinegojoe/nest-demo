import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { TypeOrmModule } from '@nestjs/typeorm';


// export const AppDataSource = new DataSource({
//     type: "postgres",
//     host: "192.168.161.131",
//     port: 5432,
//     username: "admin",
//     password: "admin",
//     database: "postgres",
//     schema: "test123",
//     synchronize: true,
//     logging: false,
//     entities: [User],
//     migrations: [],
//     subscribers: [],
// })

export const AppDataSource = TypeOrmModule.forRoot({
    type: "postgres",
    host: "192.168.161.131",
    port: 5432,
    username: "admin",
    password: "admin",
    database: "postgres",
    schema: "test123",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
