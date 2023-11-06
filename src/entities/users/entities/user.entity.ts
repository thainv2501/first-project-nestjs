import { baseEntity } from 'src/utility/common/base.entity';
import { Status } from 'src/utility/common/user-status.enum';
import {Entity , PrimaryGeneratedColumn , Column} from 'typeorm';


@Entity('user')
export class User extends baseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column()
    userName: string

    @Column()
    password: string

    @Column()
    email: string

    @Column({type : "enum" , enum : Status , default : Status.Inactive})
    status: Status
}
