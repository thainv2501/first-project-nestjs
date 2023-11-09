import { Album } from 'src/entities/album/entities/album.entity';
import { Photo } from './../../photo/entities/photo.entity';
import { baseEntity } from 'src/utility/common/base.entity';
import { Status } from 'src/utility/common/user-status.enum';
import {Entity , PrimaryGeneratedColumn , Column, OneToMany, ManyToMany, JoinColumn, JoinTable} from 'typeorm';


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

    @OneToMany(() => Photo, (photo) => photo.user)
     photos?: Photo[];

    @ManyToMany(() => Album, (album) => album.users)
    @JoinTable({
        name: 'user_album',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'album_id' },
      })
     albums?: Album[];
}
