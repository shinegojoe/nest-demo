import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/rbac/User"
import { Action } from './entity/rbac/Action';
import { Role } from './entity/rbac/Role';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Injectable } from "@nestjs/common";
require('dotenv').config();

const host: string = process.env.host;
console.log("host: ", host);

const username: string = process.env.USERNAME;
const password: string = process.env.PASSWORD;
const db: string = process.env.DB;
const port: any = process.env.PORT;
const schema: string = process.env.SCHEMA;



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
