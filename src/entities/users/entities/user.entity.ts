import { Album } from 'src/entities/album/entities/album.entity';
import { Photo } from './../../photo/entities/photo.entity';
import { baseEntity } from 'src/utility/common/base.entity';
import { Status } from 'src/utility/common/user-status.enum';
import {Entity , PrimaryGeneratedColumn , Column, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { Exclude } from 'class-transformer';



@Entity('user')
export class User extends baseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column()
    userName: string

    @Exclude() // This will exclude the password field from serialization
    @Column()
    password: string

    @Column()
    email: string

    @Column({type : "enum" , enum : Status , default : Status.Inactive})
    status: Status

    @OneToMany(() => Photo, (photo) => photo.user,{ cascade: true })
     photos?: Photo[];

   
}
