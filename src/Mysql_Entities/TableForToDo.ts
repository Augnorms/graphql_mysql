import {BaseEntity, Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity()
export class Todo extends BaseEntity{
    @PrimaryGeneratedColumn()
      id!: number
    @Column()
      name!: string
    @Column()
      starttime!:string
    @Column()
      endtime!:string  
    @Column()
      date!:string      
}