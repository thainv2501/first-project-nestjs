import { User } from 'src/entities/users/entities/user.entity';
import { baseEntity } from 'src/utility/common/base.entity';
import { Status } from 'src/utility/common/user-status.enum';
import {Entity , PrimaryGeneratedColumn , Column, ManyToMany, JoinTable} from 'typeorm';

@Entity('album')
export class Album extends baseEntity {
    @PrimaryGeneratedColumn("uuid")
    id : string

    @Column()
    name : string

    @Column()
    description : string

    @Column({type : "enum", enum : Status , default : Status.Active})
    status : Status

    @ManyToMany(() => User)
    @JoinTable()
    userId: User[]
}
