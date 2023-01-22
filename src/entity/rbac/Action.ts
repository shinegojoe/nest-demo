import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { ApiProperty } from '@nestjs/swagger';


@Entity()
export class Action {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}