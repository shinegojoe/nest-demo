import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Role {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

}