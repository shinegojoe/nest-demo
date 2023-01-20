import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { ApiProperty } from '@nestjs/swagger';


// @Entity()
export class Action {

    // @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;


    // @Column()
    @ApiProperty(
        {description: "name"}
    )
    name: string;

}