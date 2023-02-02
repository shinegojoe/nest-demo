import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/rbac/User"
import { Action } from './entity/rbac/Action';
import { Role } from './entity/rbac/Role';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Injectable } from "@nestjs/common";
require('dotenv').config();

const host: string = process.env.HOST;
const username: string = process.env.DBUSERNAME;
const password: string = process.env.DBPASSWORD;
const db: string = process.env.DB;
const port: any = process.env.PORT;
const schema: string = process.env.SCHEMA;
console.log("host: ", host, " user: ", username, " db: ", db, " port: ", port, " schema: ", schema);




export const AppDataSource = TypeOrmModule.forRoot({
    type: "postgres",
    host: host,
    port: port,
    username: username,
    password: password,
    database: db,
    schema: schema,
    synchronize: true,
    logging: false,
    entities: [User, Action, Role],
    migrations: [],
    subscribers: [],
})
