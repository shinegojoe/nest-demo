import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm"
import { ApiProperty } from '@nestjs/swagger';


@Entity()
@Unique(['name'])
export class Action {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

}