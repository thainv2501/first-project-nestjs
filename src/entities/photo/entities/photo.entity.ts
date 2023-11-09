import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, ManyToMany, JoinTable } from "typeorm"
import { baseEntity } from "src/utility/common/base.entity";
import { Status } from "src/utility/common/user-status.enum";
import { User } from "src/entities/users/entities/user.entity";
import { Album } from "src/entities/album/entities/album.entity";

@Entity('photo')
export class Photo extends baseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: 'varchar', length: 500 })
    name: string;

    @ManyToOne(() => User, (user) => user.id)
    user: User

    @ManyToMany(() => Album , (album)=> album.photos)
    @JoinTable({
        name: 'album_photo',
        joinColumn: { name: 'photo_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'album_id' },
      })
    albums: Album[]

    @Column()
    link : string

    @Column({type : "enum" , enum : Status , default : Status.Active})
    status : Status
}