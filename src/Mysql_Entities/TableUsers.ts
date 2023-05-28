import {BaseEntity, Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Users extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number
    
    @Column()
    name!: string;

    @Column()
    username!: string;

    @Column()
    email!:string;

    @Column()
    password!: string;

    @Column()
    passwordtwo!: string;

      
}
