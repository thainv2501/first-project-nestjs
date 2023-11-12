import { Photo } from 'src/entities/photo/entities/photo.entity';
import { User } from 'src/entities/users/entities/user.entity';
import { baseEntity } from 'src/utility/common/base.entity';
import { Status } from 'src/utility/common/user-status.enum';
import {Entity , PrimaryGeneratedColumn , Column, ManyToMany, JoinTable, ManyToOne} from 'typeorm';

@Entity('album')
export class Album extends baseEntity {
    @PrimaryGeneratedColumn("uuid")
    id : string

    @Column()
    name : string

    @Column({default : ""})
    description : string

    @Column({type : "enum", enum : Status , default : Status.Active})
    status : Status

    @ManyToMany(() => User ,{ onDelete: 'CASCADE' }, )
    @JoinTable({
        name: 'user_album',
        joinColumn: { name: 'album_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'user_id' },
      })
    users: User[]

    @ManyToMany(() => Photo)
    @JoinTable({
        name: 'album_photo',
        joinColumn: { name: 'album_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'photo_id' },
      })
    photos: Photo[]

    @Column()
    createdBy : string

}
