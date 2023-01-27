import { ApiProperty } from "@nestjs/swagger"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column()
    name: string

    @ApiProperty()
    @Column()
    password: string



}
